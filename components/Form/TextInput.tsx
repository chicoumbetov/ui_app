import * as React from 'react';
import {
  View, TextInput, StyleSheet, TextStyle, TextInputProps, StyleProp, ViewStyle,
} from 'react-native';
import { FieldError } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { colors, fontSize, size } from '../../assets/styles';
import { AvailableValidationRules } from './validation';
import Text from '../Text';
import { ChangeValueCallbackType } from './Form';

export type TextInputFormProps = Exclude<TextInputProps, 'onChangeText'> & {
  name: string;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  error?: FieldError | undefined;
  validators?: Array<AvailableValidationRules>;
  onChangeValue?: ChangeValueCallbackType;
};

const TextInputComp = React.forwardRef<TextInput, TextInputFormProps>(
  (props: TextInputFormProps, ref): React.ReactElement => {
    const {
      label,
      labelStyle,
      error,
      onChangeValue,
      style,
      defaultValue,
      containerStyle,
      ...inputProps
    } = props;

    const [inputColor, setInputColor] = useState<string>(colors.text);
    const [inputValue, setInputValue] = useState<string | undefined>('');

    useEffect(() => {
      if (inputValue === '') {
        setInputValue(defaultValue);
      }
      if (onChangeValue && defaultValue) onChangeValue(inputValue);
    }, [inputValue]);

    return (
      <View style={[styles.container, containerStyle]}>
        {label && (
        <Text
          type="label"
          style={[
            {
              paddingVertical: 5,
            },
            labelStyle,
          ]}
          color={inputColor}
        >
          {label}
        </Text>
        )}
        <TextInput
          autoCapitalize="none"
          ref={ref}
          style={StyleSheet.flatten([
            styles.input,
            { borderColor: error ? colors.error : inputColor },
            style,
          ])}
          {...inputProps}
          onFocus={() => {
            setInputColor(colors.green);
          }}
          onChangeText={(text) => {
            setInputValue(text);
            onChangeValue && onChangeValue(text);
          }}
          onBlur={() => {
            setInputColor(colors.text);
          }}
          placeholderTextColor={inputColor}
          value={inputValue}
        />
        <Text type="error">{error && error.message}</Text>
      </View>
    );
  },
);

TextInputComp.displayName = 'TextInput';

export default TextInputComp;

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
});
