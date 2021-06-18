import {
  I18nConfig, Icon, IconProps, NativeDateService, RangeDatepicker, Text,
} from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DateUtils from '../../utils/DateUtils';
import { RangeDatePickerFormProps } from './types';

const i18n : I18nConfig = {
  dayNames: {
    short: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
    long: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  },
  monthNames: {
    short: ['Janv.', 'Févr.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    long: [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'October',
      'Novembre',
      'Décembre',
    ],
  },
};
const localeDateService = new NativeDateService('ru', { i18n, startDayOfWeek: 1 });

const FRangeDatePicker = React.forwardRef<
RangeDatepicker, RangeDatePickerFormProps
>((props: RangeDatePickerFormProps, ref) => {
  const {
    label,
    labelBefore,
    icon,
    error,
    onChangeValue,
    placeholder,
    labelStyle,
    containerStyle,
    defaultValue,
    style,
    ...RangeDatePickerProps
  } = props;

  const [inputValue, setInputValue] = useState<Date>();

  useEffect(() => {
    if (inputValue === undefined && defaultValue) {
      setInputValue(DateUtils.parseToDateObj(defaultValue));
    }
  }, [inputValue]);

  const renderIcon = (iconProps: IconProps) => (
    <Icon {...iconProps} name={icon} />
  );

  return (
    <View style={[styles.container, containerStyle, labelBefore ? { flexDirection: 'row', alignItems: 'center' } : {}]}>
      {labelBefore && (
        <View style={{ marginRight: 20 }}>
          <Text category="label">{label}</Text>
        </View>
      )}
      <RangeDatepicker
        label={labelBefore ? undefined : label}
        ref={ref}
        accessoryRight={icon ? renderIcon : undefined}
        style={[styles.input, style]}
        caption={error && error.message}
        status={error && error.message ? 'danger' : ''}
        dateService={localeDateService}
        placeholder={placeholder}
        controlStyle={{
          shadowColor: 'rgba(190, 190, 190, 0.5)',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowRadius: 2,
          shadowOpacity: 1,
          elevation: 2,
        }}
        min={new Date(1900, 0, 1)}
        size="medium"
        {...RangeDatePickerProps}
        onSelect={(date) => {
          setInputValue(date);
          if (onChangeValue) {
            const newDate = date;
            newDate.startDate?.setHours(12);
            newDate.endDate?.setHours(12);
            onChangeValue(newDate.startDate?.toISOString().substr(0, 10));
            onChangeValue(newDate.endDate?.toISOString().substr(0, 10));
          }
        }}
        date={inputValue}
      />
    </View>
  );
});

export default FRangeDatePicker;

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
