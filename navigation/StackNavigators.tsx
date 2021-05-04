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
// Header components Logo and Burger icons
import HeaderLeftOpenDrawerNavigation from './HeaderLeftOpenDrawerNavigation';
import HeaderRightOpenDrawerNavigation from './HeaderRightOpenDrawerNavigation';

/**
 * Contenu navigation
 * 1. types - line 15
 * 2. imports section - line 33
 * 3. stack section - line 100
 * */

// types
import {
  AjoutBienParamList,
  TabContactParamList,
  TabFaqParamList,
  TabMaTresorerieParamList,
  TabMesBiensParamList,
  TabMesChargesParamList,
  TabMonAssistantParamList, TabMonCompteParamList,
  TabNotificationsParamList,
  TabTableauDeBordParamList,
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
import TableauDeBord from '../screens/TabTableauDeBordScreen/Components/TableauDeBord';

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

/** import Mon Assistant screens */
import MonAssistant from '../screens/MonAssistantScreen/Components/MonAssistant';
import DeclarationImpots from '../screens/MonAssistantScreen/Components/DeclarationImpots';
import DeclarationImpots2 from '../screens/MonAssistantScreen/Components/DeclarationImpots2';
import PdfScreen from '../screens/MonAssistantScreen/Components/PdfScreen';
import QuittanceLoyer from '../screens/MonAssistantScreen/Components/QuittanceLoyer';
import QuittanceLoyer2 from '../screens/MonAssistantScreen/Components/QuittanceLoyer2';

/** import Notifications screens */
import Notifications from '../screens/TabNotificationsScreen/Components/Notifications';

/** import Faq screens */
import Faq from '../screens/FaqScreen/Components/Faq';

/** import Contact screens */
import Contact from '../screens/TabContactScreen/Components/Contact';

/** import Mes Charges screens */
import AjoutBienScreen from '../screens/AjoutBienScreen/AjoutBienScreen';
import MesCharges1 from '../screens/TabMesChargesScreen/Components/MesCharges1';
import MesCharges2 from '../screens/TabMesChargesScreen/Components/MesCharges2';
import MesCharges3 from '../screens/TabMesChargesScreen/Components/MesCharges3';

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

// FIX headerTitle props errors

/** Tableau de bord Section */
const TabTableauDeBordStack = createStackNavigator<TabTableauDeBordParamList>();

export function TabTableauDeBordNavigator() {
  const navigation = useNavigation();
  const { Navigator, Screen } = TabTableauDeBordStack;

  return (
    <Navigator
      screenOptions={{
        headerTitle: false,
        headerShown: true,
        headerStyle: {
          height: 120,
        },
        headerRightContainerStyle: {
          marginRight: 18,
        },
        headerLeftContainerStyle: {
          marginLeft: 13,
        },
      }}
    >
      <Screen
        name="TableauDeBord"
        component={TableauDeBord}
        options={{
          headerLeft: () => (
            <HeaderLeftOpenDrawerNavigation />
          ),
          headerRight: () => (
            <HeaderRightOpenDrawerNavigation />
          ),
        }}
      />
      <Screen
        name="AjoutBienScreen"
        component={AjoutBienScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('TableauDeBord'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation />
          ),
        }}
      />
      <Screen
        name="CameraDom"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('AjoutBienScreen'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
        }}
        component={CameraDom}
      />

    </Navigator>
  );
}

/** Mon Compte Section */
const TabMonCompteStack = createStackNavigator<TabMonCompteParamList>();

export function TabMonCompteNavigator() {
  const navigation = useNavigation();
  const { Navigator, Screen } = TabMonCompteStack;

  return (
    <Navigator
      initialRouteName="MonCompte"
      screenOptions={{
        headerTitle: false,
        headerStyle: {
          height: 120,
        },
        headerRightContainerStyle: {
          marginRight: 18,
        },
        headerLeftContainerStyle: {
          marginLeft: 13,
        },
      }}
    >
      <Screen
        name="MonCompte"
        component={MonComptePage1}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            >
              <AntDesign name="arrowleft" size={31} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>

          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation />
          ),
        }}
      />
      <Screen
        name="ModifierInfo1"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('MonCompte'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation />
          ),
        }}
        component={ModifierInfo1}
      />
      <Screen
        name="ModifierInfo2"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('ModifierInfo1'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>

          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation />
          ),
        }}
        component={ModifierInfo2}
      />
      <Screen
        name="ModifierInfo3"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('ModifierInfo2'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>

          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation />
          ),
        }}
        component={ModifierInfo3}
      />
      <Screen
        name="CameraDom"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('ModifierInfo3'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>

          ),
        }}
        component={CameraDom}
      />

    </Navigator>
  );
}

