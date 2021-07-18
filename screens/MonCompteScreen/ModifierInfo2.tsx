import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button, CalendarViewModes, Modal, Text,
} from '@ui-kitten/components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import { useForm } from 'react-hook-form';
import API from '@aws-amplify/api';
import _ from 'lodash';
import { useDimensions } from '@react-native-community/hooks';
import TextInput from '../../components/Form/TextInput';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { TabMonCompteParamList } from '../../types';
import Form from '../../components/Form/Form';
import DatePicker from '../../components/Form/DatePicker';
import { AvailableValidationRules } from '../../components/Form/validation';
import { useUser } from '../../src/API/UserContext';

import WebView from '../../components/WebView';

type ModifierInfo2Form = {
  privateProfile: {
    address?: {
      address: string;
      additionalAddress?: string | null;
      postalCode: string;
      city: string;
      country: string;
    } | null;
    birthDate?: string | null;
  }
};

const ModifierInfo2 = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<TabMonCompteParamList, 'modifier-info-2'>>();
  const { createUser, updateUser, user } = useUser();
  const [modalUrl, setModalUrl] = useState<string | false>(false);
  const { window } = useDimensions();

  const modifierInfo2Form = useForm<ModifierInfo2Form>();
  const onPress = async (data: ModifierInfo2Form) => {
    if (route.params?.signUp) {
      if (createUser) {
        const response = await API.post('omedomrest', '/budgetinsight/create-user', {});

        await createUser({
          privateProfile: {
            ...data.privateProfile,
            notificationParams: {
              soldeNegatif: {
                push: true,
                email: true,
              },
              creditBancaire: {
                push: true,
                email: true,
              },
              debitBancaire: {
                push: true,
                email: true,
              },
              loyer: {
                push: true,
                email: true,
              },
              retardLoyer: {
                push: true,
                email: true,
              },
              autre: {
                push: true,
                email: true,
              },
              echeanceFacture: {
                push: true,
                email: true,
              },
              mauvaiseRenta: {
                push: true,
                email: true,
              },
            },
          },
          biUser: response.id_user,
          biToken: response.auth_token,
        });

        navigation.navigate('modifier-info-3', {
          signUp: true,
        });
      }
    } else if (updateUser) {
      if (!user?.biUser) {
        const response = await API.post('omedomrest', '/budgetinsight/create-user', {});
        _.merge(data, {
          biUser: response.id_user,
          biToken: response.auth_token,
        });
      }

      await updateUser(data);

      navigation.navigate('modifier-info-3');
    }
  };

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
      }}
      innerViewProps={{
        style: {
          paddingHorizontal: 24,
          paddingVertical: 34,
        },
      }}
    >
      <Form<ModifierInfo2Form>
        {...modifierInfo2Form}
        defaultValues={user}
      >
        <>
          <View>
            <Text category="h1" style={styles.title}>{route.params?.signUp ? 'Finalisez votre inscription' : 'Modifier vos informations'}</Text>
          </View>

          <DatePicker
            name="privateProfile.birthDate"
            placeholder="dd/mm/yyyy"
            label="Votre date de naissance"
            labelBefore
            icon="calendar-outline"
            startView={CalendarViewModes.YEAR}
            style={{ width: '100%', maxWidth: '100%' }}
            size="medium"
          />

          <TextInput
            name="privateProfile.address.address"
            placeholder="Adresse"
            validators={[
              AvailableValidationRules.required,
            ]}
          />

          <TextInput
            name="privateProfile.address.additionalAddress"
            placeholder="Complément d'adresse"

          />

          <TextInput
            name="privateProfile.address.postalCode"
            placeholder="Code postal"
            maxLength={5}
            validators={[
              AvailableValidationRules.required,
            ]}
          />

          <TextInput
            name="privateProfile.address.city"
            placeholder="Ville"
            validators={[
              AvailableValidationRules.required,
            ]}
          />

          <TextInput
            name="privateProfile.address.country"
            placeholder="Pays"
            validators={[
              AvailableValidationRules.required,
            ]}
          />

          <Text style={{ flex: 1, marginVertical: 10 }}>
            <Text>
              Pour retrouver toutes les informations relatives au traitement de vos données par
              OMEDOM, vous pouvez consulter notre Politique de protection des données
            </Text>
            <Text> </Text>
            <Text onPress={() => setModalUrl('https://omedom.com/politique-de-confidentialite?simple=1')} style={{ textDecorationLine: 'underline' }}>ici</Text>
            <Text>.</Text>
          </Text>
          <Modal
            visible={modalUrl !== false}
            backdropStyle={{ backgroundColor: 'rgba(0,0,0, 0.7)' }}
            onBackdropPress={() => setModalUrl(false)}
          >
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                height: window.height * 0.9,
                width: window.width * 0.9,
                flex: 1,
                justifyContent: 'space-between',
                overflow: 'hidden',
                padding: 7,
              }}
            >
              <WebView src={modalUrl || ''} />
              <Button onPress={() => setModalUrl(false)}>Fermer</Button>
            </View>
          </Modal>

          <View style={styles.buttonRight}>
            <Button onPress={modifierInfo2Form.handleSubmit((data) => onPress(data))} size="large" style={{ width: 139 }}>
              Valider
            </Button>
          </View>
          <Text category="c1" appearance="hint">
            * champs obligatoires
          </Text>
        </>
      </Form>

    </MaxWidthContainer>

  );
};

const styles = StyleSheet.create({
  buttonRight: { alignItems: 'flex-end', marginTop: 34 },
  title: {
    marginTop: 12,
    marginBottom: 39,
  },
});

export default ModifierInfo2;
