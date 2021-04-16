import * as React from 'react';
import {
  View, StyleSheet, TextStyle, ViewStyle, StyleProp,
} from 'react-native';
import { FieldError } from 'react-hook-form';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PersistentModel } from '@aws-amplify/datastore';
import { useRef, useImperativeHandle } from 'react';
import { colors, fontSize, size } from '../../assets/styles';
import { AvailableValidationRules } from './validation';
import { AutoCompleteHandles, AutoCompleteProps } from '../AutoComplete/AutoComplete';
import { ChangeValueCallbackType } from './Form';
import Text from '../Text';

import { AwsAutoComplete } from '../AutoComplete/AwsAutoComplete';

export type AutoCompleteFormProps<T extends PersistentModel> = {
  name: string;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  error?: FieldError | undefined;
  style?: StyleProp<ViewStyle>;
  validators?: Array<AvailableValidationRules>;
  onChangeValue?: ChangeValueCallbackType;
  itemsFormator: (allItems: T[], selectedItem?: T) => string | number;
} & AutoCompleteProps<T>;

// eslint-disable-next-line max-len
const AutoCompleteComp = React.forwardRef<AutoCompleteHandles, AutoCompleteFormProps<PersistentModel>>(
  (props: AutoCompleteFormProps<PersistentModel>, ref): React.ReactElement => {
    const {
      label,
      labelStyle,
      error,
      style,
      onChangeValue,
      itemsFormator,
      // @ts-ignore
      query,
      // @ts-ignore
      conditions,
      itemTitleCallback,
      ...rest
    } = props;

    const autoComplRef = useRef<AutoCompleteHandles>({
      focus: () => {

      },
      blur: () => {

      },
    });

    useImperativeHandle(ref, () => ({
      focus: autoComplRef.current.focus,
      blur: autoComplRef.current.blur,
    }));

    return (
      <View style={styles.container}>
        {label && (
        <Text type="label" style={labelStyle}>
          {label}
        </Text>
        )}
        <AwsAutoComplete<PersistentModel>
          {...{ rest }}
          query={query}
          conditions={conditions}
          itemTitleCallback={itemTitleCallback}
          onSelect={(allItems, selectedItem) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            onChangeValue && onChangeValue(itemsFormator(allItems, selectedItem));
          }}
          passedInRef={autoComplRef}
          inputStyle={[styles.input, style]}
        />
        <Text type="error">{error && error.message}</Text>
      </View>
    );
  },
);

AutoCompleteComp.displayName = 'AutoCompleteComp';

export default AutoCompleteComp;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  input: {
    borderStyle: 'solid',
    borderWidth: 1,
    paddingVertical: 5,
    paddingLeft: 10,
    fontSize: fontSize.input,
    height: 40,
    color: colors.text,
    borderRadius: size.borderRadius,
  },
  label: {
    paddingVertical: 5,
    fontSize: fontSize.label,
    fontWeight: 'bold',
    color: colors.text,
  },
});
