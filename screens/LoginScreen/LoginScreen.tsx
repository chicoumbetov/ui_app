import * as React from 'react';
import { useEffect, useState } from 'react';

import {
  StyleSheet, ScrollView, Image,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Layout, Button, Text } from '@ui-kitten/components';
// import { colors } from '../assets/styles';
import { useForm } from 'react-hook-form';
import { Auth } from '@aws-amplify/auth';
import { useUser } from '../../utils/user';
import Form from '../../components/Form/Form';
import TextInput from '../../components/Form/TextInput';
import HeaderLeftOpenDrawerNavigation from '../../navigation/HeaderLeftOpenDrawerNavigation';
import HeaderRightOpenDrawerNavigation from '../../navigation/HeaderRightOpenDrawerNavigation';
// import TextInput from '../components/Form/TextInput';

type FormData = {
  email: string;
  motDePasse: string;
  code: string;
};

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

const initialFormState = {
  nom: '', prenom: '', motDePasse: '', email: '', authCode: '', formType: 'signUp', numeroTel: '',
};

enum AvailableFormTypes {
  signUp,
  signIn,
  confirmSignUp,
  finaliserSignUp,
}

function LoginScreen(): JSX.Element {
  const [formState, updateFormState] = useState(initialFormState);
  function onChange(e) {
    e.persist();
    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value }));
  }

  const [formType, setFormType] = useState<AvailableFormTypes>(AvailableFormTypes.signIn);
  async function signUp() {
    try {
      const {
        email, motDePasse, nom, prenom, numeroTel,
      } = formState;
      await Auth.signUp({ email, motDePasse, attributes: { nom, prenom, numeroTel } }); updateFormState(() => ({ ...formState, formType: 'confirmSignUp' }));
    } catch (error) {
      console.log('Error signing up: ', error);
    }
  }
  async function confirmSignUp() {
    try {
      const { email, authCode } = formState;
      await Auth.confirmSignUp(email, authCode);
      updateFormState(() => ({ ...formState, formType: 'confirmSignUp' }));
    } catch (e) {
      console.log('Error confirming sign up: ', error);
    }
  }
  async function signIn() {
    try {
      const { email, motDePasse } = formState;
      await Auth.signIn(email, motDePasse);
      updateFormState();
    } catch (error) {
      console.log('Error signing in', error);
    }
  }

  // Sign In:
  const loginForm = useForm<LoginForm>();
  // Sign Up:
  const signUpForm = useForm<SignUpForm>();
  // Confirm by code that come to email during sign up
  const waitingCodeForm = useForm<FormData>();
  // When password forgotten:
  const passwordForgottenForm = useForm<FormData>();
  const changePasswordForm = useForm<FormData>();

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
          {/* Bascule entre les form de connexion/ inscription */}

          {
            formType === AvailableFormTypes.signIn && (
            <Layout>
              {/* eslint-disable-next-line global-require */}
              <Layout style={{ alignItems: 'center' }}>
                <Image source={require('../../assets/Icones_omedom/logo_menu_principal.png')} style={{ height: 200 }} resizeMode="contain" />
              </Layout>

              <Form<LoginForm> {...loginForm}>
                <>
                  <Layout>
                    <Text style={{ fontSize: 25, color: 'black' }}>Très heureux de vous revoir, Benjamin</Text>
                  </Layout>

                  <TextInput name="email" placeholder="Votre e-mail" />

                  <TextInput name="motDePasse" placeholder="Votre mot de passe" />

                  <Layout style={{ padding: 5, marginBottom: 20 }}>
                    <Text>Souhaitez-vous rester connecté ?</Text>
                  </Layout>

                  <Layout style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Layout style={{ marginBottom: 10 }}>
                      <Button
                        style={{ width: 130 }}
                        onPress={loginForm.handleSubmit((e) => {
                          console.log(e);
                        })}
                      >
                        Se connecter
                      </Button>
                    </Layout>

                    <Layout>
                      <Button
                        style={{ width: 130 }}
                        onPress={() => setFormType(AvailableFormTypes.signUp)}
                      >
                        S'inscrire
                      </Button>
                    </Layout>
                  </Layout>
                </>
              </Form>
            </Layout>
            )
          }
          {
            formType === AvailableFormTypes.signUp && (
            <Layout>

              <Layout style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <HeaderRightOpenDrawerNavigation />
                <HeaderLeftOpenDrawerNavigation />
              </Layout>

              <Layout style={{ backgroundColor: 'transparent', padding: 5 }}>
                <Text style={{ fontSize: 22, color: 'black' }}>Créer votre compte</Text>
              </Layout>
              <Layout style={{
                backgroundColor: 'transparent', padding: 5, marginVertical: 20,
              }}
              >
                <Text style={{ fontSize: 21, color: '#cecece' }}>*Tous les champs sont obligatoires</Text>
              </Layout>

              <TextInput name="prenom" placeholder="Votre prénom" />
              <TextInput name="nom" placeholder="Votre nom" />
              <TextInput name="email" placeholder="Votre email" />
              <TextInput name="motDePasse" placeholder="Votre mot de passe" />
              <TextInput name="numeroTel" placeholder="Votre numéro de téléphone" />

              <Layout style={{ marginBottom: 20 }}>
                <Text>Souhaitez-vous rester informé de nos actualités ?</Text>
              </Layout>
              <Layout style={{ marginBottom: 20 }}>
                <Text>J accepte les conditions générales d utilisation de Omedom</Text>
              </Layout>

              <Layout style={{
                alignItems: 'flex-end',
              }}
              >
                <Button onPress={() => setFormType(AvailableFormTypes.confirmSignUp)}>
                  Valider
                </Button>
              </Layout>

            </Layout>
            )
          }

          {
            formType === AvailableFormTypes.confirmSignUp && (
            <Layout>
              <Form>
                <>
                  <Layout style={{ padding: 5, marginVertical: 20 }}>
                    <Text style={{ fontSize: 25, color: 'black' }}>Un code de confirmation vous a été envoyé par mail</Text>
                    <Text style={{ fontSize: 25, color: '#cecece' }}>Veuillez saisir ci-dessous le code à 6 chiffres</Text>
                  </Layout>

                  <Layout style={{ padding: 5 }}>
                    <TextInput name="authCode" placeholder="Votre code de confirmation" />
                  </Layout>
                  <Button onPress={() => setFormType(AvailableFormTypes.finaliserSignUp)}>
                    Confirm
                  </Button>
                </>

              </Form>
            </Layout>
            )
          }

          {
            formType === AvailableFormTypes.finaliserSignUp && (
            <Layout>

              <Layout style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <HeaderRightOpenDrawerNavigation />
                <HeaderLeftOpenDrawerNavigation />
              </Layout>

              <Layout style={{ backgroundColor: 'transparent', padding: 5 }}>
                <Text style={{ fontSize: 22, color: 'black' }}>Finaliser la création de votre compte</Text>
              </Layout>
              <Layout style={{
                backgroundColor: 'transparent', padding: 5, marginVertical: 20,
              }}
              >
                <Text style={{ fontSize: 21, color: '#cecece' }}>*Tous les champs sont obligatoires</Text>
              </Layout>

              <TextInput name="dateNaissance" placeholder="dd/mm/yyyy" />
              <TextInput name="adresse" placeholder="Adresse" />
              <TextInput name="complementAdresse" placeholder="Complément d'adresse" />
              <TextInput name="codePostal" placeholder="Code Postal" />
              <TextInput name="ville" placeholder="Ville" />
              <TextInput name="pays" placeholder="Pays" />

              <Layout style={{
                alignItems: 'flex-end',
              }}
              >
                <Button onPress={waitingCodeForm.handleSubmit((e) => {
                  console.log(e);
                })}
                >
                  Valider
                </Button>
              </Layout>

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
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
    // justifyContent: 'space-between',
  },
  containerScrollView: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'space-between',
  },
  form: {
    maxWidth: 340,
    marginLeft: '5%',
    paddingVertical: 30,
    flex: 1,
  },
});
