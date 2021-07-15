import React, { useEffect, useState } from 'react';
import { SignIn as AmplifySignIn } from 'aws-amplify-react-native';
import {
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Layout, Text } from '@ui-kitten/components';
import { useForm } from 'react-hook-form';
import Form from '../Form/Form';
import TextInputComp from '../Form/TextInput';
import Radio from '../Form/Radio';
import { AvailableValidationRules } from '../Form/validation';
import { ErrorMessage } from './components/ErrorMessage';
import MaxWidthContainer from '../MaxWidthContainer';
import Button from '../Button';

interface SignInProps {
  signUp: () => void
  forgotPassword: () => void
  signIn: (email: string, password: string) => void
  error?: string
}

type LoginForm = {
  email: string;
  password: string;
  stayConnected: boolean;
};

const MySigIn = ({
  forgotPassword, signIn, signUp, error,
}: SignInProps) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [lastUser, setLastUser] = useState<string>('');

  const loginForm = useForm<LoginForm>();

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  useEffect(() => {
    AsyncStorage.getItem('lastFirstname', (err?: Error, result?: string) => {
      if (result) {
        setLastUser(result);
      }
    });
  }, []);

  const login = (data: LoginForm) => {
    signIn(data.email, data.password);
  };

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
      }}
      innerViewProps={{ style: { flex: 1 } }}
      maxWidth={450}
    >

      <Form<LoginForm> {...loginForm}>
        <Layout style={{
          marginHorizontal: 25,
          backgroundColor: 'transparent',
        }}
        >
          {/* eslint-disable-next-line global-require */}
          <Layout style={{ backgroundColor: 'transparent', marginTop: 34, alignItems: 'center' }}>
            {/* eslint-disable-next-line global-require */}
            <Image source={require('../../assets/Icones_omedom/Logo_Omedom.png')} style={{ height: 150, width: 150 }} resizeMode="contain" />
          </Layout>

          <Layout style={{ backgroundColor: 'transparent', alignItems: 'center' }}>
            <Text category="h1" style={{ marginBottom: 30 }}>
              {lastUser !== '' ? `Très heureux de vous revoir, ${lastUser}` : 'Bienvenue'}
            </Text>
          </Layout>

          <ErrorMessage message={errorMessage} />
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
            withEyeToggle
            validators={[
              AvailableValidationRules.required,
              AvailableValidationRules.password,
            ]}
            icon="eye-off-outline"
          />

          <Radio
            name="stayConnected"
            label="Souhaitez-vous rester connecté ?"
            labelPosition="before"
            status="info"
          />

          <Layout style={{
            flexDirection: 'row', marginTop: 15, justifyContent: 'space-between', backgroundColor: 'transparent',
          }}
          >
            <Button
              size="medium"
              style={{ width: 140 }}
              appearance="outline"
              onPress={loginForm.handleSubmit((data) => {
                AsyncStorage.setItem('stayConnected', data.stayConnected ? 'true' : 'false');
                login(data);
              })}
            >
              Se connecter
            </Button>

            <Button
              size="medium"
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
              onPress={signUp}
            >
              S'inscrire
            </Button>

          </Layout>

        </Layout>
      </Form>

      <Button appearance="ghost" onPress={forgotPassword}>Mot de passe oublié ?</Button>
    </MaxWidthContainer>
  );
};

export default class SignIn extends AmplifySignIn {
  showComponent() {
    return (
      <MySigIn
        // @ts-expect-error : AWS does not expose Types
        signUp={() => this.changeState('signUp')}
        // @ts-expect-error : AWS does not expose Types
        forgotPassword={() => this.changeState('forgotPassword')}
        signIn={(email: string, password: string) => {
          this.setState({
            password, email, phone_number: email, error: null,
          // @ts-expect-error : AWS does not expose Types
          }, this.signIn);
        }}
        error={this.state.error}
      />
    );
  }
}
