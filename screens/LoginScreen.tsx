import * as React from 'react';
import { useEffect, useState } from 'react';

import {
  StyleSheet, ScrollView, useWindowDimensions, TextInput, Image,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Layout, Button, Text } from '@ui-kitten/components';
// import { colors } from '../assets/styles';
import { useForm } from 'react-hook-form';
import {
  Authenticator, SignIn, SignUp, ConfirmSignUp, Greetings,
} from 'aws-amplify-react';
import { useUser } from '../utils/user';
import Login from '../components/Login/Login';

type FormData = {
  email: string;
  motDePasse: string;
  code: string;
};

const initialFormState = {
  nom: '', prenom: '', motDePasse: '', email: '', authCode: '', formType: 'signUp',
};

function LoginScreen(): JSX.Element {
  const [formState, updateFormState] = useState(initialFormState);

  const { formType } = formState;

  const loginForm = useForm<FormData>();
  const passwordForgottenForm = useForm<FormData>();
  const changePasswordForm = useForm<FormData>();
  const waitingCodeForm = useForm<FormData>();

  const { height: windowHeight } = useWindowDimensions();
  const imageAspectRatio = 853 / 1026;

  const {
    login, forgottenPassword, user, changePassword, forgotPasswordSubmit,
  } = useUser();

  const [onChangePassword, setOnChangePassword] = useState(false);
  const [onPasswordForgotten, setOnPasswordForgotten] = useState(false);
  const [onLoggin, setOnLoggin] = useState(true);
  const [onWaitingCode, setOnWaitingCode] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.challengeName === 'NEW_PASSWORD_REQUIRED') {
      setOnChangePassword(true);
      setOnLoggin(false);
    }
    return () => {
      setOnLoggin(true);
      setOnChangePassword(false);
    };
  }, [user]);

  return (
    <Layout style={styles.container}>
      <ScrollView>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.containerScrollView}
          style={styles.form}
          enableOnAndroid
        >
          <Image source={require('../assets/Icones_omedom/logo_menu_principal.png')} style={{ width: 100, height: 100 }} resizeMode="contain" />
          {
            formType === 'signUp' && (
            <Layout>
              <>
                <Text>Créer votre compte</Text>
                <TextInput
                  placeholder="Email d utilisateur"
                >
                  Email d Benjamin
                </TextInput>
                <TextInput
                  placeholder={"Nom d'utilisateur"}
                >
                  nom d Benjamin
                </TextInput>

                <TextInput
                  secureTextEntry
                  placeholder="******"
                />

                <Button
                  onPress={() => {}}
                >
                  Sign Up
                </Button>
              </>
            </Layout>
            )
          }

        </KeyboardAwareScrollView>
      </ScrollView>

    </Layout>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#b5b5b5',
    justifyContent: 'space-between',
  },
  containerScrollView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  form: {
    maxWidth: 400,
    marginLeft: '5%',
    paddingVertical: 30,
    flex: 1,
  },
});
