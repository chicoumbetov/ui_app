import React, { useEffect, useState } from 'react';
import { ForgotPassword as AmplifyForgotPassword } from 'aws-amplify-react-native';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import {
  Layout, Button, Text,
} from '@ui-kitten/components';
import { useForm } from 'react-hook-form';
import { AuthStyles } from './styles';
import { ErrorMessage } from './components/ErrorMessage';
import Form from '../Form/Form';
import { AvailableValidationRules } from '../Form/validation';
import TextInputComp from '../Form/TextInput';
import DigitsInput from '../Form/DigitsInput';
import MaxWidthContainer from '../MaxWidthContainer';
import Header from './Header';

type ResetForm = {
  email: string;
};
type NewPasswordForm = {
  code: string;
  password: string;
};

const MyForgotPassword = ({
  resetPassword, goBack, error,
}: ForgotPasswordProps) => {
  const [errorMessage, setErrorMessage] = useState<string>();

  const resetForm = useForm<ResetForm>();
  useEffect(() => { setErrorMessage(error); }, [error]);

  const reset = (data: ResetForm) => resetPassword(data.email);

  return (
    <>
      <Header onPress={goBack} />
      <MaxWidthContainer
        withScrollView="keyboardAware"
        outerViewProps={{
          showsVerticalScrollIndicator: false,
        }}
        innerViewProps={{ style: { flex: 1 } }}
        maxWidth={450}
      >
        <Layout style={{
          marginHorizontal: 25,
          backgroundColor: 'transparent',

        }}
        >

          <Text category="h1" style={AuthStyles.header}>Mot de passe oublié</Text>

          <Form<ResetForm> {...resetForm}>
            <>
              <TextInputComp
                name="email"
                placeholder="Votre e-mail"
                validators={[
                  AvailableValidationRules.required,
                  AvailableValidationRules.email,
                ]}
              />

              {errorMessage && <ErrorMessage message={errorMessage} />}
              <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
              >
                <Button
                  size="medium"
                  style={{
                    width: 140,
                  }}
                  onPress={resetForm.handleSubmit((data) => reset(data))}
                >
                  Envoyer
                </Button>
              </View>
            </>
          </Form>
        </Layout>
      </MaxWidthContainer>
    </>
  );
};

const MyNewPassword = ({ error, goBack, setNewPassword }: NewPasswordProps) => {
  const [errorMessage, setErrorMessage] = useState<string>();

  const newPasswordForm = useForm<NewPasswordForm>();
  useEffect(() => { setErrorMessage(error); }, [error]);

  const submit = (data: NewPasswordForm) => {
    setNewPassword(data.code, data.password);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <Text category="h1" style={AuthStyles.header}>Enregistrez votre nouveau mot de passe</Text>
        <Form<NewPasswordForm> {...newPasswordForm}>
          <>
            <DigitsInput
              name="code"
              numberOfDigits={6}
              label="Code de vérification"
              validators={[
                AvailableValidationRules.required,
              ]}
            />
            <TextInputComp
              name="password"
              placeholder="Votre nouveau mot de passe"
              validators={[
                AvailableValidationRules.required,
                AvailableValidationRules.password,
              ]}
            />

            {errorMessage && <ErrorMessage message={errorMessage} />}

            <Button size="medium" style={AuthStyles.button} onPress={newPasswordForm.handleSubmit((data) => submit(data))}>Enregistrer</Button>
          </>
        </Form>
        <Button appearance="ghost" style={AuthStyles.button} onPress={goBack}>Retour à la connexion</Button>
      </Layout>
    </KeyboardAvoidingView>
  );
};

interface ForgotPasswordProps {
  goBack: () => void
  resetPassword: (email: string) => void
  error?: string
}

interface NewPasswordProps {
  error?: string
  goBack: () => void
  setNewPassword: (code: string, password: string) => void
}

export default class ForgotPassword extends AmplifyForgotPassword {
  showComponent() {
    if (!this.state.delivery) {
      return (
        <MyForgotPassword
          // @ts-expect-error : AWS does not expose Types
          goBack={() => this.changeState('signIn')}
          error={this.state.error}
          resetPassword={(email) => {
            this.setState({
              username: email, phone_number: email, email, error: null,
              // @ts-expect-error : AWS does not expose Types
            }, this.send);
          }}
        />
      );
    }
    return (
      <MyNewPassword
        // @ts-expect-error : AWS does not expose Types
        goBack={() => this.changeState('signIn')}
        error={this.state.error}
        setNewPassword={(code, password) => {
          // @ts-expect-error : AWS does not expose Types
          this.setState({ code, password }, this.submit);
        }}
      />
    );
  }
}
