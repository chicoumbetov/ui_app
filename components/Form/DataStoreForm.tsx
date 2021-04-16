/**
 * Creation of a form for the chosen model and send to DataStore
 *
 * @author: Randy Larzabal
 */

import React from 'react';
import {
  DataStore, ModelInit, PersistentModel, PersistentModelConstructor, MutableModel,
// eslint-disable-next-line import/no-extraneous-dependencies
} from '@aws-amplify/datastore';
import {
  ScrollView, StyleProp, StyleSheet, TextStyle, View, ViewStyle,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { colors } from '../../assets/styles';
import Button from '../Button';
import Form from './Form';
import TextInput, { TextInputFormProps } from './TextInput';
import Select, { SelectFormProps } from './Select';
import Switch, { SwitchFormProps } from './Switch';
import AutoComplete, { AutoCompleteFormProps } from './AutoComplete';
import Text from '../Text';
import PhoneNumberInput, { PhoneNumberInputFormProps } from './PhoneNumberInput';

export enum InputType {
  TextField,
  PhoneNumber,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  Select,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  Switch,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  AutoComplete,
  Section,
  calcul,
}

export enum FormAction {
  Create,
  Edit,
}

export type SimpleInputProps = (
  | ({ inputType: InputType.TextField } & Omit<TextInputFormProps, 'name'>)
  | ({ inputType: InputType.PhoneNumber } & Omit<PhoneNumberInputFormProps, 'name'>)
  | ({ inputType: InputType.Select } & Omit<SelectFormProps, 'name'>)
  | ({ inputType: InputType.Switch } & Omit<SwitchFormProps, 'name'>)
  | ({ inputType: InputType.AutoComplete } & Omit<AutoCompleteFormProps<any>, 'name'>)
) & {
  field: string;
  prefix?: string;
};

export interface DataMap {
  [name: string]: number;
}

export type InputProps =
  | {
    inputType: InputType.Section;
    label?: string;
    labelViewStyle?: StyleProp<ViewStyle>;
    labelTextStyle?: StyleProp<TextStyle>;
    section: string;
    fields: SimpleInputProps[];
    count?: number;
  }
  | SimpleInputProps;

export type ActionDefaultValueType<T> =
  | {
    action: FormAction.Edit;
    defaultValues: T;
  }
  | {
    action: FormAction.Create;
    defaultValues?: T;
  };

export type DataStoreFormProps<T extends PersistentModel> = {
  query: PersistentModelConstructor<T>;
  inputs: InputProps[];
  headerTitle?: string;
  buttonLabel?: string;
  screenList?: string;
  beforeCreate?: (data: ModelInit<T>) => Promise<ModelInit<T>> | T;
  beforeUpdate?: (data: T) => Promise<T> | T;
} & ActionDefaultValueType<T>;

export type ValueMap = {
  [key: string]: string | number | boolean | undefined;
};

type MutableObjectKeys<T> = keyof MutableModel<T>;

// eslint-disable-next-line max-len
export default function DataStoreForm<T extends PersistentModel>(props: DataStoreFormProps<T>): JSX.Element {
  const {
    query,
    inputs,
    headerTitle,
    buttonLabel,
    defaultValues,
    screenList,
    beforeCreate,
    beforeUpdate,
    action,
  } = props;

  const register = useForm();
  const navigation = useNavigation();

  /**
   * Returns an input according to the type requested
   * @param {string} input
   */
  const switchInput = (input: SimpleInputProps): JSX.Element => {
    const name = `${input.prefix ?? ''}${input.field}`;
    const currentValue = _.get(defaultValues, name);
    switch (input.inputType) {
      case InputType.Select:
        return (
        // eslint-disable-next-line react/jsx-props-no-spreading
          <Select {...input} name={name} initKey={currentValue as string | number | undefined} />
        );
      case InputType.TextField:
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <TextInput {...input} name={name} defaultValue={currentValue} />;
      case InputType.PhoneNumber:
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <PhoneNumberInput {...input} name={name} defaultValue={currentValue} />;
      case InputType.Switch:
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <Switch {...input} name={name} value={currentValue as boolean | undefined} />;
      case InputType.AutoComplete:
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <AutoComplete {...input} name={name} initId={currentValue} />;
      default:
        return <></>;
    }
  };

  const renderedInputs = inputs.map((value) => {
    if (value.inputType === InputType.Section) {
      const returnedElements: JSX.Element[] = [];
      const {
        fields, label, labelViewStyle, labelTextStyle, section, count = 1,
      } = value;
      // eslint-disable-next-line no-plusplus
      for (let i = 1; i <= count; i++) {
        const tab: JSX.Element[] = [];
        // eslint-disable-next-line array-callback-return
        fields.map((value1) => {
          value1.prefix = `${section}[${i - 1}].`;
          tab.push(switchInput(value1));
        });

        if (label) {
          returnedElements.push(
            <View style={labelViewStyle}>
              <Text type="label" style={labelTextStyle}>
                {label}
                {' '}
                {count > 1 ? i : ''}
              </Text>
              {tab}
            </View>,
          );
        } else {
          returnedElements.push(<>{tab}</>);
        }
      }
      return <>{returnedElements}</>;
    }
    return switchInput(value);
  });

  // on rajoute le bouton
  renderedInputs.push(
    <Button
      label="envoyer"
      backgroundColor={colors.green}
      textColor={colors.white}
      onPress={register.handleSubmit((d) => {
        if (action === FormAction.Edit) {
          // on force ici le typage car react-hook-form ne ressort pas le bon typage
          onUpdateQuery(d as T);
        } else {
          onCreateQuery(d as ModelInit<T>);
        }
      })}
    />,
  );

  useFocusEffect(
    React.useCallback(() => {
      const subscription = DataStore.observe(query).subscribe((msg) => {
        console.log('SUBSCRIPTION_UPDATE', msg);
      });
      return function cleanup() {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        subscription && subscription.unsubscribe();
      };
    }, []),
  );

  const onCreateQuery = async (data: ModelInit<T>) => {
    try {
      if (beforeCreate) {
        data = await beforeCreate(data);
      }
      // eslint-disable-next-line new-cap
      await DataStore.save(new query(data));
      if (screenList) navigation.navigate(screenList);
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateQuery = async (updateData: T) => {
    if (props.action === FormAction.Edit) {
      try {
        if (beforeUpdate) {
          updateData = await beforeUpdate(updateData);
        }
        await DataStore.save(
          query.copyOf(props.defaultValues, (updated) => {
            // eslint-disable-next-line guard-for-in,no-restricted-syntax
            for (const key in updateData) {
              updated[(key as unknown) as MutableObjectKeys<T>] = updateData[key];
            }
          }),
        );
        // @ts-ignore
        navigation.navigate(screenList);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={style.containerGlobal}>
      <View style={style.containerHeaderTitle}>
        <Text style={style.headerTitle}>{headerTitle}</Text>
        {screenList && (
        <Button
          style={{ width: 200, backgroundColor: colors.green }}
          textColor="white"
          label={`${buttonLabel}`}
          onPress={() => {
            navigation.navigate(screenList);
          }}
        />
        )}
      </View>
      <ScrollView>
        <View style={style.formContainer}>
          {/* @ts-ignore "errors" is already defined in Props<T> */}
          <Form<T> {...register} defaultValues={defaultValues}>
            <>{renderedInputs}</>
          </Form>
        </View>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  containerGlobal: {
    borderRadius: 30,
    padding: 42,
    backgroundColor: 'white',
    marginHorizontal: 35,
    marginBottom: 17,
    flex: 1,
  },
  containerHeaderTitle: {
    borderColor: colors.lightGray,
    borderBottomWidth: 1,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    borderColor: colors.lightGray,
    fontSize: 20,
    fontWeight: '800',
  },
  formContainer: {
    width: 400,
    margin: 'auto',
  },
  inputFilter: {
    height: 40,
    borderRadius: 10,
  },
});
