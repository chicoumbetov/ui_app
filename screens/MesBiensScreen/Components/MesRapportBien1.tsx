import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Button, CalendarRange, Radio, RadioGroup, RangeDatepicker, Text,
} from '@ui-kitten/components';

import { StyleSheet, View } from 'react-native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import MaxWidthContainer from '../../../components/MaxWidthContainer';

import { TabMesBiensParamList } from '../../../types';

const MesRapportBien1 = () => {
  const navigation = useNavigation();

  const route = useRoute<RouteProp<TabMesBiensParamList, 'mes-rapports-biens1'>>();
  const houseId = route.params.id;
  // console.log('MesRapportBien', route.params.id);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const firstDayCurrentYear = new Date(new Date().getFullYear(), 0, 1);
  const lastDayCurrentYear = new Date(new Date().getFullYear(), 11, 31);

  const firstDayPreviousYear = new Date(new Date().getFullYear() - 1, 0, 1);
  const lastDayPreviousYear = new Date(new Date().getFullYear() - 1, 11, 31);

  const startCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const lastCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

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

  const allerMesRapportsBien2 = () => {
    navigation.navigate('mes-rapports-biens2', { range, id: houseId });
  };

  return (
    <MaxWidthContainer outerViewProps={{
      style: {
        padding: 22,
      },
    }}
    >
      <Text category="h1" status="basic">
        Mes rapports par bien
      </Text>

      <RadioGroup
        selectedIndex={selectedIndex}
        onChange={(index) => {
          setSelectedIndex(index); checkRadio(index);
        }}
        style={{
          flexDirection: 'row',
          marginTop: 30,
          marginBottom: 15,
          justifyContent: 'space-between',
        }}
      >
        <Radio>
          <Text category="p1" status="basic">Année</Text>
        </Radio>
        <Radio>
          <Text category="p1">Année - 1</Text>
        </Radio>
        <Radio>
          <Text category="p1">Mois</Text>
        </Radio>
      </RadioGroup>

      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      }}
      >
        <Text category="h5" style={{ marginRight: 15, flex: 1 }}>Sélectionnez les dates</Text>
        <RangeDatepicker
          range={range}
          min={new Date(1900, 0, 1)}
          max={new Date((new Date()).getFullYear() + 1, 0, 1)}
            // onChangeValue={(nextDate) => console.log('nextDate', nextDate)}
          onSelect={
              (nextRange) => {
                setRange(nextRange);
                controlRange(nextRange);
                // console.log('nextRange', nextRange);
              }
            }
          style={{
            shadowColor: 'rgba(190, 190, 190, 0.5)',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowRadius: 2,
            shadowOpacity: 1,
            elevation: 2,
            // flex: 1,
          }}
        />
      </View>

      <View style={styles.buttonRight}>
        <Button
          onPress={() => allerMesRapportsBien2()}
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

export default MesRapportBien1;

const styles = StyleSheet.create({
  container: {
    padding: 22,
    marginVertical: 12,
  },
  containerRadio: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  buttonRight: { marginTop: 20, alignItems: 'flex-end' },
});
