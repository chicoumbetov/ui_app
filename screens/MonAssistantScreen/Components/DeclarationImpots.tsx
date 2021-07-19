import React, { useEffect, useState } from 'react';
import { Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import Button from '../../../components/Button';
import TextInput from '../../../components/Form/TextInput';
import Form from '../../../components/Form/Form';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import { useRealEstateList } from '../../../src/API/RealEstate';
import FSelect from '../../../components/Form/Select';
import { AvailableValidationRules } from '../../../components/Form/validation';
import { TaxType } from '../../../src/API';

type DeclarationImpotsForm = {
  idBien: string;
  // idTenant: string;
  anneeEcheance: number;
};

const DeclarationImpots = () => {
  const { data } = useRealEstateList();
  const navigation = useNavigation();

  const declarationImpotsForm = useForm<DeclarationImpotsForm>();

  const [houseList, setHouseList] = useState<
  Array<{ label: string | undefined, key: string | undefined }>
  | undefined
  >([]);

  useEffect(() => {
    const selectHouse: Array<{ label: string, key: string }> = [];
    data?.listRealEstates?.items?.forEach((house) => {
      if (house && (house.ownName === true || house.typeImpot === TaxType.RevenueTax)) {
        selectHouse.push({ label: house?.name, key: house?.id });
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
    navigation.navigate('declaration-impots-2', house);
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
        Paramétrez l’aide à la déclaration d’impôts
      </Text>

      <Form<DeclarationImpotsForm> {...declarationImpotsForm}>
        <>
          <FSelect
            name="idBien"
            data={houseList}
            placeholder="Choisissez le bien"
            size="large"
            appearance="default"
            status="primary"
            validators={[AvailableValidationRules.required]}
          />

          <TextInput
            label="Année de l'écheance"
            name="anneeEcheance"
            placeholder="aaaa"
            keyboardType="numeric"
            icon="calendar-outline"
            maxLength={4}
            validators={[
              AvailableValidationRules.required,
            ]}
          />
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

          <Text category="c1" appearance="hint">
            * champ obligatoire
          </Text>
        </>
      </Form>

    </MaxWidthContainer>
  );
};

export default DeclarationImpots;

// const styles = StyleSheet.create({ item: { } });
