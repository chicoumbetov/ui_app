import * as React from 'react';
import {
  View, StyleSheet, TextStyle, StyleProp, ViewStyle,
} from 'react-native';
import { FieldError } from 'react-hook-form';
import {
  useEffect, useState, useRef, useImperativeHandle,
} from 'react';
import { colors } from '../../assets/styles';
import { Select, SelectHandles, SelectProps } from '../Select/Select';
import { AvailableValidationRules } from './validation';
import { ChangeValueCallbackType } from './Form';
import Text from '../Text';
import { AutoCompleteHandles } from '../AutoComplete/AutoComplete';

export type SelectFormProps = {
  name: string;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  error?: FieldError | undefined;
  validators?: Array<AvailableValidationRules>;
  onChangeValue?: ChangeValueCallbackType;
  containerStyle?: StyleProp<ViewStyle>;
} & SelectProps;

const SelectComp = React.forwardRef<SelectHandles, SelectFormProps>(
  (props: SelectFormProps, ref): React.ReactElement => {
    const {
      label,
      labelStyle,
      error,
      style,
      onChangeValue,
      initKey,
      containerStyle,
      data,
      ...selectProps
    } = props;
    const [inputValue, setInputValue] = useState<string | number | undefined>('');

    useEffect(() => {
      if (inputValue === '') {
        setInputValue(initKey ? data.filter((item) => item?.key === initKey)[0].key : undefined);
      }
      if (onChangeValue && initKey) onChangeValue(inputValue);
    }, [inputValue]);

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

    return (
      <View style={[styles.container, containerStyle]}>
        {label && (
        <Text type="label" style={[labelStyle, { color: colors.text }]}>
          {label}
        </Text>
        )}
        <Select
          style={StyleSheet.flatten([
            styles.input,
            { borderColor: error ? colors.error : undefined },
            style,
          ])}
          data={data}
          onSelect={(item) => {
            setInputValue(item?.key);
            onChangeValue && onChangeValue(item?.key);
          }}
          initKey={initKey}
          {...selectProps}
          passedInRef={selectRef}
        />
        <Text type="error">{error && error.message}</Text>
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
