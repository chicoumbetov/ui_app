import React, { useEffect, useState } from 'react';
import { SignIn as AmplifySignIn } from 'aws-amplify-react-native';
import {
  Image, KeyboardAvoidingView, Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Layout, Text } from '@ui-kitten/components';
import { useForm } from 'react-hook-form';

import Form from '../Form/Form';
import { AuthStyles } from './styles';
import TextInputComp from '../Form/TextInput';
import Switch from '../Form/Switch';
import { AvailableValidationRules } from '../Form/validation';

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
    <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Layout style={{
        flex: 1, alignItems: 'center',
      }}
      >

        <Form<LoginForm> {...loginForm}>
          <Layout style={{
            marginHorizontal: 70, backgroundColor: 'transparent', alignItems: 'stretch', maxWidth: 350,
          }}
          >
            {/* eslint-disable-next-line global-require */}
            <Layout style={{ backgroundColor: 'transparent', marginTop: 34 }}>
              {/* eslint-disable-next-line global-require */}
              <Image source={require('../../assets/Icones_omedom/Logo_Omedom.png')} style={{ height: 230 }} resizeMode="contain" />
            </Layout>

            <Layout style={{ backgroundColor: 'transparent', marginLeft: 0 }}>
              <Text style={{
                fontSize: 25, color: 'black', letterSpacing: 0.2, lineHeight: 32, fontFamily: 'HouschkaRoundedDemiBold',
              }}
              >
                {lastUser !== '' ? `Très heureux de vous revoir, ${lastUser}` : 'Bienvenue'}
              </Text>
            </Layout>

            {/**
            <Text category="h1" style={AuthStyles.header}>Se connecter</Text>
            */}
            <Text category="h1" style={AuthStyles.header}>{errorMessage}</Text>
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

            <Switch name="stayConnected" label="Souhaitez-vous rester connecté ?" labelPosition="after" />

            <Layout style={{
              flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'transparent',
            }}
            >
              <Button
                size="large"
                style={{ width: 140 }}
                onPress={loginForm.handleSubmit((data) => {
                  AsyncStorage.setItem('stayConnected', data.stayConnected ? 'true' : 'false');
                  login(data);
                })}
              >
                Se connecter
              </Button>

              <Button
                size="large"
                style={{ width: 140 }}
                appearance="outline"
                onPress={signUp}
              >
                S'inscrire
              </Button>
            </Layout>

          </Layout>
        </Form>

        <Button appearance="ghost" onPress={forgotPassword}>Mot de passe oublié ?</Button>
      </Layout>
    </KeyboardAvoidingView>
  );
};

export default class SignIn extends AmplifySignIn {
  showComponent(theme: any) {
    return (
      <MySigIn
        signUp={() => this.changeState('signUp')}
        forgotPassword={() => this.changeState('forgotPassword')}
        signIn={(email: string, password: string) => {
          this.setState({
            password, email, phone_number: email, error: null,
          }, this.signIn);
        }}
        error={this.state.error}
      />
    );
  }
}
