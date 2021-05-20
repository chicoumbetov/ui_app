import React from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import {
  Button, Layout, Text,
} from '@ui-kitten/components';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import TextInput from '../../../components/Form/TextInput';
import { RealEstateType } from '../../../src/API';
import Form from '../../../components/Form/Form';

import { AvailableValidationRules } from '../../../components/Form/validation';
import SelectComp from '../../../components/Form/Select';
import { detention, typeBien } from '../../../mockData/ajoutBienData';

import { updateRealEstateMutation } from '../../../src/API/RealEstate';
import { TabMesBiensParamList } from '../../../types';

type ModifierCharacteristiquesForm = {
  name: string,
  purchaseYear?: number | null,
  address: string,
  additionalAddress?: string | null,
  postalCode: string,
  city: string,
  country: string,
  type?: RealEstateType | null,
  ownName?: boolean | null,
  detentionPart?: number | null,
};

const Informations = () => {
  const modifierCharacteristiquesForm = useForm<ModifierCharacteristiquesForm>();
  const route = useRoute<RouteProp<TabMesBiensParamList, 'detail-bien'>>();
  const navigation = useNavigation();

  const updateRealEstate = updateRealEstateMutation();
  const onPress = async (data: ModifierCharacteristiquesForm) => {
    console.log('characteristiques data: ', data);

    const user = await Auth.currentAuthenticatedUser();
    const {
      address, city, additionalAddress, country, postalCode, type, purchaseYear, ...rest
    } = data;

    await updateRealEstate({
      variables: {
        input: {
          id: route.params.id,
          ...rest,
          iconUri: 'default::mainHouse',
          admins: [
            user.id,
          ],
          address: {
            address,
            additionalAddress,
            city,
            postalCode,
            country,
          },
          _version: user._version,
        },
      },
    });
  };

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
      }}
    >
      <Form<ModifierCharacteristiquesForm> {...modifierCharacteristiquesForm}>
        <>
          <Layout style={styles.container}>
            <View>
              <Text
                category="h2"
                style={{
                  marginTop: 12,
                  marginBottom: 39,
                }}
              >
                Modifier vos informations
              </Text>
            </View>

            <Text category="h2" appearance="hint">Changer localisation </Text>
            <TextInput
              name="address"
              placeholder="Adresse"
              validators={[
                AvailableValidationRules.required,
              ]}
            />
            <TextInput
              name="additionalAddress"
              placeholder="Complément d'adresse"
            />
            <TextInput
              name="postalCode"
              placeholder="Code Postal"
              maxLength={5}
              validators={[
                AvailableValidationRules.required,
              ]}
            />
            <TextInput
              name="city"
              placeholder="Ville"
              validators={[
                AvailableValidationRules.required,
              ]}
            />
            <TextInput
              name="country"
              placeholder="Pays"
              validators={[
                AvailableValidationRules.required,
              ]}
            />

            <Text category="h2" appearance="hint">Changer date D'acquisition</Text>
            <TextInput
              name="purchaseYear"
              placeholder="yyyy"
              icon="calendar-outline"
              maxLength={4}
            />

            <Text category="h2" appearance="hint">Changer type de bien</Text>
            <SelectComp
              name="type"
              data={typeBien}
              placeholder="Type De Bien"
              size="large"
              appearance="default"
              status="primary"
            />
            <Text category="h2" appearance="hint">Changer mode de détention</Text>
            <SelectComp
              name="ownName"
              data={detention}
              placeholder="Détention"
              size="large"
              appearance="default"
              status="primary"
            />

            <TextInput
              name="detentionPart"
              placeholder="Changer nombre de parts"
              min={0}
              max={100}
            />

            <View style={styles.buttonRight}>
              <Button onPress={onPress} style={{ width: 150 }}>
                Valider
              </Button>
            </View>

          </Layout>
        </>
      </Form>
    </MaxWidthContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 21,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
  inputStyle: {
    borderRadius: 7,
    backgroundColor: '#fff',
    fontWeight: 'normal',
    borderColor: 'transparent',
    marginBottom: 32,
    shadowColor: '#dedede',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  buttonRight: { alignItems: 'flex-end' },
  title: {
    marginTop: 12,
    marginBottom: 39,
  },
});

export default Informations;
