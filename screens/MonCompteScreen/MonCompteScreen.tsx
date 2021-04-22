/**
 * Mon Compte to visualise compte info or modify.
 *
 * @author: Shynggys UMBETOV
 */

import * as React from 'react';

import { Layout } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import MonComptePage1 from './Components/MonComptePage1';
import ModifierInfo1 from './Components/ModifierInfo1';
import ModifierInfo2 from './Components/ModifierInfo2';
import ModifierInfo3 from './Components/ModifierInfo3';

const Stack = createStackNavigator();

export default function MonCompteScreen() {
  return (
    <Layout style={{ flex: 1, backgroundColor: '#efefef' }}>
      <Stack.Navigator
        initialRouteName="Mon Compte"
        headerMode="none"
      >
        <Stack.Screen
          name="MonCompte"
          options={{
            title: 'Awesome app',
          }}
          component={MonComptePage1}
        />
        <Stack.Screen
          name="ModifierInfo1"
          options={{
            title: 'Awesome 2',
          }}
          component={ModifierInfo1}
        />
        <Stack.Screen
          name="ModifierInfo2"
          options={{
            title: 'Awesome 3',
          }}
          component={ModifierInfo2}
        />
        <Stack.Screen
          name="ModifierInfo3"
          options={{
            title: 'Awesome 4',
          }}
          component={ModifierInfo3}
        />
      </Stack.Navigator>
    </Layout>
  );
}
