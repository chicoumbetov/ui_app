import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabMonCompteParamList } from '../types';
import ModifierInfo2 from '../screens/MonCompteScreen/ModifierInfo2';
import ModifierInfo3 from '../screens/MonCompteScreen/ModifierInfo3';
import HeaderLogo from '../components/Header/HeaderLogo';

const Stack = createStackNavigator<TabMonCompteParamList>();

export default function FinalSignUpStackNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <Stack.Navigator
      initialRouteName="modifier-info-2"
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
        name="modifier-info-2"
        component={ModifierInfo2}
        initialParams={{
          signUp: true,
        }}
      />
      <Stack.Screen
        name="modifier-info-3"
        component={ModifierInfo3}
      />
    </Stack.Navigator>
  );
}
