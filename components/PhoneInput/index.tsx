import React, { PureComponent } from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import CountryPicker, {
  CallingCode,
  Country,
  CountryCode,
  Flag,
  getCallingCode,
} from 'react-native-country-picker-modal';
import { CountryFilterProps } from 'react-native-country-picker-modal/lib/CountryFilter';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import { Icon, Popover } from '@ui-kitten/components';
import styles from './styles';
import { CUSTOM_THEME } from './CountryListTheme';

const phoneUtil = PhoneNumberUtil.getInstance();

export interface PhoneInputProps {
  withDarkTheme?: boolean;
  withShadow?: boolean;
  autoFocus?: boolean;
  defaultCode?: CountryCode;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  disableArrowIcon?: boolean;
  placeholder?: string;
  onChangeCountry?: (country: Country) => void;
  onChangeText?: (text: string) => void;
  onChangeFormattedText?: (text: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  textContainerStyle?: StyleProp<ViewStyle>;
  textInputProps?: TextInputProps;
  textInputStyle?: StyleProp<TextStyle>;
  codeTextStyle?: StyleProp<TextStyle>;
  flagButtonStyle?: StyleProp<ViewStyle>;
  countryPickerButtonStyle?: StyleProp<ViewStyle>;
  layout?: 'first' | 'second';
  filterProps?: CountryFilterProps;
  countryPickerProps?: any;
  flagSize?: number;
  popoverStyle?: ViewStyle;
}
export interface PhoneInputState {
  code: CallingCode | undefined;
  number: string;
  modalVisible: boolean;
  countryCode: CountryCode;
  disabled: boolean;
}

export default class PhoneInput extends PureComponent<PhoneInputProps, PhoneInputState> {
  constructor(props: PhoneInputProps) {
    super(props);

    // eslint-disable-next-line no-nested-ternary
    let number = props.value
      ? props.value
      : props.defaultValue
        ? props.defaultValue
        : '';
    let countryCode = props.defaultCode ? props.defaultCode : 'IN';
    try {
      const parsedNumber = phoneUtil.parseAndKeepRawInput(number, props.defaultCode);
      countryCode = phoneUtil.getRegionCodeForNumber(parsedNumber) as CountryCode;
      number = phoneUtil.format(parsedNumber, PhoneNumberFormat.NATIONAL);
    } catch (e) {}

    this.state = {
      code: props.defaultCode ? undefined : '91',
      number,
      modalVisible: false,
      countryCode,
      disabled: props.disabled || false,
    };
  }

  static getDerivedStateFromProps(nextProps: PhoneInputProps, prevState: PhoneInputState) {
    if (nextProps.disabled !== prevState.disabled) {
      if ((nextProps.value || nextProps.value === '') && nextProps.value !== prevState.number) {
        return ({ disabled: nextProps.disabled, number: nextProps.value });
      }
      return ({ disabled: nextProps.disabled });
    }
    if (!prevState.number || prevState.number === '') {
      // eslint-disable-next-line no-nested-ternary
      let number = nextProps.value
        ? nextProps.value
        : nextProps.defaultValue
          ? nextProps.defaultValue
          : '';
      let countryCode = nextProps.defaultCode ? nextProps.defaultCode : 'IN';
      try {
        const parsedNumber = phoneUtil.parseAndKeepRawInput(number, nextProps.defaultCode);
        countryCode = phoneUtil.getRegionCodeForNumber(parsedNumber) as CountryCode;
        number = phoneUtil.format(parsedNumber, PhoneNumberFormat.NATIONAL);
      } catch (e) {}

      return {
        // eslint-disable-next-line no-nested-ternary
        number,
        countryCode,
      };
    }
    return null;
  }

  async componentDidMount() {
    const { defaultCode } = this.props;
    if (defaultCode) {
      const code = await getCallingCode(defaultCode);
      this.setState({ code });
    }
  }

  getCountryCode = () => {
    const { countryCode } = this.state;
    return countryCode;
  };

  getCallingCode = () => {
    const { code } = this.state;
    return code;
  };

  onSelect = (country: Country) => {
    const { onChangeCountry } = this.props;
    const { number } = this.state;
    this.setState(
      {
        countryCode: country.cca2,
        code: country.callingCode[0],
      },
      () => {
        const { onChangeFormattedText } = this.props;
        if (onChangeFormattedText) {
          if (country.callingCode[0]) {
            onChangeFormattedText(
              `+${country.callingCode[0]}${number}`,
            );
          } else {
            onChangeFormattedText(number);
          }
        }
      },
    );
    if (onChangeCountry) {
      onChangeCountry(country);
    }
  };

