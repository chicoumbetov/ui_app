import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { TabMesChargesParamList } from '../types';
import MesCharges1 from '../screens/MesChargesScreen/Components/MesCharges1';
import MesCharges2 from '../screens/MesChargesScreen/Components/MesCharges2';
import MesCharges3 from '../screens/MesChargesScreen/Components/MesCharges3';

const Stack = createStackNavigator<TabMesChargesParamList>();

export default function MesChargesStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="mes-charges"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="mes-charges"
        component={MesCharges1}
      />
      <Stack.Screen
        name="MesCharges2"
        component={MesCharges2}
      />
      <Stack.Screen
        name="MesCharges3"
        component={MesCharges3}
      />

    </Stack.Navigator>
  );
}
