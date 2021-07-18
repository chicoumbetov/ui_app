import React, { useEffect, useState } from 'react';
import { SignUp as AmplifySignUp } from 'aws-amplify-react-native';
import {
  Card, Layout, Modal, Text,
} from '@ui-kitten/components';
import { useForm } from 'react-hook-form';
// @ts-ignore
import TEST_ID from 'aws-amplify-react-native/dist/AmplifyTestIDs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import { useDimensions } from '@react-native-community/hooks';
import { AuthStyles } from './styles';
import { ErrorMessage } from './components/ErrorMessage';
import TextInputComp from '../Form/TextInput';
import { AvailableValidationRules } from '../Form/validation';
import Radio from '../Form/Radio';
import Form from '../Form/Form';
import PhoneNumberInput from '../Form/PhoneNumberInput';
import MaxWidthContainer from '../MaxWidthContainer';
import WebView from '../WebView';
import Header from './Header';
import Button from '../Button';

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
  const [modalUrl, setModalUrl] = useState<string | false>(false);
  const { window } = useDimensions();
  const [loading, setLoading] = useState(false);

  const signUpForm = useForm<SignUpForm>();

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  const submit = (data: SignUpForm) => {
    signUp({
      password: data.password,
      email: data.email,
      phone_number: data.phone_number,
      family_name: data.lastname.substr(0, 1).toUpperCase() + data.lastname.substr(1),
      given_name: data.firstname.substr(0, 1).toUpperCase() + data.firstname.substr(1),
      'custom:optIn': data.optIn ? 'true' : 'false',
    });
    setLoading(false);
  };

  return (
    <>
      <Header onPress={goBack} />
      <MaxWidthContainer
        withScrollView="keyboardAware"
        outerViewProps={{
          showsVerticalScrollIndicator: false,
        }}
        innerViewProps={{ style: { flex: 1, marginBottom: 20 } }}
        maxWidth={450}
      >

        <Form<SignUpForm> {...signUpForm}>
          <Layout style={{
            marginHorizontal: 25,
            backgroundColor: 'transparent',

          }}
          >
            <Text category="h1" style={AuthStyles.header}>Créer votre compte</Text>
            <Text category="s2" style={{ color: '#cecece', marginBottom: 20, marginTop: 10 }}>Tous les champs sont obligatoires</Text>

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
              withEyeToggle
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
              label={(props) => (
                <Text style={{ flex: 1 }}>
                  <Text {...props}>J'accepte les </Text>
                  <Text {...props} onPress={() => setModalUrl('https://omedom.com/legal/?simple=1')} style={{ textDecorationLine: 'underline' }}>conditions générales d'utilisation</Text>
                  <Text {...props}> d'Omedom</Text>
                </Text>
              )}
              labelPosition="before"
              validators={[
                { rule: AvailableValidationRules.required, errorMessage: 'Vous devez accepter les conditions générales d\'utilisation' },
              ]}
            />
            <Modal
              visible={modalUrl !== false}
              backdropStyle={{ backgroundColor: 'rgba(0,0,0, 0.7)' }}
              onBackdropPress={() => setModalUrl(false)}
            >
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  height: window.height * 0.9,
                  width: window.width * 0.9,
                  flex: 1,
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                  padding: 7,
                }}
              >
                <WebView src={modalUrl || ''} />
                <Button onPress={() => setModalUrl(false)}>Fermer</Button>
              </View>
            </Modal>

            <Text style={{ flex: 1, marginVertical: 10 }}>
              <Text>
                OMEDOM collecte vos informations personnelles afin d'exécuter le contrat qui
                vous lie et de satisfaire vos demandes (services, fonctionnement de compte, etc. ).
                Pour connaitre les droits dont vous disposez concernant vos données personnelles
                et toutes les informations sur leur traitement par OMEDOM, vous pouvez
                consulter notre Politique de protection des données
              </Text>
              <Text> </Text>
              <Text onPress={() => setModalUrl('https://omedom.com/politique-de-confidentialite?simple=1')} style={{ textDecorationLine: 'underline' }}>ici</Text>
              <Text>.</Text>
            </Text>

            <View style={{
              flexDirection: 'row', justifyContent: 'space-between',
            }}
            >
              <Button appearance="ghost" onPress={goConfirmCode}>Confirmez avec un code</Button>
              <Button
                size="medium"
                disabled={loading}
                style={{
                  width: 140,
                }}
                onPress={
                  signUpForm.handleSubmit(async (data) => {
                    setLoading(true);
                    submit(data);
                  })
                }
              >
                Valider
              </Button>
            </View>
            <Text category="c1" appearance="hint">
              * champs obligatoires
            </Text>

          </Layout>
        </Form>

        <Layout style={{ flexDirection: 'row' }} />
      </MaxWidthContainer>
    </>
  );
};

interface SignUpProps {
  error?: string
  signUp: (userInfo: {
    email: string,
    phone_number: string,
    password: string,
    given_name: string,
    family_name: string,
    'custom:optIn': string
  }) => void
  goBack: () => void
  goConfirmCode: () => void
}

export default class SignUp extends AmplifySignUp {
  showComponent() {
    // @ts-expect-error : Cannot change AWS prop types
    const { setTmpPasswd } = this.props;
    // @ts-expect-error : AWS does not expose Types
    this.signUpFields = [
      {
        label: 'Firstname',
        key: 'given_name',
        required: true,
        displayOrder: 1,
        testID: TEST_ID.AUTH.PHONE_INPUT,
      },
      {
        label: 'Lastname',
        key: 'family_name',
        required: true,
        displayOrder: 2,
        testID: TEST_ID.AUTH.PHONE_INPUT,
      },
      {
        label: 'Email',
        key: 'email',
        required: true,
        type: 'email',
        displayOrder: 3,
        testID: TEST_ID.AUTH.EMAIL_INPUT,
      },
      {
        label: 'Password',
        key: 'password',
        required: true,
        type: 'password',
        displayOrder: 4,
        testID: TEST_ID.AUTH.PASSWORD_INPUT,
      },
      {
        label: 'Phone Number',
        key: 'phone_number',
        required: true,
        displayOrder: 5,
        testID: TEST_ID.AUTH.PHONE_INPUT,
      },
      {
        label: 'Opt In',
        key: 'custom:optIn',
        displayOrder: 6,
      },
    ];
    return (
      <MySignUp
        error={this.state.error}
        signUp={(userInfo) => {
          // @ts-expect-error : AWS does not expose Types
          this.setState({ ...userInfo, error: null }, this.signUp);
          setTmpPasswd(userInfo.password);
        }}
        // @ts-expect-error : AWS does not expose Types
        goBack={() => this.changeState('signIn')}
        // @ts-expect-error : AWS does not expose Types
        goConfirmCode={() => this.changeState('confirmSignUp')}
      />
    );
  }
}
