import React, { useEffect, useRef, useState } from 'react';
import { SignIn as AmplifySignIn } from 'aws-amplify-react-native';
import {
  Image, KeyboardAvoidingView, Platform, View,
} from 'react-native';
import {
  Input, Layout, Button, Text, Radio,
} from '@ui-kitten/components';
import { useForm } from 'react-hook-form';
import TextInput from '../Form/TextInput';

import { AvailableValidationRules } from '../Form/validation';
import Form from '../Form/Form';
import { UsernameType } from '../../types';
import { UsernameInput } from './components/UsernameInput';
import { AuthStyles } from './styles';

interface SignInProps {
  signUp: () => void
  forgotPassword: () => void
  signIn: (email: string, password: string) => void
  usernameType: UsernameType
  error?: string
}

type LoginForm = {
  email: string;
  motDePasse: string;
};

type SignUpForm = {
  prenom: string;
  nom: string;
  email: string;
  motDePasse: string;
  numeroTel: string;
};

const MySigIn = ({
  forgotPassword, signIn, signUp, usernameType, error,
}: SignInProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const passwordRef = useRef<Input>(null);

  const [stayConnected, setStayConnected] = React.useState(false);
  const [stayInformed, setStayInformed] = React.useState(false);
  const [acceptConditions, setAcceptConditions] = React.useState(false);

  // Sign In:
  const loginForm = useForm<LoginForm>();
  // Sign Up:
  const signUpForm = useForm<SignUpForm>();
  // Confirm by code that come to email during sign up
  const waitingCodeForm = useForm<FormData>();
  // When password forgotten:

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  const login = () => {
    signIn(email, password);
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

            <TextInput
              type={usernameType}
              defaultValue={email}
              placeholder="Votre e-mail"
              importantForAutofill="yes"
              autoCapitalize="none"
              returnKeyType="next"
              onChangeText={(nextValue) => {
                setErrorMessage(errorMessage);
                setEmail(nextValue);
              }}
              onSubmitEditing={() => passwordRef.current?.focus()}
              style={AuthStyles.input}
              // validators={[AvailableValidationRules.email]}
            />

            <TextInput
              ref={passwordRef}
              name="motDePasse"
              secureTextEntry
              placeholder="Votre mot de passe"
              importantForAutofill="yes"
              autoCapitalize="none"
              returnKeyType="done"
              onChangeText={(nextValue) => {
                setErrorMessage(undefined);
                setPassword(nextValue);
              }}
              onSubmitEditing={login}
              style={AuthStyles.input}
            />

            <Layout style={{ flexDirection: 'row', padding: 10 }}>
              <Text>Souhaitez-vous rester connecté ?</Text>
              <Radio
                checked={stayConnected}
                onChange={(nextChecked) => setStayConnected(nextChecked)}
              >
                {`Checked: ${stayConnected}`}
              </Radio>
            </Layout>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button
                style={{ width: 130 }}
                // onPress={loginForm.handleSubmit((data) => signIn(data.email, data.motDePasse))}
                onPress={login}
              >
                Se connecter
              </Button>
              <Button
                style={{ width: 130 }}
                // onPress={signUpForm.handleSubmit((data) => signUp())}
                onPress={signUp}
              >
                S inscrire
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
    const { usernameAttributes = 'username' } = this.props;

    return (
      <MySigIn
        signUp={() => this.changeState('signUp')}
        forgotPassword={() => this.changeState('forgotPassword')}
        signIn={(email: string, password: string) => {
          this.setState({
            password, email, phone_number: email, error: null,
          }, this.signIn);
        }}
        usernameType={usernameAttributes}
        error={this.state.error}
      />
    );
  }
}
