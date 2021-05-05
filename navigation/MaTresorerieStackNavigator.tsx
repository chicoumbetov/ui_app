import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { TabMaTresorerieParamList } from '../types';
import MaTresorerie from '../screens/MaTresorerieScreen/Tresorerie';
import TresoMouvement_page1
  from '../screens/MaTresorerieScreen/Components/TresoMouvement/TresoMouvement_page1';
import TresoMouvementPage2
  from '../screens/MaTresorerieScreen/Components/TresoMouvement/TresoMouvement_page2';
import IgnorerMouvement
  from '../screens/MaTresorerieScreen/Components/TresoMouvement/IgnorerMouvement';
import AjoutCompte from '../screens/MaTresorerieScreen/Components/AjoutCompte/AjoutCompte';

const Stack = createStackNavigator<TabMaTresorerieParamList>();

export default function MaTresorerieStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ma-tresorerie"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="ma-tresorerie"
        component={MaTresorerie}
      />
      <Stack.Screen
        name="TresoMouvement_page1"
        component={TresoMouvement_page1}
      />
      <Stack.Screen
        name="TresoMouvement_page2"
        component={TresoMouvementPage2}
      />
      <Stack.Screen
        name="IgnorerMouvement"
        component={IgnorerMouvement}
      />
      <Stack.Screen
        name="AjoutCompte"
        component={AjoutCompte}
      />
    </Stack.Navigator>
  );
}
