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
import MaTresorerie2 from '../screens/MaTresorerieScreen/Tresorerie2';
import MouvBancaires from '../screens/MaTresorerieScreen/Components/TresoMouvVersion2/MouvBancaires';
import EditMouvemenet from '../screens/MaTresorerieScreen/Components/TresoMouvVersion2/EditMouvemenet';

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
        name="ma-tresorerie-2"
        component={MaTresorerie2}
      />
      <Stack.Screen
        name="mouv-bancaires"
        component={MouvBancaires}
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
        name="ignorer-mouvement"
        component={IgnorerMouvement}
      />
      <Stack.Screen
        name="edit-mouvement"
        component={EditMouvemenet}
      />
      <Stack.Screen
        name="AjoutCompte"
        component={AjoutCompte}
      />
    </Stack.Navigator>
  );
}
