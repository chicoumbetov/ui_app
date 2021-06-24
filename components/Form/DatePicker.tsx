import * as React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import { useEffect, useState } from 'react';
import {
  Datepicker, I18nConfig, Icon, IconProps, NativeDateService, Text,
} from '@ui-kitten/components';
import { DatePickerFormProps } from './types';
import DateUtils from '../../utils/DateUtils';

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

const DatepickerComp = React.forwardRef<
Datepicker, DatePickerFormProps
>(
  (props: DatePickerFormProps, ref): React.ReactElement => {
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
      ...DatePickerProps
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
          <Text category="label" style={{ flex: 1 }}>{label}</Text>
        )}
        <Datepicker
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
            marginLeft: labelBefore ? 20 : 0,
          }}
          min={new Date(1900, 0, 1)}
          size="medium"
          {...DatePickerProps}
          onSelect={(date) => {
            setInputValue(date);
            if (onChangeValue) {
              const newDate = date;
              newDate.setHours(12);
              onChangeValue(newDate.toISOString().substr(0, 10));
            }
          }}
          date={inputValue}
        />
      </View>
    );
  },
);

DatepickerComp.displayName = 'Datepicker';

export default DatepickerComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 8,
    flexDirection: 'row',
    marginBottom: 20,
    // justifyContent: 'space-between',
  },
  input: {
    flex: 1,
  },
});
