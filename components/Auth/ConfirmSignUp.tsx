import React, { useEffect, useState } from 'react';
import { ConfirmSignUp as AmplifyConfirmSignUp } from 'aws-amplify-react-native';
import {
  Layout, Button, Text,
} from '@ui-kitten/components';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { View } from 'react-native';
import { AuthStyles } from './styles';
import { ErrorMessage } from './components/ErrorMessage';
import { AvailableValidationRules } from '../Form/validation';
import DigitsInput from '../Form/DigitsInput';
import Form from '../Form/Form';
import MaxWidthContainer from '../MaxWidthContainer';
import TextInputComp from '../Form/TextInput';
import Header from './Header';

type ConfirmForm = {
  code: string;
  email?: string;
};

const MyConfirmSignUp = ({
  error, goBack, confirmSignUp, isUserNameNeeded, resend,
}: ConfirmSignUpProps) => {
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => { setErrorMessage(error); }, [error]);

  const confirmForm = useForm<ConfirmForm>();

  const confirm = (data: ConfirmForm) => {
    confirmSignUp(data.code, data.email);
  };

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
          <Text category="h1" style={AuthStyles.header}>Un code de confirmation vous a été envoyé par mail </Text>
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
                label="Veuillez saisir ci-dessous le code à 6 chiffres"
                labelStyle={{
                  marginBottom: 30,
                }}
                validators={[
                  AvailableValidationRules.required,
                ]}
              />

              {errorMessage && <ErrorMessage message={errorMessage} />}

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 45,
              }}
              >
                <Button appearance="ghost" onPress={resend}>Renvoyer le code</Button>
                <Button
                  size="medium"
                  style={{
                    width: 140,
                  }}
                  onPress={confirmForm.handleSubmit((data) => confirm(data))}
                >
                  Valider
                </Button>
              </View>
            </>
          </Form>
        </Layout>
      </MaxWidthContainer>
    </>
  );
};

interface ConfirmSignUpProps {
  error?: string
  goBack: () => void
  confirmSignUp: (code: string, username?: string) => void
  resend: () => void
  isUserNameNeeded: boolean
}

export default class ConfirmSignUp extends AmplifyConfirmSignUp {
  confirm() {
    // @ts-expect-error : Cannot change AWS prop types
    const { getTmpPasswd } = this.props;
    const { code } = this.state;
    // @ts-expect-error : AWS does not expose Types
    const username = this.getUsernameFromInput();
    Auth.confirmSignUp(username, code)
      .then(async () => {
        const passwd = getTmpPasswd();
        if (passwd) {
          Auth.signIn(username, passwd)
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
        resend={() => {
          // @ts-expect-error : AWS does not expose Types
          const username = this.getUsernameFromInput();
          Auth.resendSignUp(username);
        }}
        isUserNameNeeded={
          // @ts-expect-error : AWS does not expose Types
          this.getUsernameFromInput() === null || this.getUsernameFromInput() === undefined
        }
      />
    );
  }
}
