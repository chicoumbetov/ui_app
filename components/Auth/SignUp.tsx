import React, { useEffect, useState } from 'react';
import { SignUp as AmplifySignUp } from 'aws-amplify-react-native';
import {
  Button, Card, Layout, Modal, Text,
} from '@ui-kitten/components';
import { useForm } from 'react-hook-form';
// @ts-ignore
import TEST_ID from 'aws-amplify-react-native/dist/AmplifyTestIDs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthStyles } from './styles';
import { ErrorMessage } from './components/ErrorMessage';
import TextInputComp from '../Form/TextInput';
import { AvailableValidationRules } from '../Form/validation';
import Radio from '../Form/Radio';
import Form from '../Form/Form';
import PhoneNumberInput from '../Form/PhoneNumberInput';
import MaxWidthContainer from '../MaxWidthContainer';
import WebView from '../WebView';

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
  const [cguVisible, setCguVisible] = useState(false);

  const signUpForm = useForm<SignUpForm>();

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  const submit = (data: SignUpForm) => {
    signUp({
      password: data.password,
      email: data.email,
      phone_number: data.phone_number,
      family_name: data.lastname,
      given_name: data.firstname,
      'custom:optIn': data.optIn ? 'true' : 'flse',
    });
  };

  return (
    <MaxWidthContainer withScrollView="keyboardAware" innerViewProps={{ style: { flex: 1, justifyContent: 'center', alignItems: 'center' } }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <Form<SignUpForm> {...signUpForm}>
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
                  <Text {...props} onPress={() => setCguVisible(true)} style={{ textDecorationLine: 'underline' }}>conditions générales d'utilisation</Text>
                  <Text {...props}> d'Omedom</Text>
                </Text>
              )}
              labelPosition="before"
              validators={[
                { rule: AvailableValidationRules.required, errorMessage: 'Vous devez accepter les conditions générales d\'utilisation' },
              ]}
            />
            <Modal
              visible={cguVisible}
              backdropStyle={{ backgroundColor: 'rgba(0,0,0, 0.7)' }}
              onBackdropPress={() => setCguVisible(false)}
            >
              <Card disabled>
                <WebView src="https://web-premiere.fr" />
                <Button onPress={() => setCguVisible(false)}>Fermer</Button>
              </Card>
            </Modal>

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
                onPress={
                  signUpForm.handleSubmit((data) => {
                    AsyncStorage.setItem('lastFirstname', data.firstname);
                    submit(data);
                  })
                }
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
    </MaxWidthContainer>
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
    ];
    return (
      <MySignUp
        error={this.state.error}
        signUp={(userInfo) => {
          setTmpPasswd(userInfo.password);
          // @ts-expect-error : AWS does not expose Types
          this.setState({ ...userInfo, error: null }, this.signUp);
        }}
        // @ts-expect-error : AWS does not expose Types
        goBack={() => this.changeState('signIn')}
        // @ts-expect-error : AWS does not expose Types
        goConfirmCode={() => this.changeState('confirmSignUp')}
      />
    );
  }
}
