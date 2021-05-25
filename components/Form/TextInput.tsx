import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Icon, IconProps } from '@ui-kitten/components';
import { Input } from '../UIKittenRewrite/Input';
import { TextInputFormProps } from './types';

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
      ...inputProps
    } = props;

    const [inputValue, setInputValue] = useState<string | undefined>(defaultValue);
    const [passwdShown, setPasswdShown] = useState(!secureTextEntry);

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

    return (
      <View style={[styles.container, containerStyle]}>
        <Input
          autoCapitalize="none"
          ref={ref}
          label={label}
          keyboardType={keyboardType || 'default'}
          accessoryRight={finalIcon}
          style={[styles.input, style]}
          caption={error && error.message}
          status={error && error.message ? 'danger' : ''}
          {...inputProps}
          secureTextEntry={!passwdShown}
          size="medium"
          onChangeText={(text) => {
            setInputValue(text);
            if (onChangeValue) {
              onChangeValue(text);
            }
          }}
          value={inputValue || undefined}
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
