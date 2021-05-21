import React, { useState } from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import {
  Button, Text,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import TextInput from '../../components/Form/TextInput';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { AvailableValidationRules } from '../../components/Form/validation';
import Radio from '../../components/Form/Radio';
import PhoneNumberInput from '../../components/Form/PhoneNumberInput';
import Form from '../../components/Form/Form';
import { useUser } from '../../src/API/UserContext';

type ModifierInfo1Form = {
  firstname:string;
  lastname: string;
  email: string;
  password: string;
  oldPassword: string;
  phoneNumber: string;
  optIn: boolean;
};

const ModifierInfo1 = () => {
  const navigation = useNavigation();
  const { updateUser, user, cognitoUser } = useUser();

  const onPress = async (data: ModifierInfo1Form) => {
    console.log(data);
    if (user && updateUser && cognitoUser) {
      await updateUser(data);

      navigation.navigate('modifier-info-2');
    }
  };

  const modifierInfo1Form = useForm<ModifierInfo1Form>();

  return (

    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        style: {
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
      <View>
        <Text category="h1" style={styles.title}>Modifier vos informations</Text>
      </View>
      <Form
        {...modifierInfo1Form}
        defaultValues={user}
      >
        <>
          <TextInput
            name="firstname"
            placeholder="Votre prénom"
            validators={[
              AvailableValidationRules.required,
            ]}
          />

          <TextInput
            name="lastname"
            placeholder="Votre nom"
            containerStyle={{ marginTop: 20 }}
            validators={[
              AvailableValidationRules.required,
            ]}
          />

          <TextInput
            name="email"
            placeholder="Votre  e-mail"
            containerStyle={{ marginTop: 20 }}
            validators={[
              AvailableValidationRules.required,
            ]}
          />

          <TextInput
            name="oldPassword"
            placeholder="Votre mot de passe actuel"
            secureTextEntry
            withEyeToggle
            containerStyle={{ marginTop: 20 }}
            validators={[
              {
                rule: AvailableValidationRules.requiredIfNotEmpty,
                errorMessage: 'Vous devez renseigner votre mot de passe actuel pour changer de mot de passe',
                ifNotEmpty: ['password'],
              },
              AvailableValidationRules.password,
            ]}
          />

          <TextInput
            name="password"
            placeholder="Votre nouveau mot de passe"
            secureTextEntry
            withEyeToggle
            containerStyle={{ marginTop: 20 }}
            validators={[
              AvailableValidationRules.password,
            ]}
          />

          <PhoneNumberInput
            name="phoneNumber"
            placeholder="Votre numéro de téléphone"
            containerStyle={{ marginTop: 20 }}
            validators={[
              AvailableValidationRules.numeroTel,
              AvailableValidationRules.required,
            ]}
          />
          <Radio
            name="optIn"
            label="Souhaitez-vous rester informé de nos actualités ? "
            labelPosition="before"
            style={{ marginTop: 20 }}
          />

          <View style={styles.buttonRight}>
            <Button onPress={modifierInfo1Form.handleSubmit((data) => onPress(data), (data) => console.log(data))} disabled={user === null} size="large" style={{ width: 139 }}>
              Valider
            </Button>
          </View>
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

export default ModifierInfo1;
