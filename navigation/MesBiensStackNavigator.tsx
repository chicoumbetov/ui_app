import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { TabMesBiensParamList } from '../types';
import MesBiens from '../screens/MesBiensScreen/Components/MesBiens';
import DetailsBien from '../screens/MesBiensScreen/Components/DetailsDuBien';
import MonBudget from '../screens/MesBiensScreen/Components/MonBudget';
import ParametrerAjoutRevenu from '../screens/MesBiensScreen/Components/ParametrerAjoutRevenu';
import ParametrerAjoutCharges from '../screens/MesBiensScreen/Components/ParametrerAjoutCharges';
import PartagerBien from '../screens/MesBiensScreen/Components/PartagerBien';
import ModifierCharacteristiques
  from '../screens/MesBiensScreen/Components/ModifierCharacteristiques';

const Stack = createStackNavigator<TabMesBiensParamList>();

export default function MesBiensStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="mes-biens"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="mes-biens"
        component={MesBiens}
      />
      <Stack.Screen
        name="DetailsBien"
        component={DetailsBien}
      />
      <Stack.Screen
        name="MonBudget"
        component={MonBudget}
      />
      <Stack.Screen
        name="ParametrerAjoutRevenu"
        component={ParametrerAjoutRevenu}
      />
      <Stack.Screen
        name="ParametrerAjoutCharges"
        component={ParametrerAjoutCharges}
      />
      <Stack.Screen
        name="PartagerBien"
        component={PartagerBien}
      />
      <Stack.Screen
        name="ModifierCharacteristiques"
        component={ModifierCharacteristiques}
      />
    </Stack.Navigator>
  );
}
