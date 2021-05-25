import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { TabMonCompteParamList } from '../types';
import MonCompte from '../screens/MonCompteScreen/MonCompte';
import ModifierInfo1 from '../screens/MonCompteScreen/ModifierInfo1';
import ModifierInfo2 from '../screens/MonCompteScreen/ModifierInfo2';
import ModifierInfo3 from '../screens/MonCompteScreen/ModifierInfo3';
import Verification from '../screens/MonCompteScreen/Verification';

const Stack = createStackNavigator<TabMonCompteParamList>();

export default function MonCompteStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="mon-compte"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="mon-compte"
        component={MonCompte}
      />
      <Stack.Screen
        name="modifier-info-1"
        component={ModifierInfo1}
      />
      <Stack.Screen
        name="verification"
        component={Verification}
      />
      <Stack.Screen
        name="modifier-info-2"
        component={ModifierInfo2}
      />
      <Stack.Screen
        name="modifier-info-3"
        component={ModifierInfo3}
      />
    </Stack.Navigator>
  );
}
