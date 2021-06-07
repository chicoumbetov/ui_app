import React, { useState } from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import {
  Button, Text,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import Auth from '@aws-amplify/auth';
import TextInput from '../../components/Form/TextInput';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { AvailableValidationRules } from '../../components/Form/validation';
import Radio from '../../components/Form/Radio';
import PhoneNumberInput from '../../components/Form/PhoneNumberInput';
import Form from '../../components/Form/Form';
import { useUser } from '../../src/API/UserContext';
import { removeNull } from '../../utils/ObjectHelper';

type ModifierInfo1Form = {
  firstname:string;
  lastname: string;
  privateProfile: {
    email?: string | null;
    phoneNumber?: string | null;
    optIn?: boolean | null;
  }
  password: string;
  oldPassword: string;
};

const ModifierInfo1 = () => {
  const navigation = useNavigation();
  const { updateUser, user, cognitoUser } = useUser();
  const [passwordError, setPasswordError] = useState(false);

  const onPress = async (data: ModifierInfo1Form) => {
    console.log(data);
    if (user && updateUser && cognitoUser) {
      const { password, oldPassword, ...otherProps } = data;
      let nextScreen = 'modifier-info-2';
      setPasswordError(false);

      if (oldPassword && password) {
        try {
          const passwordChanged = await Auth.changePassword(cognitoUser, oldPassword, password);
          if (passwordChanged !== 'SUCCESS') {
            setPasswordError(true);
            return;
          }
        } catch (e) {
          setPasswordError(true);
          return;
        }
      }

      const newCognitoAttr = removeNull({
        email: otherProps.privateProfile.email,
        family_name: otherProps.lastname,
        given_name: otherProps.firstname,
        phone_number: otherProps.privateProfile.phoneNumber,
        'custom:optIn': otherProps.privateProfile.optIn ? 'true' : 'flse',
        // false => flse sur 4 caractères seulement car le custom attribute a
        // été créer sur max 4 et ne peut plus être modifié
      });
      if (Object.keys(newCognitoAttr).length > 0) {
        await Auth.updateUserAttributes(cognitoUser, newCognitoAttr);
        const currentAttr = await Auth.currentUserInfo();
        if (!currentAttr.attributes.email_verified) {
          nextScreen = 'verification';
        }
      }

      await updateUser(otherProps);

      navigation.navigate(nextScreen);
    }
  };

  const modifierInfo1Form = useForm<ModifierInfo1Form>();

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
      <View>
        <Text category="h1" style={styles.title}>Modifier vos informations</Text>
      </View>
      <Form<ModifierInfo1Form>
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
            validators={[
              AvailableValidationRules.required,
            ]}
          />

          <TextInput
            name="privateProfile.email"
            placeholder="Votre  e-mail"
            validators={[
              AvailableValidationRules.required,
            ]}
          />

          {passwordError && <Text status="danger">Une erreur à eu lieu lors du changement de mot de passe merci de vérifier votre mot de passe.</Text> }

          <TextInput
            name="oldPassword"
            placeholder="Votre mot de passe actuel"
            secureTextEntry
            withEyeToggle
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
            validators={[
              AvailableValidationRules.password,
            ]}
          />

          <PhoneNumberInput
            name="privateProfile.phoneNumber"
            placeholder="Votre numéro de téléphone"
            validators={[
              AvailableValidationRules.numeroTel,
              AvailableValidationRules.required,
            ]}
          />
          <Radio
            name="privateProfile.optIn"
            label="Souhaitez-vous rester informé de nos actualités ? "
            labelPosition="before"
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
