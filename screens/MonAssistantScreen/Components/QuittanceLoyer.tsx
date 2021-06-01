import React, { useEffect, useState } from 'react';
import { Button, Text } from '@ui-kitten/components';
import { useLinkTo } from '@react-navigation/native';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import Form from '../../../components/Form/Form';
import SelectComp from '../../../components/Form/Select';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import TextInput from '../../../components/Form/TextInput';
import { useRealEstateList } from '../../../src/API/RealEstate';

type QuittanceLoyerForm = {
  bien: string;
  anneeEcheance: number;
};

const QuittanceLoyer = () => {
  const { data } = useRealEstateList();
  const linkTo = useLinkTo();
  const quittanceLoyerForm = useForm<QuittanceLoyerForm>();
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
  const onQuittanceLoyer2 = (house : QuittanceLoyerForm) => {
    // console.log(house.bien);
    const id = house.bien;
    const { anneeEcheance } = house;
    linkTo(`/mon-assistant/declaration-impots/${id}/${anneeEcheance}`);
  };

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
        style: {
          padding: 25,
        },
      }}
    >

      <Text category="h1" style={{ marginVertical: 15 }}>Générer une quittance de loyer</Text>
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
            keyboardType="numeric"
            icon="calendar-outline"
          />
        </>
      </Form>

      <View style={{ marginTop: 20, alignItems: 'flex-end' }}>
        <Button
          onPress={quittanceLoyerForm.handleSubmit((house) => {
            onQuittanceLoyer2(house);
          })}
          size="large"
          style={{ width: 139 }}
        >
          Confirmer
        </Button>
      </View>

    </MaxWidthContainer>
  );
};

export default QuittanceLoyer;

// const styles = StyleSheet.create({});
