import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { TabMonCompteParamList } from '../types';
import MonComptePage1 from '../screens/MonCompteScreen/Components/MonComptePage1';
import ModifierInfo1 from '../screens/MonCompteScreen/Components/ModifierInfo1';
import ModifierInfo2 from '../screens/MonCompteScreen/Components/ModifierInfo2';
import ModifierInfo3 from '../screens/MonCompteScreen/Components/ModifierInfo3';
import CameraDom from '../screens/MonCompteScreen/Components/Camera';

const Stack = createStackNavigator<TabMonCompteParamList>();

export default function MonCompteStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="mon-compte"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="mon-compte"
        component={MonComptePage1}
      />
      <Stack.Screen
        name="ModifierInfo1"
        component={ModifierInfo1}
      />
      <Stack.Screen
        name="ModifierInfo2"
        component={ModifierInfo2}
      />
      <Stack.Screen
        name="ModifierInfo3"
        component={ModifierInfo3}
      />
      <Stack.Screen
        name="CameraDom"
        component={CameraDom}
      />
    </Stack.Navigator>
  );
}
