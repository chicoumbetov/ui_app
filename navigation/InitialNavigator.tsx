/**
 *
 *
 * @author:
 */

import { createStackNavigator } from '@react-navigation/stack';
import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import * as React from 'react';
import { RootStackParamList } from '../types';
import DrawerNavigator from './DrawerNavigator';
import NotFoundScreen from '../screens/NotFoundScreen';

const Stack = createStackNavigator<RootStackParamList>();

function InitialNavigator() {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Root"
          component={DrawerNavigator}
        />
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      </Stack.Navigator>
    </Animated.View>
  );
}

export default InitialNavigator;

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    // overflow: 'scroll',
    // borderWidth: 1,
  },
  drawerStyles: { flex: 1, width: '50%', backgroundColor: 'transparent' },
  drawerItem: { alignItems: 'flex-start', marginVertical: 0 },
  drawerLabel: { color: 'white', marginLeft: -16 },
});