  onChangeText = (text: string) => {
    this.setState({ number: text });
    const { onChangeText, onChangeFormattedText } = this.props;
    if (onChangeText) {
      onChangeText(text);
    }
    if (onChangeFormattedText) {
      const { code } = this.state;
      if (code) {
        let formated = text.length > 0 ? `+${code}${text}` : text;
        try {
          const parsedNumber = phoneUtil.parseAndKeepRawInput(text.length > 0 ? `+${code}${text}` : text, code);
          formated = phoneUtil.format(parsedNumber, PhoneNumberFormat.E164);
        } catch (err) {
        }
        onChangeFormattedText(formated);
      } else {
        onChangeFormattedText(text);
      }
    }
  };

  getNumberAfterPossiblyEliminatingZero() {
    let { number } = this.state;
    const { code } = this.state;
    if (number.length > 0 && number.startsWith('0')) {
      number = number.substr(1);
      return { number, formattedNumber: code ? `+${code}${number}` : number };
    }
    return { number, formattedNumber: code ? `+${code}${number}` : number };
  }

  isValidNumber = (number?: string) => {
    try {
      const { countryCode } = this.state;
      const parsedNumber = phoneUtil.parse(number, countryCode);
      return phoneUtil.isValidNumber(parsedNumber);
    } catch (err) {
      return false;
    }
  };

  renderFlagButton = () => {
    const { layout = 'first', flagSize, flagButtonStyle } = this.props;
    const { countryCode } = this.state;
    if (layout === 'first') {
      return (
        <Flag
          countryCode={countryCode}
          flagSize={flagSize || CUSTOM_THEME.flagSize}
          {...flagButtonStyle}
        />
      );
    }
    return <View />;
  };

  renderToggleButton = () => {
    const {
      withShadow,
      withDarkTheme,
      codeTextStyle,
      textInputProps,
      textInputStyle,
      autoFocus,
      placeholder,
      containerStyle,
      textContainerStyle,
      disableArrowIcon,
      flagButtonStyle,
      countryPickerButtonStyle,
      layout = 'first',
    } = this.props;
    const {
      code, disabled, number,
    } = this.state;
    return (
      <View
        style={[
          styles.container,
          withShadow ? styles.shadow : {},
          containerStyle || {},
        ]}
      >
        <TouchableOpacity
          style={[
            styles.flagButtonView,
            layout === 'second' ? styles.flagButtonExtraWidth : {},
            flagButtonStyle || {},
            countryPickerButtonStyle || {},
          ]}
          disabled={disabled}
          onPress={() => this.setState({ modalVisible: true })}
        >
          {this.renderFlagButton()}
          {code && layout === 'second' && (
            <Text
              style={[styles.codeText, codeTextStyle || {}]}
            >
              {`+${code}`}
            </Text>
          )}
          {!disableArrowIcon && (
          <Icon name="chevron-down-outline" width={24} />
          )}
        </TouchableOpacity>
        <View
          style={[
            styles.textContainer,
            textContainerStyle || {},
          ]}
        >
          {code && layout === 'first' && (
            <Text
              style={[styles.codeText, codeTextStyle || {}]}
            >
              {`+${code}`}
            </Text>
          )}
          <TextInput
            style={[styles.numberText, platformStyles.text, textInputStyle || {}]}
            placeholder={placeholder || 'Phone Number'}
            onChangeText={this.onChangeText}
            value={number}
            editable={!disabled}
            selectionColor="black"
            keyboardAppearance={withDarkTheme ? 'dark' : 'default'}
            keyboardType="number-pad"
            autoFocus={autoFocus}
            {...textInputProps}
          />
        </View>
      </View>
    );
  };

  render() {
    const {
      withDarkTheme,
      countryPickerProps = {},
      filterProps = {},
      popoverStyle,
    } = this.props;
    const {
      modalVisible, countryCode, disabled,
    } = this.state;
    return (
      <Popover
        visible={modalVisible}
        anchor={this.renderToggleButton}
        style={[popoverStyle, {
          maxHeight: 220,
        }]}
        fullWidth
        onBackdropPress={() => this.setState({ modalVisible: false })}
      >
        <View style={{ flex: 1 }}>
          <CountryPicker
            onSelect={this.onSelect}
            withEmoji
            withFilter
            withFlag
            filterProps={filterProps}
            countryCode={countryCode}
            withCallingCode
            disableNativeModal={disabled}
            visible={modalVisible}
            withModal={false}
            withCloseButton={false}
            theme={CUSTOM_THEME}
            onClose={() => this.setState({ modalVisible: false })}
            {...countryPickerProps}
          />
        </View>
      </Popover>
    );
  }
}

export const isValidNumber = (number: string, countryCode: CountryCode) => {
  try {
    const parsedNumber = phoneUtil.parse(number, countryCode);
    return phoneUtil.isValidNumber(parsedNumber);
  } catch (err) {
    return false;
  }
};

const platformStyles = StyleSheet.create({
  // @ts-ignore
  text: Platform.select({
    default: null,
    android: {
      paddingVertical: 0,
      marginVertical: -2,
    },
    web: {
      outlineWidth: 0,
    },
  }),
});
