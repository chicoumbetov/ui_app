import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import AppLoading from 'expo-app-loading';

import { light as lightTheme, mapping } from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
// import { default as mapping } from './mapping.json';

import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import useAssetLoader from './hooks/useAssetLoader';
import ActivityIndicator from './components/ActivityIndicator';
import { View } from './components/Themed';

const fonts = {
  Icons: require('./components/Icon/icomoon.ttf'),
  HouschkaRoundedMedium: require('./assets/fonts/HouschkaRoundedMedium.ttf'),
  HouschkaRoundedDemiBold: require('./assets/fonts/HouschkaRoundedDemiBold.ttf'),
  Houschka_Rounded_Alt_Light_Regular: require('./assets/fonts/Houschka_Rounded_Alt_Light_Regular.ttf'),
  Houschka_Rounded_Alt_Bold_Regular: require('./assets/fonts/Houschka_Rounded_Alt_Bold_Regular.ttf'),
};

export default function App() {
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ApplicationProvider
      mapping={mapping}
      theme={lightTheme}
    >

      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    </ApplicationProvider>
  );
}
