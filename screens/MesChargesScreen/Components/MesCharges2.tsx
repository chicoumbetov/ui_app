import React, {
  useEffect, useState,
  // useState
} from 'react';
import {
  Layout, RadioGroup, Radio, Text, Button, Datepicker, RangeDatepicker,
} from '@ui-kitten/components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
// import { useForm } from 'react-hook-form';
import TextInputComp from '../../../components/Form/TextInput';

import MaxWidthContainer from '../../../components/MaxWidthContainer';

// type DeclarationImpotsForm = { bien: string; anneeEcheance: string; };

const MesCharges2 = () => {
  const route = useRoute();
  const { params } = useRoute();
  console.log('params', params);
  const navigation = useNavigation();
  // const declarationImpotsForm = useForm<DeclarationImpotsForm>();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const previousYear = currentYear - 1;
  console.log('params', previousYear, currentYear, currentMonth);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const titlePass = params;
  console.log('titlePass', titlePass);

  const onMesCharges3 = (titlePass) => {
    navigation.navigate('mes-charges-3', { ...titlePass });
    console.log('insideMesCharges3', { ...titlePass });
  };

  const [radioText, setRadioText] = useState("l'année");

  const checkRadio = (i) => {
    switch (i) {
      case 0:
        setRadioText("l'année");
        setRange({});
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
        {route.params.title}
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
