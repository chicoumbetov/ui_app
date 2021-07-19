import React, {
} from 'react';
import {
  RadioGroup, Radio, Text, Button, RangeDatepicker, CalendarRange, I18nConfig, NativeDateService,
} from '@ui-kitten/components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import moment from 'moment';
import 'moment/locale/fr';

import MaxWidthContainer from '../../../components/MaxWidthContainer';
import {
  typeAssurance, typeBanque,
  typeCharge,
  typeDivers,
  typeImpots,
  typeRevenu,
} from '../../../mockData/ajoutRevenuData';
import FRangeDatePicker from '../../../components/Form/RangeDatePicker';
import { AvailableValidationRules } from '../../../components/Form/validation';

const allPossibleTypes = {
  ...typeCharge,
  ...typeImpots,
  ...typeRevenu,
  ...typeAssurance,
  ...typeDivers,
  ...typeBanque,
};

const i18n : I18nConfig = {
  dayNames: {
    short: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
    long: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  },
  monthNames: {
    short: ['Jan.', 'Fév.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sep.', 'Oct.', 'Nov.', 'Déc.'],
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

const MesCharges2 = () => {
  const { params } = useRoute();
  // console.log('params from useRoute', params);
  const titlePass = params;
  moment.locale('fr');

  const navigation = useNavigation();

  const firstDayCurrentYear = new Date(new Date().getFullYear(), 0, 1);
  const lastDayCurrentYear = new Date(new Date().getFullYear(), 11, 31);

  const firstDayPreviousYear = new Date(new Date().getFullYear() - 1, 0, 1);
  const lastDayPreviousYear = new Date(new Date().getFullYear() - 1, 11, 31);

  const startCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const lastCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const dateRange = { startDate: firstDayCurrentYear, endDate: lastDayCurrentYear };
  const [range, setRange] = React.useState<CalendarRange<Date>>(dateRange);

  const checkRadio = (i: Number) => {
    switch (i) {
      case 0:
        setRange({ startDate: firstDayCurrentYear, endDate: lastDayCurrentYear });
        break;
      case 1:
        setRange({ startDate: firstDayPreviousYear, endDate: lastDayPreviousYear });
        break;
      case 2:
        setRange({ startDate: startCurrentMonth, endDate: lastCurrentMonth });
        break;
      default:
        break;
    }
  };

  const controlRange = (rangeToTest:CalendarRange<Date>) => {
    let checkedRange: CalendarRange<Date> = {};
    let found = false;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i <= 2; i++) {
      switch (i) {
        case 0:
          checkedRange = ({ startDate: firstDayCurrentYear, endDate: lastDayCurrentYear });
          break;
        case 1:
          checkedRange = ({ startDate: firstDayPreviousYear, endDate: lastDayPreviousYear });
          break;
        case 2:
          checkedRange = ({ startDate: startCurrentMonth, endDate: lastCurrentMonth });
          break;
        default:
          break;
      }
      if (rangeToTest.startDate?.getTime() === checkedRange.startDate?.getTime()
          && rangeToTest.endDate?.getTime() === checkedRange.endDate?.getTime()) {
        setSelectedIndex(i);
        found = true;
        return;
      }
    }

    if (!found) {
      setSelectedIndex(-1);
    }
  };

  const onMesCharges3 = () => {
    // console.log('eeeee', go);
    navigation.navigate('mes-charges-3', { range, title: titlePass?.title });
  };

  return (
    <MaxWidthContainer outerViewProps={{
      style: {
        padding: 22,
      },
    }}
    >
      <Text category="h1" status="basic">
        {`Charge ${allPossibleTypes[titlePass?.title].label}`}
      </Text>

      <RadioGroup
        selectedIndex={selectedIndex}
        onChange={(index) => {
          setSelectedIndex(index); checkRadio(index);
        }}
        style={styles.containerRadio}
      >
        <Radio>
          <Text category="p1">Année</Text>
        </Radio>
        <Radio>
          <Text category="p1">Année - 1</Text>
        </Radio>
        <Radio>
          <Text category="p1">Mois</Text>
        </Radio>
      </RadioGroup>

      <Text category="h5">Sélectionnez les dates</Text>

      <RangeDatepicker
        range={range}
        min={new Date(1900, 0, 1)}
        max={new Date((new Date()).getFullYear() + 1, 0, 1)}
            // onChangeValue={(nextDate) => console.log('nextDate', nextDate)}
        dateService={localeDateService}
        onSelect={
              (nextRange) => {
                setRange(nextRange);
                controlRange(nextRange);
                // console.log('nextRange', nextRange);
              }
            }
        style={{
          flex: 1,
          marginTop: 10,
          shadowColor: 'rgba(190, 190, 190, 0.5)',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowRadius: 2,
          shadowOpacity: 1,
          elevation: 2,
          // width: 240,
        }}
      />

      {/**
      <FRangeDatePicker
        name="date"
        range={range}
        validators={[AvailableValidationRules.required]}
        icon="calendar-outline"
      />
      */}

      <View style={styles.buttonRight}>
        <Button
          onPress={() => onMesCharges3()}
          size="large"
          style={{ width: 173 }}
          disabled={!(range.endDate && range.startDate)}
        >
          Valider
        </Button>
      </View>

    </MaxWidthContainer>

  );
};

export default MesCharges2;

const styles = StyleSheet.create({
  container: {
    padding: 22,
    marginVertical: 12,
  },
  containerRadio: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  buttonRight: { marginTop: 20, alignItems: 'flex-end' },
});
