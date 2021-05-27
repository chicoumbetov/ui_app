import React, { useEffect, useState } from 'react';
import { Button, Layout, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet, View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import Form from '../../../components/Form/Form';
import SelectComp from '../../../components/Form/Select';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import TextInput from '../../../components/Form/TextInput';
import { useRealEstateList } from '../../../src/API/RealEstate';

type QuittanceLoyerForm = {
  bien: string;
  anneeEcheance: string;
};

const QuittanceLoyer = () => {
  const navigation = useNavigation();
  const { data } = useRealEstateList();
  const [houseList, setHouseList] = useState<Array<{ label: string, key: string }>>([]);

  useEffect(() => {
    const selectHouse: Array<{ label: string, key: string }> = [];
    data?.listRealEstates?.items?.forEach((house) => {
      if (house) {
        selectHouse.push({ label: house.name, key: house.id });
      }
    });
    setHouseList(selectHouse);
  }, [data]);

  /**
  const comptesData = [
    {
      label: 'La Maison de Matthieu',
      key: 'b1',
    },
    {
      label: 'L\'Appart de Matthieu',
      key: 'b2',
    },
  ];
   */

  const quittanceLoyerForm = useForm<QuittanceLoyerForm>();

  const onQuittanceLoyer2 = () => {
    navigation.navigate('QuittanceLoyer2');
  };

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
      }}
    >

      <View style={styles.containerOut}>

        <Text category="h1" style={styles.title}>Générer une quittance de loyer</Text>
        <Form <QuittanceLoyerForm> {...quittanceLoyerForm}>
          <>
            <SelectComp
              name="bien"
              data={houseList}
              placeholder="Choisissez le bien"
              size="large"
              appearance="default"
              status="primary"
            />
            <TextInput
              name="anneeEcheance"
              label="Année de l'écheance"
              placeholder="aaaa"
              icon="calendar-outline"
            />
          </>
        </Form>

        <View style={styles.buttonRight}>
          <Button onPress={onQuittanceLoyer2} size="large" style={{ width: 139 }}>
            Confirmer
          </Button>
        </View>

      </View>
    </MaxWidthContainer>
  );
};

export default QuittanceLoyer;

const styles = StyleSheet.create({
  containerOut: {
    flex: 1,
    padding: 25,
    paddingRight: 21,
  },
  title: {
    marginTop: 19.7,
    marginBottom: 14,
  },
  item: {
    borderBottomEndRadius: 20,
  },
  buttonRight: { marginTop: 36, alignItems: 'flex-end' },
});
