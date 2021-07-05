import * as React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useState } from 'react';
import { StyleService, useStyleSheet, useTheme } from '@ui-kitten/components';
import Text from '../Text';
import { PhoneNumberInputFormProps } from './types';
import PhoneInput from '../PhoneInput';

const PhoneNumberInputComp = React.forwardRef<PhoneInput, PhoneNumberInputFormProps>(
  (props: PhoneNumberInputFormProps, ref): React.ReactElement => {
    const {
      label,
      labelStyle,
      error,
      onChangeValue,
      style,
      defaultValue,
      containerStyle,
      placeholder,
    } = props;

    const styles = useStyleSheet(themedStyles);
    const theme = useTheme();

    const [inputColor, setInputColor] = useState<string>(theme['border-basic-color-1']);
    const [inputValue, setInputValue] = useState<string | undefined>('');

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
        <PhoneInput
          ref={ref}
          value={inputValue}
          defaultCode="FR"
          layout="first"
          onChangeFormattedText={(text) => {
            setInputValue(text);
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            onChangeValue && onChangeValue(text);
          }}
          containerStyle={StyleSheet.flatten([
            styles.input,
            { borderColor: error ? theme['color-danger-default'] : inputColor },
            style,
          ])}
          textContainerStyle={{
            flex: 1,
            backgroundColor: 'none',
            paddingHorizontal: 10,
            paddingVertical: 0,
            borderLeftColor: error ? theme['color-danger-default'] : inputColor,
            borderLeftWidth: 1,
          }}
          textInputProps={{
            onFocus: () => {
              setInputColor(theme['color-primary-default']);
            },
            onBlur: () => {
              setInputColor(theme['border-basic-color-1']);
            },
            placeholderTextColor: theme['text-hint-color'],
          }}
          countryPickerButtonStyle={{
          }}
          placeholder={placeholder}
          countryPickerProps={{
            withEmoji: false,
            modalProps: {
              transparent: true,
              animationType: 'fade',
            },
            filterProps: {
              placeholder: "Entrez le nom d'un pays",
              style: {
                width: '100%',
                fontSize: parseInt(theme['text-paragraph-1-font-size'], 10),
                fontFamily: theme['text-font-family'],
                color: theme['text-basic-color'],
                paddingHorizontal: 10,
                minHeight: parseInt(theme['size-medium'], 10),
                borderBottomColor: theme['border-basic-color-4'],
                borderBottomWidth: parseInt(theme['border-width'], 10),
                ...Platform.select({
                  default: null,
                  android: {
                    paddingVertical: 0,
                    marginVertical: -2,
                  },
                  web: {
                    outlineWidth: 0,
                  },
                }),
              },
            },
          }}
          textInputStyle={{
            fontSize: parseInt(theme['text-paragraph-1-font-size'], 10),
            fontFamily: theme['text-font-family'],
            color: theme['text-basic-color'],
          }}
          codeTextStyle={{
            fontSize: parseInt(theme['text-paragraph-1-font-size'], 10),
            fontFamily: theme['text-font-family'],
            color: theme['text-basic-color'],
          }}
          popoverStyle={{
            borderRadius: parseInt(theme['border-radius'], 10),
            borderWidth: parseInt(theme['border-width'], 10),
            borderColor: theme['border-basic-color-4'],
            overflow: 'hidden',
          }}
          flagButtonStyle={{
            // @ts-ignore
            withEmoji: false,
          }}
          defaultValue={defaultValue}
        />
        <Text type="error" style={{ color: theme['color-danger-default'] }}>{error && error.message}</Text>
      </View>
    );
  },
);

PhoneNumberInputComp.displayName = 'PhoneNumberInput';

export default PhoneNumberInputComp;

const themedStyles = StyleService.create({
  container: {
    marginVertical: 8,
    marginBottom: 20,
  },
  input: {
    paddingVertical: 5,
    paddingLeft: 10,
    height: 'size-medium',
    // @ts-ignore
    borderRadius: 'border-radius',
    width: 'auto',
    // @ts-ignore
    borderWidth: 'border-width',
  },
});
