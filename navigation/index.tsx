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

import { useEffect, useState } from 'react';
import { Auth, DataStore, Hub } from 'aws-amplify';
import LinkingConfiguration from './LinkingConfiguration';
import ActivityIndicator from '../components/ActivityIndicator';
import InitialNavigator from './InitialNavigator';
import { Utilisateur } from '../src/models';
import FinalSignUpStackNavigator from './FinalSignUpStackNavigator';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const [dataStoreInitializing, setDataStoreInitializing] = useState(true);
  const [needFinalSignUp, setNeedFinalSignUp] = useState(false);

  // on vérifie le statut de datastore
  useEffect(() => {
    const removeListener = Hub.listen('datastore', async (hubData) => {
      const { event } = hubData.payload;
      console.log(hubData.payload);
      if (event === 'ready') {
        // on verifie si l'utilisateur connecté à plus d'informations
        // sinon on terminera l'inscription
        const authUser = await Auth.currentAuthenticatedUser();
        const user = await DataStore.query(
          Utilisateur,
          (c) => c.userID('eq', authUser.username),
        );
        console.log(user);
        if (user.length <= 0) {
          setNeedFinalSignUp(true);
        }
        setDataStoreInitializing(false);
      }
    });
    DataStore.start();

    return () => {
      removeListener();
    };
  }, []);

  return (
    dataStoreInitializing
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
          {needFinalSignUp ? <FinalSignUpStackNavigator />
            : <InitialNavigator />}
        </NavigationContainer>
      )

  );
}
