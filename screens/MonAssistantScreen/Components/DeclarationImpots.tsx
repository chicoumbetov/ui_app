import React, { useEffect, useState } from 'react';
import {
  Button, Text,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import TextInput from '../../../components/Form/TextInput';
import Form from '../../../components/Form/Form';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import { useRealEstateList } from '../../../src/API/RealEstate';
import FSelect from '../../../components/Form/Select';
import { AvailableValidationRules } from '../../../components/Form/validation';

type DeclarationImpotsForm = {
  idBien: string;
  // idTenant: string;
  anneeEcheance: number;
};

const DeclarationImpots = () => {
  const { data } = useRealEstateList();
  const navigation = useNavigation();

  const declarationImpotsForm = useForm<DeclarationImpotsForm>();

  const [tenantsList, setTenantsList] = useState<
  Array<{ label: string | undefined, key: string | undefined }>
  | undefined
  >([]);

  const [houseList, setHouseList] = useState<
  Array<{ label: string | undefined, key: string | undefined }>
  | undefined
  >([]);

  useEffect(() => {
    const selectHouse: Array<{ label: string, key: string }> = [];
    data?.listRealEstates?.items?.forEach((house) => {
      if (house) {
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
        Paramétrer mon aide à la déclaration d'impôts
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
            onChangeValue={(selectedKey) => {
              if (selectedKey) {
                const currentBien = data?.listRealEstates?.items?.filter(
                  (item) => item?.id === selectedKey,
                ).pop();
                const tenantList = currentBien?.tenants?.map(
                  (tenant) => ({ label: `${tenant?.firstname} ${tenant?.lastname}`, key: tenant?.id }),
                );
                setTenantsList(tenantList);
              }
            }}
          />
          {tenantsList ? (
            <>
              {/**
              <FSelect
                name="idTenant"
                data={tenantsList}
                placeholder="Choisissez le locataire"
                size="large"
                appearance="default"
                status="primary"
              />
 */}
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
            </>
          ) : (<Text status="warning">Vous devez ajouter un locataire à votre bien</Text>) }
        </>
      </Form>

    </MaxWidthContainer>
  );
};

export default DeclarationImpots;

// const styles = StyleSheet.create({ item: { } });
