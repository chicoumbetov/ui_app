/**
 * Navigateur principal redirige l'utilisateur
 * à une interface approprié en fonction de divers paramètres.
 * @author:
 */

import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';

import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Layout, Text } from '@ui-kitten/components';
import LinkingConfiguration from './LinkingConfiguration';
import ActivityIndicator from '../components/ActivityIndicator';
import InitialNavigator from './InitialNavigator';
import FinalSignUpStackNavigator from './FinalSignUpStackNavigator';
import { useUser } from '../src/API/UserContext';
import { useAutoFileStorage } from '../utils/S3FileStorage';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const { user, userIsLoading, userIsCreating } = useUser();
  useAutoFileStorage();

  const Theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  Theme.colors.background = '#fbfbfb';

  return (
    userIsLoading
      ? (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text category="h4" status="primary">Chargement des données</Text>
          <ActivityIndicator />
        </Layout>
      )
      : (
        <NavigationContainer
          linking={LinkingConfiguration}
          theme={Theme}
          fallback={(
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator />
            </Layout>
      )}
        >
          <StatusBar />
          {user && !userIsCreating
            ? <InitialNavigator /> : <FinalSignUpStackNavigator />}
        </NavigationContainer>
      )

  );
}
