/**
 * Navigateur principal redirige l'utilisateur à une interface approprié en fonction de divers paramètres.
 *
 * @author:
 */

import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';

import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Layout, Text } from '@ui-kitten/components';

import LinkingConfiguration from './LinkingConfiguration';
import ActivityIndicator from '../components/ActivityIndicator';
import { Permissions, useUser } from '../utils/user';
import InitialNavigator from './InitialNavigator';
import LoginScreen from '../screens/LoginScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const { user, loadingUser, userCan } = useUser();

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
      {loadingUser ? (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator />
        </Layout>
      ) : (
        <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {user !== null && user.challengeName !== 'NEW_PASSWORD_REQUIRED'
            ? (
              <>
                {userCan(Permissions.Client) && (
                <InitialNavigator />
                )}
              </>
            ) : (
              <LoginScreen />
            )}
        </Layout>
      )}

    </NavigationContainer>

  );
}
