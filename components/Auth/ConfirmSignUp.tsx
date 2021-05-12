import React, { useEffect, useState } from 'react';
import { ConfirmSignUp as AmplifyConfirmSignUp } from 'aws-amplify-react-native';
import {
  Layout, Button, Text,
} from '@ui-kitten/components';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { AuthStyles } from './styles';
import { ErrorMessage } from './components/ErrorMessage';
import { AvailableValidationRules } from '../Form/validation';
import DigitsInput from '../Form/DigitsInput';
import Form from '../Form/Form';
import MaxWidthContainer from '../MaxWidthContainer';
import TextInputComp from '../Form/TextInput';

type ConfirmForm = {
  code: string;
  email?: string;
};

const MyConfirmSignUp = ({
  error, goBack, confirmSignUp, isUserNameNeeded,
}: ConfirmSignUpProps) => {
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => { setErrorMessage(error); }, [error]);

  const confirmForm = useForm<ConfirmForm>();

  const confirm = (data: ConfirmForm) => {
    confirmSignUp(data.code, data.email);
  };

  return (
    <MaxWidthContainer withScrollView="keyboardAware" innerViewProps={{ style: { flex: 1, justifyContent: 'center', alignItems: 'center' } }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <Text category="h1" style={AuthStyles.header}>Confirmez votre inscription</Text>
        <Form<ConfirmForm> {...confirmForm}>
          <>
            {isUserNameNeeded
            && (
            <TextInputComp
              name="email"
              placeholder="Votre e-mail"
              validators={[
                AvailableValidationRules.required,
                AvailableValidationRules.email,
              ]}
            />
            )}
            <DigitsInput
              name="code"
              numberOfDigits={6}
              label="Code de vérification"
              validators={[
                AvailableValidationRules.required,
              ]}
            />

            {errorMessage && <ErrorMessage message={errorMessage} />}

            <Button size="large" appearance="outline" style={AuthStyles.button} onPress={confirmForm.handleSubmit((data) => confirm(data))}>Confirmer</Button>
          </>
        </Form>
        <Button appearance="ghost" style={AuthStyles.button} onPress={goBack}>Retour vers à la connexion</Button>
      </Layout>
    </MaxWidthContainer>
  );
};

interface ConfirmSignUpProps {
  error?: string
  goBack: () => void
  confirmSignUp: (code: string, username?: string) => void
  isUserNameNeeded: boolean
}

export default class ConfirmSignUp extends AmplifyConfirmSignUp {
  confirm() {
    // @ts-expect-error : Cannot change AWS prop types
    const { tmpPasswd } = this.props;
    const { code } = this.state;
    // @ts-expect-error : AWS does not expose Types
    const username = this.getUsernameFromInput();
    Auth.confirmSignUp(username, code)
      .then(async () => {
        if (tmpPasswd) {
          Auth.signIn(username, tmpPasswd)
            .then(() => {
              // @ts-expect-error : AWS does not expose Types
              this.changeState('signedIn');
              // @ts-expect-error : AWS does not expose Types
            }).catch((err) => this.error(err));
        } else {
          // @ts-expect-error : AWS does not expose Types
          this.changeState('signedUp');
        }
      })
      // @ts-expect-error : AWS does not expose Types
      .catch((err) => this.error(err));
  }

  static getDerivedStateFromProps(props: any, state: any) {
    const username = props.authData;

    if (username && !state.email) {
      return { email: username };
    }

    return null;
  }

  showComponent() {
    return (
      <MyConfirmSignUp
        // @ts-expect-error : AWS does not expose Types
        goBack={() => this.changeState('signIn')}
        error={this.state.error}
        confirmSignUp={(code, email) => {
          // @ts-expect-error : AWS does not expose Types
          let finalUsername = this.getUsernameFromInput();
          if (finalUsername === null || finalUsername === undefined) {
            finalUsername = email;
          }
          this.setState({ code, email: finalUsername, error: null }, this.confirm);
        }}
        isUserNameNeeded={
          // @ts-expect-error : AWS does not expose Types
          this.getUsernameFromInput() === null || this.getUsernameFromInput() === undefined
        }
      />
    );
  }
}
