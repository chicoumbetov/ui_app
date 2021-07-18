import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, IconProps } from '@ui-kitten/components';
import { TextInputMaskProps } from 'react-native-masked-text';
import { Input } from '../UIKittenRewrite/Input';
import { TextInputFormProps } from './types';
import { AvailableValidationRules } from './validation';
import Formatter from '../../utils/Formatter';

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
      withEyeToggle,
      secureTextEntry,
      keyboardType,
      maskOptions,
      validators,
      placeholder,
      showAsterix = true,
      ...inputProps
    } = props;

    let realDefaultValue: string | number | undefined = defaultValue;

    if (maskOptions && maskOptions.type === 'money') {
      realDefaultValue = defaultValue
        ? Formatter.baseNumberFormatter.format(parseFloat(defaultValue))
        : defaultValue;
    }

    const [inputValue, setInputValue] = useState<string | number | undefined>(realDefaultValue);
    const [passwdShown, setPasswdShown] = useState(!secureTextEntry);

    useEffect(() => {
      setInputValue(realDefaultValue);
    }, [defaultValue]);

    const renderIcon = (iconProps: IconProps) => (
      <Icon {...iconProps} name={icon} />
    );
    const renderEyeIcon = (iconProps: IconProps) => (
      <TouchableOpacity accessible={false} onPress={() => setPasswdShown(!passwdShown)}><Icon {...iconProps} name={passwdShown ? 'eye-off-outline' : 'eye-outline'} /></TouchableOpacity>
    );

    let finalIcon;

    if (withEyeToggle && secureTextEntry) {
      finalIcon = renderEyeIcon;
    } else if (icon) {
      finalIcon = renderIcon;
    }

    let additionalProps: {
      withMask?: true,
      includeRawValueInChangeText?: true,
      maskOptions?: TextInputMaskProps,
    } = {};
    if (maskOptions) {
      additionalProps = {
        withMask: true,
        includeRawValueInChangeText: true,
        maskOptions: {
          ...maskOptions,
          onChangeText: (text, rawText) => {
            setInputValue(text);
            if (onChangeValue) {
              onChangeValue((maskOptions.options?.unit === '- ' && rawText ? -rawText : rawText));
            }
          },
        },
      };
    }

    const required = ((showAsterix && validators && validators.indexOf(AvailableValidationRules.required) > -1) ? ' *' : '');

    return (
      <View style={[styles.container, containerStyle]}>
        <Input
          autoCapitalize="none"
          ref={ref}
          label={label ? label + required : label}
          keyboardType={keyboardType || 'default'}
          accessoryRight={finalIcon}
          placeholder={(placeholder || '') + (!label ? required : '')}
          style={[styles.input, style]}
          caption={error && error.message}
          status={error && error.message ? 'danger' : ''}
          {...inputProps}
          secureTextEntry={!passwdShown}
          size="medium"
          onChangeText={(text) => {
            let finalText = text;
            if (keyboardType === 'numeric') {
              finalText = text.replace(',', '.');
            }
            setInputValue(finalText);
            if (onChangeValue) {
              onChangeValue(finalText);
            }
          }}
          {...additionalProps}
          value={inputValue?.toString() || undefined}
        />
      </View>
    );
  },
);

TextInputComp.displayName = 'TextInput';

export default TextInputComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 8,
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
  },
});
