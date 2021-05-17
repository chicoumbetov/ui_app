import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button, CalendarViewModes, Modal, Text,
} from '@ui-kitten/components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';
import TextInput from '../../components/Form/TextInput';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { TabMonCompteParamList } from '../../types';
import Form from '../../components/Form/Form';
import DatePicker from '../../components/Form/DatePicker';
import { AvailableValidationRules } from '../../components/Form/validation';
import Camera from '../../components/Camera';
import { CreateUserMutation, CreateUserMutationVariables } from '../../src/API';
import * as mutations from '../../src/graphql/mutations';
import { useAuth } from '../../utils/CustomHooks';

type ModifierInfo2Form = {
  address:string;
  additionalAddress: string;
  postalCode: string;
  city: string;
  country: string;
  birthDate: string;
};

const ModifierInfo2 = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<TabMonCompteParamList, 'modifier-info-2'>>();

  const modifierInfo2Form = useForm<ModifierInfo2Form>();
  const { user } = useAuth();

  const [createUser] = useMutation<
  CreateUserMutation,
  CreateUserMutationVariables
  >(gql(mutations.createUser));

  const onPress = async (data: ModifierInfo2Form) => {
    const { birthDate, ...adresseProps } = data;

    await createUser({
      variables: {
        input: {
          email: user?.attributes.email,
          lastname: user?.attributes.family_name,
          firstname: user?.attributes.given_name,
          phoneNumber: user?.attributes.phone_number,
          optIn: user?.attributes['custom:optIn'],
          address: adresseProps,
          birthDate,
        },
      },
    });

    navigation.navigate('modifier-info-3');
  };

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        style: {
          flex: 1,
          backgroundColor: '#efefef',
        },
        showsVerticalScrollIndicator: false,
      }}
      innerViewProps={{
        style: {
          paddingHorizontal: 24,
          paddingVertical: 34,
        },
      }}
    >
      <Form<ModifierInfo2Form> {...modifierInfo2Form}>
        <>
          <View>
            <Text category="h1" style={styles.title}>{route.params?.signUp ? 'Finalisez votre inscription' : 'Modifier vos informations'}</Text>
          </View>

          <DatePicker
            name="birthDate"
            placeholder="dd/mm/yyyy"
            label="Votre date de naissance"
            labelBefore
            icon="calendar-outline"
            startView={CalendarViewModes.YEAR}
          />

          <TextInput
            name="address"
            placeholder="Adresse"
            containerStyle={{ marginTop: 20 }}
            validators={[
              AvailableValidationRules.required,
            ]}
          />

          <TextInput
            name="additionalAddress"
            placeholder="Complément d'adresse"
            containerStyle={{ marginTop: 20 }}
          />

          <TextInput
            name="postalCode"
            placeholder="Code postal"
            containerStyle={{ marginTop: 20 }}
            validators={[
              AvailableValidationRules.required,
            ]}
          />

          <TextInput
            name="city"
            placeholder="Ville"
            containerStyle={{ marginTop: 20 }}
            validators={[
              AvailableValidationRules.required,
            ]}
          />

          <TextInput
            name="country"
            placeholder="Pays"
            containerStyle={{ marginTop: 20 }}
            validators={[
              AvailableValidationRules.required,
            ]}
          />

          <View style={styles.buttonRight}>
            <Button onPress={modifierInfo2Form.handleSubmit((data) => onPress(data))} size="large" style={{ width: 139 }}>
              Valider
            </Button>
          </View>
          {/* <Modal
            visible
            style={{
              overflow: 'hidden', alignItems: 'center', margin: 0, height: '100%',
            }}
          >
            <Camera
              onClose={() => {}}
              onChoose={() => {}}
              withPreview
            />
          </Modal> */}
        </>
      </Form>

    </MaxWidthContainer>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 21,
    backgroundColor: 'transparent',
  },
  buttonRight: { alignItems: 'flex-end', marginTop: 34 },
  title: {
    marginTop: 12,
    marginBottom: 39,
  },
});

export default ModifierInfo2;
