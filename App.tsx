import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Layout, ApplicationProvider, IconRegistry } from '@ui-kitten/components';

import * as eva from '@eva-design/eva';

import { EvaIconsPack } from '@ui-kitten/eva-icons';

import Amplify, { Auth, Hub } from 'aws-amplify';

import { Authenticator } from 'aws-amplify-react-native';

import { HubCapsule } from 'aws-amplify-react-native/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
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

Amplify.configure({
  ...awsExports,
  Analytics: {
    disabled: true,
  },
});

const listener = async (data: HubCapsule) => {
  switch (data.payload.event) {
    case 'signIn': {
      const user = await Auth.currentAuthenticatedUser();
      user.getUserAttributes((error?: Error, result?: CognitoUserAttribute[]) => {
        if (result) {
          for (let i = 0; i < result.length; i += 1) {
            if (result[i].getName() === 'given_name') {
              AsyncStorage.setItem('lastFirstname', result[i].getValue());
            }
          }
        }
      });
      user.getCachedDeviceKeyAndPassword();
      const stayConnected = await AsyncStorage.getItem('stayConnected');
      if (stayConnected === 'true') {
        user.setDeviceStatusRemembered({
          onSuccess: () => {},
          onFailure: () => {},
        });
      } else {
        user.setDeviceStatusNotRemembered({
          onSuccess: () => {},
          onFailure: () => {},
        });
      }
      break;
    }
    default:
      break;
  }
};

Hub.listen('auth', listener);

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
};

function App() {
  const colorScheme = useColorScheme();
  const [authState, setAuthState] = useState<string>();
  const [tmpPasswd, setTmpPasswd] = useState<string>();

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
        customMapping={mapping}
        theme={{ ...eva.light, ...omedomTheme }}
      >
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator />
        </Layout>
      </ApplicationProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <IconRegistry icons={[EvaIconsPack]} />
      <ApplicationProvider
        {...eva}
        customMapping={mapping}
        theme={{ ...eva.light, ...omedomTheme }}
      >
        {authState === 'signedIn' ? (
          <ApolloProvider client={client}>
            <Rehydration>
              <Navigation colorScheme={colorScheme} />
            </Rehydration>
          </ApolloProvider>
        ) : (
          <Authenticator
            onStateChange={setAuthState}
            hideDefault
            usernameAttributes="email"
          >
            <SignIn />
            <ForgotPassword />
            {/* @ts-expect-error : Cannot change AWS prop types */}
            <SignUp setTmpPasswd={setTmpPasswd} />
            {/* @ts-expect-error : Cannot change AWS prop types */}
            <ConfirmSignUp tmpPasswd={tmpPasswd} />
          </Authenticator>
        )}
      </ApplicationProvider>
    </SafeAreaProvider>

  );
}

export default App;
// export default withAuthenticator(App);
