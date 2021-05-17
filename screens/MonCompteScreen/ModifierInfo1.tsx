import React, { useEffect } from 'react';
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
import useCurrentUser from '../../src/API/User';
import { useAuth } from '../../utils/CustomHooks';

type ModifierInfo1Form = {
  firstname:string;
  lastname: string;
  email: string;
  password: string;
  phoneNumber: string;
  optIn: boolean;
};

const ModifierInfo1 = () => {
  const navigation = useNavigation();
  const { user: authUser } = useAuth();
  const { updateUser, user } = useCurrentUser();

  const onPress = async (data: ModifierInfo1Form) => {
    const { password, ...otherProps } = data;

    if (user && authUser) {
      await updateUser({
        variables: {
          input: {
            id: user.id,
            ...otherProps,
            // eslint-disable-next-line no-underscore-dangle
            _version: user._version,
          },
        },
      });

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
      <Form<ModifierInfo1Form> {...modifierInfo1Form}>
        <>
          <TextInput
            name="firstname"
            placeholder="Votre prénom"
            validators={[
              AvailableValidationRules.required,
            ]}
            defaultValue={user?.firstname || undefined}
          />

          <TextInput
            name="lastname"
            placeholder="Votre nom"
            containerStyle={{ marginTop: 20 }}
            validators={[
              AvailableValidationRules.required,
            ]}
            defaultValue={user?.lastname || undefined}
          />

          <TextInput
            name="email"
            placeholder="Votre  e-mail"
            containerStyle={{ marginTop: 20 }}
            validators={[
              AvailableValidationRules.required,
            ]}
            defaultValue={user?.email || undefined}
          />

          <TextInput
            name="password"
            placeholder="Votre mot de passe"
            secureTextEntry
            withEyeToggle
            containerStyle={{ marginTop: 20 }}
          />

          <PhoneNumberInput
            name="phoneNumber"
            placeholder="Votre numéro de téléphone"
            containerStyle={{ marginTop: 20 }}
            validators={[
              AvailableValidationRules.numeroTel,
              AvailableValidationRules.required,
            ]}
            defaultValue={user?.phoneNumber || undefined}
          />
          <Radio
            name="optIn"
            label="Souhaitez-vous rester informé de nos actualités ? "
            labelPosition="before"
            style={{ marginTop: 20 }}
            value={user?.optIn || false}
          />

          <View style={styles.buttonRight}>
            <Button onPress={modifierInfo1Form.handleSubmit((data) => onPress(data))} disabled={user === null} size="large" style={{ width: 139 }}>
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
