import * as React from 'react';
import {
  View, TextInput, StyleSheet, TextStyle, TextInputProps, StyleProp, ViewStyle,
} from 'react-native';
import { FieldError } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Input, Text } from '@ui-kitten/components';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import { colors, fontSize, size } from '../../assets/styles';
import { AvailableValidationRules } from './validation';
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

const TextInputComp = React.forwardRef<Input, TextInputFormProps>(
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
        <TouchableWithoutFeedback />
        <Input
          autoCapitalize="none"
          ref={ref}
          label={label}
          caption={error && error.message}
          status={error && error.message ? 'danger' : ''}
          {...inputProps}
          onChangeText={(text) => {
            setInputValue(text);
            onChangeValue && onChangeValue(text);
          }}
          value={inputValue}
        />
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
    width: '100%',
    borderWidth: 1,
    paddingVertical: 7,
    paddingHorizontal: 22,
    fontSize: fontSize.input,
    height: 62,
    color: colors.text,
    backgroundColor: colors.blanc,
    borderRadius: size.borderRadius,
    borderColor: 'transparent',
    shadowColor: '#dedede',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
});