/** Mes Biens Section */
const TabMesBiensStack = createStackNavigator<TabMesBiensParamList>();

export function TabMesBiensNavigator() {
  const { Navigator, Screen } = TabMesBiensStack;
  const navigation = useNavigation();
  return (
    <Navigator
      headerMode="screen"
      initialRouteName="MesBiens"
      screenOptions={{
        headerTitle: false,
        headerShown: true,
        headerStyle: {
          height: 120,
        },
        headerRightContainerStyle: {
          marginRight: 18,
        },
        headerLeftContainerStyle: {
          marginLeft: 13,
        },
      }}
    >
      <Screen
        name="MesBiens"
        component={MesBiens}
        options={{
          headerLeft: () => (
            <HeaderLeftOpenDrawerNavigation />
          ),
          headerRight: () => (
            <HeaderRightOpenDrawerNavigation />
          ),
        }}
      />
      <Screen
        name="DetailsBien"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('MesBiens'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation />
          ),
        }}
        component={DetailsBien}
      />
      <Screen
        name="MonBudget"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('DetailsBien'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation />
          ),
        }}
        component={MonBudget}
      />
      <Screen
        name="ParametrerAjoutRevenu"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('MonBudget'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation />
          ),
        }}
        component={ParametrerAjoutRevenu}
      />
      <Screen
        name="ParametrerAjoutCharges"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('MonBudget'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation />
          ),
        }}
        component={ParametrerAjoutCharges}
      />

      <Screen
        name="PartagerBien"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('DetailsBien'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation />
          ),
        }}
        component={PartagerBien}
      />

      <Screen
        name="ModifierCharacteristiques"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('DetailsBien'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation />
          ),
        }}
        component={ModifierCharacteristiques}
      />

    </Navigator>
  );
}

/** Ma Tresorerie Section */
const TabMaTresorerieStack = createStackNavigator<TabMaTresorerieParamList>();

export function TabMaTresorerieNavigator() {
  const { Navigator, Screen } = TabMaTresorerieStack;
  const navigation = useNavigation();
  return (
    <Navigator
      initialRouteName="MaTresorerie"
      screenOptions={{
        headerTitle: false,
        headerShown: true,
        headerStyle: {
          height: 120,
        },
        headerRightContainerStyle: {
          marginRight: 18,
        },
        headerLeftContainerStyle: {
          marginLeft: 13,
        },
        headerRight: () => (
          <HeaderLeftOpenDrawerNavigation />
        ),
      }}
    >
      <Screen
        name="MaTresorerie"
        component={MaTresorerie}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            >
              <AntDesign name="arrowleft" size={31} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>

          ),
        }}
      />
      <Screen
        name="TresoMouvement_page1"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('MaTresorerie'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
        }}
        component={TresoMouvement_page1}
      />
      <Screen
        name="TresoMouvement_page2"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('TresoMouvement_page1'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
        }}
        component={TresoMouvementPage2}
      />
      <Screen
        name="IgnorerMouvement"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('TresoMouvement_page1'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
        }}
        component={IgnorerMouvement}
      />
      <Screen
        name="AjoutCompte"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('MaTresorerie'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
        }}
        component={AjoutCompte}
      />
    </Navigator>
  );
}

/** Mon Assistant Section */
const TabMonAssistantStack = createStackNavigator<TabMonAssistantParamList>();

export function TabMonAssistantNavigator() {
  const { Navigator, Screen } = TabMonAssistantStack;
  const navigation = useNavigation();
  return (
    <Navigator
      initialRouteName="MonAssistant"
      screenOptions={{
        headerTitle: false,
        headerShown: true,
        headerStyle: {
          height: 120,
        },
        headerRightContainerStyle: {
          marginRight: 18,
        },
        headerLeftContainerStyle: {
          marginLeft: 13,
        },
      }}
    >
      <Screen
        name="MonAssistant"
        component={MonAssistant}
        options={{
          headerLeft: () => (
            <HeaderLeftOpenDrawerNavigation />
          ),
          headerRight: () => (
            <HeaderRightOpenDrawerNavigation />
          ),
        }}
      />
      {/**         Declaration impots screens      */}
      <Screen
        name="DeclarationImpots"
        component={DeclarationImpots}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('MonAssistant'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation />
          ),
        }}
      />
      <Screen
        name="DeclarationImpots2"
        component={DeclarationImpots2}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('DeclarationImpots'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation />
          ),
        }}
      />

      {/**         Pdf component      */}
      <Screen
        name="PdfScreen"
        component={PdfScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('MonAssistant'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation />
          ),
        }}
      />

      {/**         Quittance Loyer screens      */}
      <Screen
        name="QuittanceLoyer"
        component={QuittanceLoyer}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('MonAssistant'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>

          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation />
          ),
        }}
      />
      <Screen
        name="QuittanceLoyer2"
        component={QuittanceLoyer2}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('MonAssistant'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>

          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation />
          ),
        }}
      />
    </Navigator>
  );
}

