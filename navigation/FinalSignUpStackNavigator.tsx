import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabMonCompteParamList } from '../types';
import ModifierInfo2 from '../screens/MonCompteScreen/ModifierInfo2';
import ModifierInfo3 from '../screens/MonCompteScreen/ModifierInfo3';
import HeaderBack from '../components/Header/HeaderBack';
import HeaderBurger from '../components/Header/HeaderBurger';
import HeaderLogo from '../components/Header/HeaderLogo';

const Stack = createStackNavigator<TabMonCompteParamList>();

export default function FinalSignUpStackNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <Stack.Navigator
      initialRouteName="ModifierInfo2"
      screenOptions={{
        title: '',
        headerShown: true,
        headerLeft: () => (
          <></>
        ),
        headerRight: () => (
          <HeaderLogo withAction={false} />
        ),
        headerStyle: {
          height: 70 + insets.top,
        },
      }}
    >
      <Stack.Screen
        name="ModifierInfo2"
        component={ModifierInfo2}
        initialParams={{
          signUp: true,
        }}
      />
      <Stack.Screen
        name="ModifierInfo3"
        component={ModifierInfo3}
      />
    </Stack.Navigator>
  );
}
