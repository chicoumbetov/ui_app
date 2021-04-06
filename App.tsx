import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';


import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {useFonts} from "expo-font";

export default function App() {

  const [loaded] = useFonts({
    'Houschka_Rounded_Alt_Light_Regular': require('../../assets/fonts/Houschka_Rounded_Alt_Light_Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