/** Notifications Section */
const TabNotificationsStack = createStackNavigator<TabNotificationsParamList>();

export function TabNotificationsNavigator() {
  const { Navigator, Screen } = TabNotificationsStack;
  return (
    <Navigator
      initialRouteName="Notifications"
      screenOptions={{
        headerTitle: false,
        headerShown: true,
        headerStyle: {
          height: 120,
        },
        headerRightContainerStyle: {
          marginRight: 18,
        },
        headerLeftContainerStyle: {
          marginLeft: 13,
        },
      }}
    >
      <Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerLeft: () => (
            <HeaderLeftOpenDrawerNavigation />
          ),
          headerRight: () => (
            <HeaderRightOpenDrawerNavigation />
          ),
        }}
      />
    </Navigator>
  );
}

/** FAQ Section */
const TabFaqStack = createStackNavigator<TabFaqParamList>();

export function TabFaqNavigator() {
  const { Navigator, Screen } = TabFaqStack;
  const navigation = useNavigation();
  return (
    <Navigator
      initialRouteName="Faq"
      screenOptions={{
        headerTitle: false,
        headerShown: true,
        headerStyle: {
          height: 120,
        },
        headerRightContainerStyle: {
          marginRight: 18,
        },
        headerLeftContainerStyle: {
          marginLeft: 13,
        },
      }}
    >
      <Screen
        name="Faq"
        component={Faq}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => {
              navigation.dispatch(DrawerActions.toggleDrawer());
            }}
            >
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation />
          ),
        }}
      />
    </Navigator>
  );
}

/** Contact Section */
const TabContactStack = createStackNavigator<TabContactParamList>();

export function TabContactNavigator() {
  const { Navigator, Screen } = TabContactStack;
  const navigation = useNavigation();

  return (
    <Navigator
      initialRouteName="Contact"
      screenOptions={{
        headerTitle: false,
        headerShown: true,
        headerStyle: {
          height: 120,
        },
        headerRightContainerStyle: {
          marginRight: 18,
        },
        headerLeftContainerStyle: {
          marginLeft: 13,
        },
        headerRight: () => (
          <HeaderLeftOpenDrawerNavigation />
        ),
      }}
    >
      <Screen
        name="Contact"
        component={Contact}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => {
              navigation.dispatch(DrawerActions.toggleDrawer());
            }}
            >
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
        }}
      />
    </Navigator>
  );
}

/** Mes Charges Section */
const TabMesChargesStack = createStackNavigator<TabMesChargesParamList>();

export function TabMesChargesNavigator() {
  const { Navigator, Screen } = TabMesChargesStack;
  const navigation = useNavigation();
  return (
    <Navigator
      initialRouteName="TabMesChargesScreen"
      screenOptions={{
        headerTitle: false,
        headerShown: true,
        headerStyle: {
          height: 120,
        },
        headerRightContainerStyle: {
          marginRight: 18,
        },
        headerLeftContainerStyle: {
          marginLeft: 13,
        },
      }}
    >
      <Screen
        name="MesCharges1"
        options={{
          headerLeft: () => (
            <HeaderLeftOpenDrawerNavigation />
          ),
          headerRight: () => (
            <HeaderRightOpenDrawerNavigation />
          ),
        }}
        component={MesCharges1}
      />
      <Screen
        name="MesCharges2"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('MesCharges1'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation />
          ),
        }}
        component={MesCharges2}
      />
      <Screen
        name="MesCharges3"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('MesCharges2'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation />
          ),
        }}
        component={MesCharges3}
      />

    </Navigator>
  );
}

// NOT USED in Drawer Navigator because doesn't work that way
/** Ajout Bien Section */
const TabAjoutBienStack = createStackNavigator<AjoutBienParamList>();

export function TabAjoutNavigator() {
  const { Navigator, Screen } = TabAjoutBienStack;
  const navigation = useNavigation();
  return (
    <Navigator
      screenOptions={{
        headerTitle: false,
        headerShown: false,
      }}
    >
      <Screen
        name="AjoutBienScreen"
        component={AjoutBienScreen}
      />
      <Screen
        name="CameraDom"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('AjoutBienScreen'); }}>
              <AntDesign name="arrowleft" size={30} style={{ backgroundColor: 'transparent', color: '#b5b5b5', marginLeft: 10 }} />
            </TouchableOpacity>
          ),
        }}
        component={CameraDom}
      />
    </Navigator>
  );
}
