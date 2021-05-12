import React, { useEffect, useState } from 'react';
import { SignIn as AmplifySignIn } from 'aws-amplify-react-native';
import {
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Layout, Text } from '@ui-kitten/components';
import { useForm } from 'react-hook-form';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Form from '../Form/Form';
import TextInputComp from '../Form/TextInput';
import Radio from '../Form/Radio';
import { AvailableValidationRules } from '../Form/validation';
import { ErrorMessage } from './components/ErrorMessage';

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
    <KeyboardAwareScrollView enableOnAndroid>
      <Layout style={{
        flex: 1,
        alignItems: 'center',
      }}
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
              <Image source={require('../../assets/Icones_omedom/Logo_Omedom.png')} style={{ height: 230, width: 230 }} resizeMode="contain" />
            </Layout>

            <Layout style={{ backgroundColor: 'transparent', marginLeft: 0 }}>
              <Text style={{
                fontSize: 25, color: 'black', letterSpacing: 0.2, lineHeight: 32, fontFamily: 'HouschkaRoundedDemiBold',
              }}
              >
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
              validators={[
                AvailableValidationRules.required,
                AvailableValidationRules.password,
              ]}
            />

            <Radio name="stayConnected" label="Souhaitez-vous rester connecté ?" labelPosition="before" />

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
                onPress={signUp}
              >
                S'inscrire
              </Button>

              <Button
                size="large"
                style={{ width: 140 }}
                appearance="outline"
                onPress={loginForm.handleSubmit((data) => {
                  AsyncStorage.setItem('stayConnected', data.stayConnected ? 'true' : 'false');
                  login(data);
                })}
              >
                Se connecter
              </Button>

            </Layout>

          </Layout>
        </Form>

        <Button appearance="ghost" onPress={forgotPassword}>Mot de passe oublié ?</Button>
      </Layout>
    </KeyboardAwareScrollView>
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
