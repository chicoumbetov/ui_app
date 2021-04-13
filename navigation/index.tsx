import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, ColorSchemeName } from 'react-native';

import Animated from 'react-native-reanimated';
import { RootStackParamList } from '../types';

import DrawerNavigator from './DrawerNavigator';
import LinkingConfiguration from './LinkingConfiguration';

import NotFoundScreen from '../screens/NotFoundScreen';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (

    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>

  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator({ style }) {
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
