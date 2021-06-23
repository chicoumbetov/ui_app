// Obligatoire pour UUID en React Native
import 'react-native-get-random-values';
import { StatusBar } from 'expo-status-bar';
import React, { FC, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Layout, ApplicationProvider, IconRegistry } from '@ui-kitten/components';

import * as eva from '@eva-design/eva';

import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { Amplify, I18n } from '@aws-amplify/core';

import { Authenticator } from 'aws-amplify-react-native';

import { ApolloProvider } from 'react-apollo';
import omedomTheme from './custom-theme';
import mapping from './mapping.json';

import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import useAssetLoader from './hooks/useAssetLoader';

import ActivityIndicator from './components/ActivityIndicator';

import awsExports from './src/aws-exports';
import {
  ConfirmSignUp, ForgotPassword, SignIn, SignUp,
} from './components/Auth';

import client, { Rehydration } from './src/Apollo';
import { UserContext, UserProvider } from './src/API/UserContext';
import ErrorMap from './components/Auth/ErrorMap';

Amplify.configure({
  ...awsExports,
  Analytics: {
    disabled: true,
  },
});

const fonts = {
  // eslint-disable-next-line global-require
  Icons: require('./components/Icon/icomoon.ttf'),
  // eslint-disable-next-line global-require
  HouschkaRoundedMedium: require('./assets/fonts/HouschkaRoundedMedium.ttf'),
  // eslint-disable-next-line global-require
  HouschkaRoundedDemiBold: require('./assets/fonts/HouschkaRoundedDemiBold.ttf'),
  // eslint-disable-next-line global-require
  Houschka_Rounded_Alt_Light_Regular: require('./assets/fonts/Houschka_Rounded_Alt_Light_Regular.ttf'),
  // eslint-disable-next-line global-require
  Houschka_Rounded_Alt_Bold_Regular: require('./assets/fonts/Houschka_Rounded_Alt_Bold_Regular.ttf'),
  // eslint-disable-next-line global-require
  confortaa_Bold: require('./assets/fonts/Comfortaa-Bold.ttf'),
  // eslint-disable-next-line global-require
  confortaa_Light: require('./assets/fonts/Comfortaa-Light.ttf'),
  // eslint-disable-next-line global-require
  confortaa_Medium: require('./assets/fonts/Comfortaa-Medium.ttf'),
  // eslint-disable-next-line global-require
  confortaa_Regular: require('./assets/fonts/Comfortaa-Regular.ttf'),
  // eslint-disable-next-line global-require
  confortaa_SemiBold: require('./assets/fonts/Comfortaa-SemiBold.ttf'),
};

I18n.setLanguage('fr');
I18n.putVocabularies({
  'An account with the given email already exists.': 'Un compte avec une adresse e-mail identique existe déjà.',
});

function App() {
  const colorScheme = useColorScheme();
  const tmpPasswd = useRef<string>();
  const setTmpPasswd = (passwd: string) => tmpPasswd.current = passwd;
  const getTmpPasswd = () => tmpPasswd.current;

  const assetLoader = useAssetLoader({ fonts });

  if (!assetLoader.isReady) {
    if (Platform.OS !== 'web') {
      return (
        <>
          <StatusBar hidden />
          <AppLoading {...assetLoader.getAppLoadingProps()} />
        </>
      );
    }
    (async () => {
      const appLoadingProps = assetLoader.getAppLoadingProps();
      if (appLoadingProps.startAsync && appLoadingProps.onFinish) {
        await appLoadingProps.startAsync();
        appLoadingProps.onFinish();
      }
    })();
    return (
      <ApplicationProvider
        {...eva}
        // @ts-ignore
        customMapping={mapping}
        theme={{ ...eva.light, ...omedomTheme }}
      >
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator />
        </Layout>
      </ApplicationProvider>
    );
  }

  const AuthContainer: FC<{}> = ({ children }) => <Layout style={{ flex: 1 }}>{children}</Layout>;

  return (
    <SafeAreaProvider>
      <IconRegistry icons={[EvaIconsPack]} />
      <ApolloProvider client={client}>
        <ApplicationProvider
          {...eva}
              // @ts-ignore
          customMapping={mapping}
          theme={{ ...eva.light, ...omedomTheme }}
        >
          <Rehydration>
            <UserProvider>
              <Layout style={{ flex: 1 }}>
                <UserContext.Consumer>
                  {
                  ({ cognitoUser }) => (
                    cognitoUser ? (
                      <Navigation colorScheme={colorScheme} />
                    ) : (
                      <Authenticator
                        hideDefault
                        usernameAttributes="email"
                        container={AuthContainer}
                        onStateChange={(e) => console.log(e)}
                        errorMessage={ErrorMap}
                      >
                        <SignIn />
                        <ForgotPassword />
                        {/* @ts-expect-error : Cannot change AWS prop types */}
                        <SignUp setTmpPasswd={setTmpPasswd} />
                        {/* @ts-expect-error : Cannot change AWS prop types */}
                        <ConfirmSignUp getTmpPasswd={getTmpPasswd} />
                      </Authenticator>
                    )
                  )
                }
                </UserContext.Consumer>
              </Layout>
            </UserProvider>
          </Rehydration>
        </ApplicationProvider>
      </ApolloProvider>

    </SafeAreaProvider>

  );
}

export default App;
// export default withAuthenticator(App);
