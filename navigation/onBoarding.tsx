/**
 * Component navigation Section Login
 *
 * @author: David Buch
 */

import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

export default function InitialScreen(): JSX.Element {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
