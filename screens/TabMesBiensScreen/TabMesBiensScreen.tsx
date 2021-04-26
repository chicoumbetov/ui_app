/**
 * Page 1 Mes Biens pour visualiser les biens
 *
 * @author: Shynggys UMBETOV
 */

import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Layout } from '@ui-kitten/components';
import MesBiens from './Components/MesBiens';

const Stack = createStackNavigator();

export default function TabMesBiensScreen({ navigation }) {
  return (
    <Layout style={{ flex: 1, backgroundColor: '#efefef' }}>
      <Stack.Navigator
        initialRouteName="MesBiens"
      >
        <Stack.Screen
          name="MesBiens"
          options={{
            headerShown: false,
          }}
          component={MesBiens}
        />

      </Stack.Navigator>
    </Layout>
  );
}
