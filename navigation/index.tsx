/**
 * Navigateur principal redirige l'utilisateur à une interface approprié en fonction de divers paramètres.
 *
 * @author:
 */

import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';

import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Layout } from '@ui-kitten/components';

import LinkingConfiguration from './LinkingConfiguration';
import ActivityIndicator from '../components/ActivityIndicator';
import InitialNavigator from './InitialNavigator';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (

    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      fallback={(
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator />
        </Layout>
      )}
    >
      <StatusBar hidden />
      <InitialNavigator />

    </NavigationContainer>

  );
}
