/**
 *
 *
 * @author:
 */

import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { RootStackParamList } from '../types';
import MainDrawerNavigator from './MainDrawerNavigator';
import NotFoundScreen from '../screens/NotFoundScreen';

const Stack = createStackNavigator<RootStackParamList>();

function InitialNavigator() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Root"
          component={MainDrawerNavigator}
        />
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      </Stack.Navigator>
  );
}

export default InitialNavigator;
