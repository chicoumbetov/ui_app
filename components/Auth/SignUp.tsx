import React, { useEffect, useState } from 'react';
import { SignUp as AmplifySignUp } from 'aws-amplify-react-native';
import { Platform } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm } from 'react-hook-form';
import { AuthStyles } from './styles';
import { ErrorMessage } from './components/ErrorMessage';
import TextInputComp from '../Form/TextInput';
import { AvailableValidationRules } from '../Form/validation';
import Radio from '../Form/Radio';
import Form from '../Form/Form';
import PhoneNumberInput from '../Form/PhoneNumberInput';

type SignUpForm = {
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  password: string;
  acceptCGV: boolean;
  optIn: boolean;
};

const MySignUp = ({
  error, signUp, goBack, goConfirmCode,
}: SignUpProps) => {
  const [errorMessage, setErrorMessage] = useState<string>();

  const loginForm = useForm<SignUpForm>();

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  const submit = () => {
    signUp({
      username, password, email, phone_number,
    });
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <Form<LoginForm> {...loginForm}>
          <Layout style={{
            marginHorizontal: 25,
            backgroundColor: 'transparent',

          }}
          >
            <Text category="h1" style={AuthStyles.header}>Créer votre compte</Text>

            <ErrorMessage message={errorMessage} />
            <TextInputComp
              name="firstname"
              placeholder="Votre prénom"
              validators={[
                AvailableValidationRules.required,
              ]}
            />
            <TextInputComp
              name="lastname"
              placeholder="Votre nom"
              validators={[
                AvailableValidationRules.required,
              ]}
            />
            <TextInputComp
              name="email"
              placeholder="Votre e-mail"
              validators={[
                AvailableValidationRules.required,
                AvailableValidationRules.email,
              ]}
            />
            <TextInputComp
              name="password"
              placeholder="Votre mot de passe"
              secureTextEntry
              validators={[
                AvailableValidationRules.required,
                AvailableValidationRules.password,
              ]}
            />
            <PhoneNumberInput
              name="phone_number"
              placeholder="Votre numéro de téléphone"
              validators={[
                AvailableValidationRules.numeroTel,
                AvailableValidationRules.required,
              ]}
            />

            <Radio name="optIn" label="Souhaitez-vous rester informé de nos actualités ? " labelPosition="before" />
            <Radio
              name="acceptCGV"
              label="J’accepte les conditions générales d’utilisation de Omedom"
              labelPosition="before"
              validators={[
                AvailableValidationRules.required,
              ]}
            />

            <Layout style={{
              flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'transparent',
            }}
            >
              <Button
                size="large"
                style={{
                  width: 140,
                  shadowColor: 'rgba(190, 190, 190, 0.5)',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowRadius: 2,
                  shadowOpacity: 1,
                  elevation: 2,
                }}
                onPress={submit}
              >
                Valider
              </Button>
            </Layout>

          </Layout>
        </Form>

        <Layout style={{ flexDirection: 'row' }}>
          <Button appearance="ghost" style={AuthStyles.button} onPress={goBack}>Back to Sign In</Button>
          <Button appearance="ghost" style={AuthStyles.button} onPress={goConfirmCode}>Confirmez avec un code</Button>
        </Layout>
      </Layout>
    </KeyboardAwareScrollView>
  );
};

interface SignUpProps {
  error?: string
  signUp: (userInfo: {
    username: string,
    email: string,
    phone_number: string,
    password: string
  }) => void
  goBack: () => void
  goConfirmCode: () => void
}

export default class SignUp extends AmplifySignUp {
  showComponent() {
    return (
      <MySignUp
        error={this.state.error}
        // @ts-expect-error : AWS does not expose Types
        signUp={(userInfo) => this.setState({ ...userInfo, error: null }, this.signUp)}
        // @ts-expect-error : AWS does not expose Types
        goBack={() => this.changeState('signIn')}
        // @ts-expect-error : AWS does not expose Types
        goConfirmCode={() => this.changeState('confirmSignUp')}
      />
    );
  }
}
