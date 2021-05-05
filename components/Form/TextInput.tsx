import * as React from 'react';
import {
  View, StyleSheet, TextStyle, StyleProp, ViewStyle,
} from 'react-native';
import { FieldError } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Icon, IndexPath, InputProps } from '@ui-kitten/components';
import { AvailableValidationRules } from './validation';
import { ChangeValueCallbackType } from './Form';
import { Input } from '../UIKittenRewrite/Input';

export type TextInputFormProps = Exclude<InputProps, 'onChangeText'> & {
  name: string;
  label?: string;
  icon?: string;
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
      icon,
      labelStyle,
      error,
      onChangeValue,
      style,
      defaultValue,
      containerStyle,
      ...inputProps
    } = props;

    const [inputValue, setInputValue] = useState<string | undefined>('');

    useEffect(() => {
      if (inputValue === '') {
        setInputValue(defaultValue);
      }
      if (onChangeValue && defaultValue) onChangeValue(inputValue);
    }, [inputValue]);

    const renderIcon = (props) => (
      <Icon {...props} name={icon} />
    );

    return (
      <View style={[styles.container, containerStyle]}>
        <Input
          autoCapitalize="none"
          ref={ref}
          label={label}
          accessoryRight={icon ? renderIcon : undefined}
          style={[styles.input, style]}
          caption={error && error.message}
          status={error && error.message ? 'danger' : ''}
          {...inputProps}
          onChangeText={(text) => {
            setInputValue(text);
            if (onChangeValue) {
              onChangeValue(text);
            }
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
    flexDirection: 'row',
  },
  input: {
    flex: 1,
  },
});
