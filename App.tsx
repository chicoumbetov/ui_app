import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Layout, ApplicationProvider, IconRegistry } from '@ui-kitten/components';

import * as eva from '@eva-design/eva';

import { EvaIconsPack } from '@ui-kitten/eva-icons';

import Amplify from 'aws-amplify';

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
};

function App() {
  const colorScheme = useColorScheme();
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

  return (
    <SafeAreaProvider>
      <IconRegistry icons={[EvaIconsPack]} />
      <ApplicationProvider
        {...eva}
        // @ts-ignore
        customMapping={mapping}
        theme={{ ...eva.light, ...omedomTheme }}
      >
        <ApolloProvider client={client}>
          <Rehydration>
            <UserProvider>
              <UserContext.Consumer>
                {
                  ({ cognitoUser }) => (
                    cognitoUser ? (
                      <Navigation colorScheme={colorScheme} />
                    ) : (
                      <Authenticator
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
                    )
                  )
                }
              </UserContext.Consumer>
            </UserProvider>
          </Rehydration>
        </ApolloProvider>
      </ApplicationProvider>
    </SafeAreaProvider>

  );
}

export default App;
// export default withAuthenticator(App);
