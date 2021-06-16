import React, {
  useEffect, useState,
} from 'react';
import {
  Layout, RadioGroup, Radio, Text, Button, RangeDatepicker,
} from '@ui-kitten/components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

import MaxWidthContainer from '../../../components/MaxWidthContainer';
import FDatepicker from '../../../components/Form/DatePicker';

const MesCharges2 = () => {
  const { params } = useRoute();
  console.log('params', params);
  const allDataByCategory = params;
  const navigation = useNavigation();
  // const declarationImpotsForm = useForm<DeclarationImpotsForm>();

  const firstDayCurrentYear = new Date(new Date().getFullYear(), 0, 1);
  const lastDayCurrentYear = new Date(new Date().getFullYear(), 11, 31);

  const firstDayPreviousYear = new Date(new Date().getFullYear() - 1, 0, 1);
  const lastDayPreviousYear = new Date(new Date().getFullYear() - 1, 11, 31);

  const startCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const lastCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

  const [currentYearStart, setCurrentYearStart] = React.useState(firstDayCurrentYear);
  const [currentYearEnd, setCurrentYearEnd] = React.useState(lastDayCurrentYear);

  console.log('params', 'firstDayCurrentYear:', firstDayCurrentYear, 'lastDayCurrentYear:', lastDayCurrentYear);
  console.log('params', 'firstDayPreviousYear:', firstDayPreviousYear, 'lastDayPreviousYear:', lastDayPreviousYear);
  console.log('params', 'startCurrentMonth:', startCurrentMonth);
  console.log('params', 'lastCurrentMonth:', lastCurrentMonth);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const titlePass = allDataByCategory?.label;

  const onMesCharges3 = (titlePass) => {
    navigation.navigate('mes-charges-3', { ...titlePass });
    console.log('insideMesCharges3', { ...titlePass });
  };

  const [radioText, setRadioText] = useState("l'année");

  const checkRadio = (i) => {
    switch (i) {
      case 0:
        setRadioText("l'année");
        setRange({ currentYear });
        break;
      case 1:
        setRadioText("l'année -1");
        break;
      case 2:
        setRadioText('le mois');
        break;
    }
  };

  const [range, setRange] = React.useState({});

  useEffect(() => {
    console.log('useEffect test of MesCharges 2', range);
  });

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
          console.log(range);
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

      <Layout style={{ flexDirection: 'row', backgroundColor: 'transparent', alignItems: 'center' }}>
        <View style={{ marginRight: 15 }}>
          <Text category="h5">
            Selectionner
            {' '}
            {radioText}
          </Text>
        </View>

        <RangeDatepicker
          range={range}
          onSelect={(nextRange) => setRange(nextRange)}
          style={{ flex: 1 }}
        />
        <FDatepicker
          name="currentYearStart"
          placeholder="currentYearStart"
        />
        <FDatepicker
          name="currentYearEnd"
          placeholder="currentYearEnd"
        />

      </Layout>
      {/**
      <Datepicker />
      */}
      <View style={styles.buttonRight}>
        <Button onPress={() => onMesCharges3(titlePass)} size="large" style={{ width: 173 }}>
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
