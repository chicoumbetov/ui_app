import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { TabMesBiensParamList } from '../types';
import MesBiens from '../screens/MesBiensScreen/MesBiens';
import DetailsBien from '../screens/MesBiensScreen/DetailsDuBien';
import MonBudget from '../screens/MesBiensScreen/Components/MonBudget';
import ParametrerAjoutRevenu from '../screens/MesBiensScreen/Components/ParametrerAjoutRevenu';
import ParametrerAjoutCharges from '../screens/MesBiensScreen/Components/ParametrerAjoutCharges';
import PartagerBien from '../screens/MesBiensScreen/Components/PartagerBien';
import AjoutBienScreen from '../screens/AjoutBienScreen/AjoutBienScreen';
import MesRapports from '../screens/MesBiensScreen/Components/MesRapports';
import MesRapportBien1 from '../screens/MesBiensScreen/Components/MesRapportBien1';
import MesRapportBien2 from '../screens/MesBiensScreen/Components/MesRapportBien2';

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
        name="detail-bien"
        component={DetailsBien}
      />
      <Stack.Screen
        name="mon-budget"
        component={MonBudget}
      />
      <Stack.Screen
        name="ajout-revenu"
        component={ParametrerAjoutRevenu}
      />
      <Stack.Screen
        name="modifier-revenu"
        component={ParametrerAjoutRevenu}
      />
      <Stack.Screen
        name="ajout-charge"
        component={ParametrerAjoutCharges}
      />
      <Stack.Screen
        name="modifier-charge"
        component={ParametrerAjoutCharges}
      />
      <Stack.Screen
        name="partager-bien"
        component={PartagerBien}
      />
      <Stack.Screen
        name="modifier-characteristique"
        component={AjoutBienScreen}
      />
      <Stack.Screen
        name="ajout-bien-screen"
        component={AjoutBienScreen}
      />
      <Stack.Screen
        name="mes-rapports"
        component={MesRapports}
      />
      <Stack.Screen
        name="mes-rapports-biens1"
        component={MesRapportBien1}
      />
      <Stack.Screen
        name="mes-rapports-biens2"
        component={MesRapportBien2}
      />

    </Stack.Navigator>
  );
}
