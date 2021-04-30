import React, { useEffect, useState } from 'react';
import { SignIn as AmplifySignIn } from 'aws-amplify-react-native';
import {
  Image, KeyboardAvoidingView, Platform, View,
} from 'react-native';
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
};

const MySigIn = ({
  forgotPassword, signIn, signUp, error,
}: SignInProps) => {
  const [errorMessage, setErrorMessage] = useState<string>();

  const loginForm = useForm<LoginForm>();

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  const login = (data: LoginForm) => {
    signIn(data.email, data.password);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <Form<LoginForm> {...loginForm}>
          <>
            {/* eslint-disable-next-line global-require */}
            <Layout style={{ backgroundColor: 'transparent', alignItems: 'center' }}>
              {/* eslint-disable-next-line global-require */}
              <Image source={require('../../assets/Icones_omedom/logo_menu_principal.png')} style={{ height: 200 }} resizeMode="contain" />
            </Layout>

            <Layout style={{ backgroundColor: 'transparent', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, color: 'black' }}>Très heureux de vous revoir, Benjamin</Text>
            </Layout>

            <Text category="h1" style={AuthStyles.header}>Se connecter</Text>
            <Text category="h1" style={AuthStyles.header}>{errorMessage}</Text>
            <TextInputComp
              name="email"
              label="Votre e-mail"
              validators={[
                AvailableValidationRules.required,
                AvailableValidationRules.email,
              ]}
            />
            <TextInputComp
              name="password"
              label="Votre mot de passe"
              validators={[
                AvailableValidationRules.required,
                AvailableValidationRules.password,
              ]}
            />

            <Switch name="stayConnected" label="Souhaitez-vous rester connecté ?" />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
              <Button
                style={{ width: 130 }}
                onPress={loginForm.handleSubmit((data) => login(data))}
              >
                Se connecter
              </Button>
              <Button
                style={{ width: 130 }}
                onPress={signUp}
              >
                S'inscrire
              </Button>
            </View>

          </>
        </Form>

        <Button appearance="ghost" onPress={forgotPassword}>Forgot password?</Button>
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
