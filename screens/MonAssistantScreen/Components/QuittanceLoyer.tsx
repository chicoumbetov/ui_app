import React, { useEffect, useState } from 'react';
import { Button, Datepicker, Text } from '@ui-kitten/components';
import { useLinkTo, useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import Form from '../../../components/Form/Form';
import SelectComp from '../../../components/Form/Select';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import TextInput from '../../../components/Form/TextInput';
import { useRealEstateList } from '../../../src/API/RealEstate';
import DatePicker from '../../../components/Form/DatePicker';
import { TabMonAssistantParamList } from '../../../types';

type QuittanceLoyerForm = {
  idBien: string;
  idTenant: string;
  date: string;
};

const QuittanceLoyer = () => {
  const { data } = useRealEstateList();
  const navigation = useNavigation();
  const quittanceLoyerForm = useForm<QuittanceLoyerForm>();
  const [houseList, setHouseList] = useState<
  Array<{ label: string | undefined, key: string | undefined }>
  | undefined
  >([]);
  const [tenantsList, setTenantsList] = useState<
  Array<{ label: string | undefined, key: string | undefined }>
  | undefined
  >([]);

  useEffect(() => {
    const selectHouse = data?.listRealEstates?.items?.filter((house) => {
      if (house) {
        return true;
      }
      return false;
    }).map((house) => ({ label: house?.name, key: house?.id }));
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
    navigation.navigate('quittance-loyer-2', house);
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
            name="idBien"
            data={houseList}
            placeholder="Choisissez le bien"
            size="large"
            appearance="default"
            status="primary"
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
              <SelectComp
                name="idTenant"
                data={tenantsList}
                placeholder="Choisissez le locataire"
                size="large"
                appearance="default"
                status="primary"
              />
              <DatePicker
                name="date"
                label="Date de la quittance"
                placeholder="jj/mm/aaaa"
                icon="calendar-outline"
              />
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
            </>
          ) : (<Text status="warning">Vous devez ajouter un locataire à votre bien</Text>) }

        </>
      </Form>

    </MaxWidthContainer>
  );
};

export default QuittanceLoyer;

// const styles = StyleSheet.create({});
