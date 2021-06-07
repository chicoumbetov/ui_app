import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  Button, Text,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import Auth from '@aws-amplify/auth';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import Form from '../../components/Form/Form';
import { AvailableValidationRules } from '../../components/Form/validation';
import DigitsInput from '../../components/Form/DigitsInput';

type VerificationForm = {
  code: string;
};

const Verification = () => {
  const navigation = useNavigation();
  const [confirmError, setConfirmError] = useState(false);

  const verificationForm = useForm<VerificationForm>();
  const onPress = async (data: VerificationForm) => {
    try {
      const check = await Auth.verifyCurrentUserAttributeSubmit('email', data.code);
      if (check !== 'SUCCESS') {
        setConfirmError(true);
        return;
      }
      navigation.navigate('modifier-info-2');
    } catch (e) {
      setConfirmError(true);
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
      <Form<VerificationForm>
        {...verificationForm}
      >
        <>
          <View>
            <Text category="h1" style={styles.title}>Un code de confirmation vous a été envoyé par mail</Text>
          </View>
          {confirmError && <Text status="danger">Une erreur à eu lieu lors de la vérification de votre e-mail merci de réessayer.</Text> }

          <DigitsInput
            name="code"
            numberOfDigits={6}
            label="Veuillez saisir ci-dessous le code à 6 chiffres"
            validators={[
              AvailableValidationRules.required,
            ]}
            style={{ maxWidth: 200 }}
          />

          <View style={styles.buttonRight}>
            <TouchableOpacity
              onPress={() => {
                Auth.verifyCurrentUserAttribute('email');
              }}
            >
              <Text category="h5" status="basic">Renvoyer un code</Text>
            </TouchableOpacity>
            <Button onPress={verificationForm.handleSubmit((data) => onPress(data))} size="large" style={{ width: 139 }}>
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
  buttonRight: {
    alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 34, flexDirection: 'row',
  },
  title: {
    marginTop: 12,
    marginBottom: 39,
  },
});

export default Verification;
