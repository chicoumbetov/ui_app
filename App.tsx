import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Layout, ApplicationProvider, IconRegistry } from '@ui-kitten/components';

import * as eva from '@eva-design/eva';

import { EvaIconsPack } from '@ui-kitten/eva-icons';
// eslint-disable-next-line import/no-named-as-default
// import FeatherIconsPack from './assets/feather-icons';
// import AssetIconsPack from './assets/asset-icons';

// eslint-disable-next-line import/no-named-default
// created styles according on eva design styles:
import Amplify from '@aws-amplify/core';
import { Auth } from '@aws-amplify/auth';
import { withAuthenticator } from 'aws-amplify-react-native';
import { default as theme } from './custom-theme.json';
import { default as mapping } from './mapping.json';
// eva design styles:
// import { light as lightTheme } from '@eva-design/eva';
// import { mapping } from '@eva-design/eva';

import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import useAssetLoader from './hooks/useAssetLoader';
import ActivityIndicator from './components/ActivityIndicator';

import awsExports from './src/aws-exports';

Amplify.configure({
  ...awsExports,
  Analytics: {
    disabled: true,
  },
});
Auth.configure(awsExports);

const fonts = {
  Icons: require('./components/Icon/icomoon.ttf'),
  HouschkaRoundedMedium: require('./assets/fonts/HouschkaRoundedMedium.ttf'),
  HouschkaRoundedDemiBold: require('./assets/fonts/HouschkaRoundedDemiBold.ttf'),
  Houschka_Rounded_Alt_Light_Regular: require('./assets/fonts/Houschka_Rounded_Alt_Light_Regular.ttf'),
  Houschka_Rounded_Alt_Bold_Regular: require('./assets/fonts/Houschka_Rounded_Alt_Bold_Regular.ttf'),
};

function App() {
  const colorScheme = useColorScheme();

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
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </Layout>
    );
  }

  return (
    <>
      <IconRegistry icons={[EvaIconsPack]} />
      <ApplicationProvider
        {...eva}
        customMapping={mapping}
        theme={{ ...eva.dark, ...theme }}
      >
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>

      </ApplicationProvider>
    </>

  );
}

// export default App;
export default withAuthenticator(App);
