import * as React from 'react';
import {
  View, StyleSheet, TextStyle, StyleProp, ViewStyle,
} from 'react-native';
import { FieldError } from 'react-hook-form';
import {
  useState, useRef, useImperativeHandle, useEffect,
} from 'react';
import {
  Select, SelectProps, SelectItem, IndexPath,
} from '@ui-kitten/components';
import { AvailableValidationRules } from './validation';
import { ChangeValueCallbackType } from './Form';
import { AutoCompleteHandles } from '../AutoComplete/AutoComplete';
import { IconName } from '../Icon';

export type SelectFormProps<KT> = {
  name: string;
  label?: string;
  size?: string
  placeholder?: string;
  value?: KT;
  labelStyle?: StyleProp<TextStyle>;
  error?: FieldError | undefined;
  validators?: Array<AvailableValidationRules>;
  onChangeValue?: ChangeValueCallbackType;
  containerStyle?: StyleProp<ViewStyle>;
  data: SelectItemProps<KT>[];
} & Exclude<SelectProps, 'children'>;

export type SelectItemProps<KT = string | number> = {
  key: KT;
  label: string;
  section?: boolean;
  icon?: IconName;
  // to be as configurable as possible allow any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPress?: (row?: any) => void;
};

export type SelectHandles = {
  focus: () => void;
  blur: () => void;
};

const SelectComp = React.forwardRef<SelectHandles, SelectFormProps<string | number>>(
  (props: SelectFormProps<string | number>, ref): React.ReactElement => {
    const {
      value,
      labelStyle,
      error,
      style,
      onChangeValue,
      containerStyle,
      data,
      status,
      ...selectProps
    } = props;

    const selectRef = useRef<AutoCompleteHandles>({
      focus: () => {

      },
      blur: () => {

      },
    });

    useImperativeHandle(ref, () => ({
      focus: selectRef.current.focus,
      blur: selectRef.current.blur,
    }));

    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    useEffect(() => {
      const selectedIndexValue = data.findIndex((item) => item.key === value);
      setSelectedIndex(selectedIndexValue);
    }, []);

    return (
      <View style={[styles.container, containerStyle]}>
        <Select
          value={selectedIndex > -1 ? data[selectedIndex].label : undefined}
          selectedIndex={selectedIndex > -1 ? new IndexPath(selectedIndex) : undefined}
          onSelect={(index) => setSelectedIndex(index.row)}
          {...selectProps}
          caption={error && error.message}
          status={error && error.message !== '' ? 'danger' : status}
        >
          {data.map((item) => (
            <SelectItem
              title={item.label}
              key={item.key}
            />
          ))}
        </Select>
      </View>
    );
  },
);

SelectComp.displayName = 'SelectComp';

export default SelectComp;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    flex: 1,
  },
  input: {
    height: 40,
  },
});
