/**
 * Navigateur principal redirige l'utilisateur
 * à une interface approprié en fonction de divers paramètres.
 * @author:
 */

import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';

import * as React from 'react';
import { ColorSchemeName, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Layout, Text } from '@ui-kitten/components';
import LinkingConfiguration from './LinkingConfiguration';
import ActivityIndicator from '../components/ActivityIndicator';
import InitialNavigator from './InitialNavigator';
import FinalSignUpStackNavigator from './FinalSignUpStackNavigator';
import { useUser } from '../src/API/UserContext';
import { useAutoFileStorage } from '../utils/S3FileStorage';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const { user, userIsLoading } = useUser();
    useAutoFileStorage();

  return (
    userIsLoading
      ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text category="h4" status="primary">Chargement des données</Text>
          <ActivityIndicator />
        </View>
      )
      : (
        <NavigationContainer
          linking={LinkingConfiguration}
          theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
          fallback={(
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator />
            </Layout>
      )}
        >
          <StatusBar />
          {user
            ? <InitialNavigator /> : <FinalSignUpStackNavigator />}
        </NavigationContainer>
      )

  );
}
