import React, {
  useState,
} from 'react';
import {
  RadioGroup, Radio, Text, Button, RangeDatepicker,
} from '@ui-kitten/components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

import MaxWidthContainer from '../../../components/MaxWidthContainer';
import FDatepicker from '../../../components/Form/DatePicker';

const MesCharges2 = () => {
  const { params } = useRoute();
  console.log('params from useRoute', params);
  const allDataByCategory = params;
  const navigation = useNavigation();
  // const declarationImpotsForm = useForm<DeclarationImpotsForm>();

  const firstDayCurrentYear = new Date(new Date().getFullYear(), 0, 1);
  const lastDayCurrentYear = new Date(new Date().getFullYear(), 11, 31);

  const firstDayPreviousYear = new Date(new Date().getFullYear() - 1, 0, 1);
  const lastDayPreviousYear = new Date(new Date().getFullYear() - 1, 11, 31);

  const startCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const lastCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

  // console.log('lastDayCurrentYear:', lastDayCurrentYear);
  // console.log('firstDayCurrentYear:', firstDayCurrentYear);
  // console.log('firstDayPreviousYear:', firstDayPreviousYear);
  // console.log('lastDayPreviousYear:', lastDayPreviousYear);
  // console.log('startCurrentMonth:', startCurrentMonth);
  // console.log('lastCurrentMonth:', lastCurrentMonth);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const titlePass = allDataByCategory?.label;

  const onMesCharges3 = (allDataByCategory) => {
    navigation.navigate('mes-charges-3', { ...allDataByCategory });
    console.log('insideMesCharges3', { ...allDataByCategory });
  };

  const [radioText, setRadioText] = useState("l'année");
  const [dateStart, setDateStart] = useState<Date>(firstDayCurrentYear);
  const [dateEnd, setDateEnd] = useState<Date>(lastDayCurrentYear);

  const dateRange = { startDate: dateStart, endDate: dateEnd };
  const [range, setRange] = React.useState(dateRange);

  const checkRadio = (i) => {
    switch (i) {
      case 0:
        setRadioText("l'année");
        setDateStart(firstDayCurrentYear);
        setDateEnd(lastDayCurrentYear);
        break;
      case 1:
        setRadioText("l'année -1");
        setDateStart(firstDayPreviousYear);
        setDateEnd(lastDayPreviousYear);
        break;
      case 2:
        setRadioText('le mois');
        setDateStart(startCurrentMonth);
        setDateEnd(lastCurrentMonth);
        break;
    }
  };

  const websiteElements = () => (
    <FDatepicker
      name="currentYearStart"
      placeholder="currentYearStart"
      defaultValue={dateStart.toString()}
      style={{ marginHorizontal: 10 }}
    />
  );

  console.log('log: ', dateStart, dateEnd);
  console.log('eeeee: ', dateStart.toString());

  return (
    <MaxWidthContainer outerViewProps={{
      style: {
        padding: 22,
      },
    }}
    >
      <Text category="h1" status="basic">
        Charge
        {' '}
        {titlePass}
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

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, marginRight: 15 }}>
          <Text category="h5">
            Selectionner
            {' '}
            {radioText}
          </Text>
        </View>
        <FDatepicker
          name="dateStart"
          placeholder="Date start"
          date={dateStart}
          defaultValue={dateStart.toString()}
          style={{ marginHorizontal: 10 }}
          onSelect={(next) => setDateStart(next)}
        />
        <FDatepicker
          name="dateEnd"
          placeholder="Date end"
          defaultValue={dateEnd.toString()}
          onSelect={(nextDate) => setDateEnd(nextDate)}
          onChangeValue={(nextDate) => setDateEnd(nextDate)}
        />

      </View>
      <RangeDatepicker
        range={range}
        onChangeValue={(nextDate) => setRange(nextDate)}
        onSelect={
          (nextRange) => setRange({ startDate: nextRange.startDate, endDate: nextRange.endDate })
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
        }}
      />

      <View style={styles.buttonRight}>
        <Button
          onPress={() => onMesCharges3(allDataByCategory)}
          size="large"
          style={{ width: 173 }}
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
    backgroundColor: '#f6f6f6',
  },
  containerRadio: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 15,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  buttonRight: { marginTop: 20, alignItems: 'flex-end' },
});
