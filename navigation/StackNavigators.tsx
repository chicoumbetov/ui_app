/**
 * Stack navigators
 *
 * @author: Shynggys UMBETOV
 */

import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';

/**
 * Contenu navigation
 * 1. types - line 15
 * 2. imports section - line 33
 * 3. stack section - line 100
 * */

// types
import {
  AjoutBienParamList,
} from '../types';

/**
 * imports section sections:
 * 1. Tableau de bord stack imports
 * 2. Mon Compte stack imports
 * 3. Mes Biens stack imports
 * 4. Ma Tresorerie stack imports
 * 5. Mon Assistant stack imports
 * 6. Notifications stack imports
 * 7. Faq stack imports
 * 8. Contact stack imports
 * 9. Mes charges stack imports
 * 10. Ajout Bien stack imports
 * */

/** import Tableau de bord Section screens */
import TableauDeBord from '../screens/TabTableauDeBordScreen/TableauDeBord';

/** import Mon Compte screens */
import MonComptePage1 from '../screens/MonCompteScreen/Components/MonComptePage1';
import ModifierInfo1 from '../screens/MonCompteScreen/Components/ModifierInfo1';
import ModifierInfo2 from '../screens/MonCompteScreen/Components/ModifierInfo2';
import ModifierInfo3 from '../screens/MonCompteScreen/Components/ModifierInfo3';
import CameraDom from '../screens/MonCompteScreen/Components/Camera';

/** import Mes Biens screens */
import MesBiens from '../screens/TabMesBiensScreen/Components/MesBiens';
import DetailsBien from '../screens/TabMesBiensScreen/Components/DetailsDuBien';
import MonBudget from '../screens/TabMesBiensScreen/Components/MonBudget';
import ParametrerAjoutRevenu from '../screens/TabMesBiensScreen/Components/ParametrerAjoutRevenu';
import ParametrerAjoutCharges from '../screens/TabMesBiensScreen/Components/ParametrerAjoutCharges';
import PartagerBien from '../screens/TabMesBiensScreen/Components/PartagerBien';
import ModifierCharacteristiques from '../screens/TabMesBiensScreen/Components/ModifierCharacteristiques';

/** import Mes Tresorerie screens */
import MaTresorerie from '../screens/TabMaTresorerieScreen/Components/Tresorerie';
import TresoMouvement_page1 from '../screens/TabMaTresorerieScreen/Components/TresoMouvement/TresoMouvement_page1';
import TresoMouvementPage2 from '../screens/TabMaTresorerieScreen/Components/TresoMouvement/TresoMouvement_page2';
import IgnorerMouvement from '../screens/TabMaTresorerieScreen/Components/TresoMouvement/IgnorerMouvement';
import AjoutCompte from '../screens/TabMaTresorerieScreen/Components/AjoutCompte/AjoutCompte';

/** import Mes Charges screens */
import AjoutBienScreen from '../screens/AjoutBienScreen/AjoutBienScreen';
import MesCharges1 from '../screens/MesChargesScreen/MesCharges1';
import MesCharges2 from '../screens/MesChargesScreen/Components/MesCharges2';
import MesCharges3 from '../screens/MesChargesScreen/Components/MesCharges3';

/**
 * Stack sections:
 * 1. Tableau de bord stack
 * 2. Mon Compte stack
 * 3. Mes Biens stack
 * 4. Ma Tresorerie stack
 * 5. Mon Assistant stack
 * 6. Notifications stack
 * 7. Faq stack
 * 8. Contact stack
 * 9. Mes charges stack
 * 10. Ajout Bien stack    //  NOT USED in Drawer Navigator because doesn't work that way
 * */

/** Mon Compte Section */

/** Mes Biens Section */

/** Ma Tresorerie Section */

// NOT USED in Drawer Navigator because doesn't work that way
/** Ajout Bien Section */
const TabAjoutBienStack = createStackNavigator<AjoutBienParamList>();

export function TabAjoutNavigator() {
  const { Navigator, Screen } = TabAjoutBienStack;
  const navigation = useNavigation();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        name="AjoutBienScreen"
        component={AjoutBienScreen}
      />
      <Screen
        name="CameraDom"
        component={CameraDom}
      />
    </Navigator>
  );
}
