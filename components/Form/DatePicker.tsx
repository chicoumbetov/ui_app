import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { Datepicker, Icon, IconProps } from '@ui-kitten/components';
import { DatePickerFormProps } from './types';

const TextInputComp = React.forwardRef<Datepicker, DatePickerFormProps>(
  (props: DatePickerFormProps, ref): React.ReactElement => {
    const {
      label,
      icon,
      error,
      onChangeValue,
      placeholder,
      ...DatePickerProps
    } = props;

    const [inputValue, setInputValue] = useState<Date | null>(null);

    useEffect(() => {
      if (inputValue === null) {
        setInputValue(defaultValue);
      }
      if (onChangeValue && defaultValue) onChangeValue(inputValue);
    }, [inputValue]);

    const renderIcon = (iconProps: IconProps) => (
      <Icon {...iconProps} name={icon} />
    );

    return (
      <View style={[styles.container, containerStyle]}>
        <Datepicker
          label={label}
          accessoryRight={icon ? renderIcon : undefined}
          style={[styles.input, style]}
          caption={error && error.message}
          status={error && error.message ? 'danger' : ''}
          {...DatePickerProps}
          size="medium"
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
    flex: 1,
    marginVertical: 8,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
  },
});
