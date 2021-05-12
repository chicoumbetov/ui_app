import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import PhoneInput from 'react-native-phone-number-input';
import { colors, fontSize, size } from '../../assets/styles';
import Text from '../Text';
import Icon from '../Icon';
import { PhoneNumberInputFormProps } from './types';

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
        <PhoneInput
          ref={ref}
          defaultValue={inputValue}
          defaultCode="FR"
          layout="first"
          onChangeFormattedText={(text) => {
            setInputValue(text);
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            onChangeValue && onChangeValue(text);
          }}
          containerStyle={StyleSheet.flatten([
            styles.input,
            { borderColor: error ? colors.error : inputColor },
            style,
          ])}
          textContainerStyle={{
            flex: 1,
            backgroundColor: 'none',
            paddingHorizontal: 10,
            paddingVertical: 0,
            borderLeftColor: error ? colors.error : inputColor,
            borderLeftWidth: 1,
          }}
          textInputProps={{
            onFocus: () => {
              setInputColor(colors.green);
            },
            onBlur: () => {
              setInputColor(colors.text);
            },
            placeholderTextColor: inputColor,
          }}
          countryPickerButtonStyle={{
            width: 65,
            paddingRight: 10,
          }}
          renderDropdownImage={<Icon name="chevron" size={12} style={{ marginRight: 5 }} />}
          placeholder={placeholder}
          countryPickerProps={{
            withEmoji: false,
            modalProps: {
              transparent: true,
              animationType: 'fade',
            },
            filterProps: {
              placeholder: "Entrez le nom d'un pays",
            },
          }}
          flagButtonStyle={{
            // @ts-ignore
            withEmoji: false,
          }}
        />
        <Text type="error">{error && error.message}</Text>
      </View>
    );
  },
);

PhoneNumberInputComp.displayName = 'PhoneNumberInput';

export default PhoneNumberInputComp;

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
    width: 'auto',
  },
});
