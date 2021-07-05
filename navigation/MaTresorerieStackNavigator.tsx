import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { TabMaTresorerieParamList } from '../types';
import MaTresorerie from '../screens/MaTresorerieScreen/Tresorerie';
import MaTresorerie2 from '../screens/MaTresorerieScreen/Tresorerie2';
import MouvBancaires from '../screens/MaTresorerieScreen/MouvBancaires';
import IgnorerMouvement
  from '../screens/MaTresorerieScreen/IgnorerMouvement';
import AffecterMouvement from '../screens/MaTresorerieScreen/AffecterMouvement';

const Stack = createStackNavigator<TabMaTresorerieParamList>();

export default function MaTresorerieStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ma-tresorerie"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="ma-tresorerie"
        component={MaTresorerie}
      />
      <Stack.Screen
        name="ma-tresorerie-2"
        component={MaTresorerie2}
      />
      <Stack.Screen
        name="mouv-bancaires"
        component={MouvBancaires}
      />
      <Stack.Screen
        name="ignorer-mouvement"
        component={IgnorerMouvement}
      />
      <Stack.Screen
        name="affecter-mouvement"
        component={AffecterMouvement}
      />
    </Stack.Navigator>
  );
}
