import React, { useEffect, useState } from 'react';
import {
  Button, Text,
} from '@ui-kitten/components';
import { useLinkTo } from '@react-navigation/native';
import {
  View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import TextInput from '../../../components/Form/TextInput';
import Form from '../../../components/Form/Form';
import Select from '../../../components/Form/Select';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import { useRealEstateList } from '../../../src/API/RealEstate';

type DeclarationImpotsForm = {
  bien: string;
  anneeEcheance: number;
};

const DeclarationImpots = () => {
  const { data } = useRealEstateList();
  const linkTo = useLinkTo();
  const [houseList, setHouseList] = useState<Array<{ label: string, key: string }>>([]);
  const declarationImpotsForm = useForm<DeclarationImpotsForm>();
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

  const onDeclarationImpots2 = (house : DeclarationImpotsForm) => {
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
      <Text
        category="h1"
        style={{
          marginVertical: 15,
        }}
      >
        Paramétrer mon aide à la déclaration d'impôts
      </Text>

      <Form<DeclarationImpotsForm> {...declarationImpotsForm}>
        <>
          <Select
            name="bien"
            data={houseList}
            placeholder="Choisissez le bien"
            size="large"
            appearance="default"
            status="primary"
          />
          <TextInput
            label="Année de l'écheance"
            name="anneeEcheance"
            placeholder="aaaa"
            keyboardType="numeric"
            icon="calendar-outline"
          />
        </>
      </Form>

      <View style={{ marginTop: 20, alignItems: 'flex-end' }}>
        <Button
          onPress={declarationImpotsForm.handleSubmit((house) => {
            onDeclarationImpots2(house);
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

export default DeclarationImpots;

// const styles = StyleSheet.create({ item: { } });
