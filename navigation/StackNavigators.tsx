/**
 * Stack navigators
 *
 * @author: Shynggys UMBETOV
 */

import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
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
import Contact2 from '../screens/TabContactScreen/Components/Contact2';

/** import Mes Charges screens */
import TabMesChargeScreen from '../screens/TabMesChargesScreen/TabMesChargeScreen';
import AjoutBienScreen from '../screens/AjoutBienScreen/AjoutBienSceen';

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

/** Tableau de bord Section */
const TabTableauDeBordStack = createStackNavigator<TabTableauDeBordParamList>();

export function TabTableauDeBordNavigator({ navigation }) {
  return (
    <TabTableauDeBordStack.Navigator>
      <TabTableauDeBordStack.Screen
        name="TableauDeBord"
        component={TableauDeBord}
        options={{
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
          headerLeft: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
          headerRight: () => (
            <HeaderRightOpenDrawerNavigation navigation={navigation} />
          ),
        }}
      />
      <TabTableauDeBordStack.Screen
        name="AjoutBienScreen"
        component={AjoutBienScreen}
        options={{
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('TableauDeBord'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
        }}
      />
      <TabTableauDeBordStack.Screen
        name="CameraDom"
        options={{
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('AjoutBienScreen'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
        }}
        component={CameraDom}
      />

    </TabTableauDeBordStack.Navigator>
  );
}

/** Mon Compte Section */
const TabMonCompteStack = createStackNavigator<TabMonCompteParamList>();

export function TabMonCompteNavigator({ navigation }) {
  return (
    <TabMonCompteStack.Navigator
      initialRouteName="MonCompte"
    >
      <TabMonCompteStack.Screen
        name="MonCompte"
        component={MonComptePage1}
        options={{
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
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
        }}
      />
      <TabMonCompteStack.Screen
        name="ModifierInfo1"
        options={{
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('MonCompte'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
        }}
        component={ModifierInfo1}
      />
      <TabMonCompteStack.Screen
        name="ModifierInfo2"
        options={{
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('ModifierInfo1'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>

          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
        }}
        component={ModifierInfo2}
      />
      <TabMonCompteStack.Screen
        name="ModifierInfo3"
        options={{
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('ModifierInfo2'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>

          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
        }}
        component={ModifierInfo3}
      />
      <TabMonCompteStack.Screen
        name="CameraDom"
        options={{
          headerTitle: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('ModifierInfo3'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>

          ),
        }}
        component={CameraDom}
      />

    </TabMonCompteStack.Navigator>
  );
}

/** Mes Biens Section */
const TabMesBiensStack = createStackNavigator<TabMesBiensParamList>();

export function TabMesBiensNavigator({ navigation }) {
  return (
    <TabMesBiensStack.Navigator
      headerMode="screen"
      initialRouteName="MesBiens"
    >
      <TabMesBiensStack.Screen
        name="MesBiens"
        component={MesBiens}
        options={{
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
          headerLeft: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
          headerRight: () => (
            <HeaderRightOpenDrawerNavigation navigation={navigation} />
          ),
        }}
      />
      <TabMesBiensStack.Screen
        name="DetailsBien"
        options={{
          headerShown: true,
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('MesBiens'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
        }}
        component={DetailsBien}
      />
      <TabMesBiensStack.Screen
        name="MonBudget"
        options={{
          headerShown: true,
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('DetailsBien'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
        }}
        component={MonBudget}
      />
      <TabMesBiensStack.Screen
        name="ParametrerAjoutRevenu"
        options={{
          headerShown: true,
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('MonBudget'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
        }}
        component={ParametrerAjoutRevenu}
      />
      <TabMesBiensStack.Screen
        name="ParametrerAjoutCharges"
        options={{
          headerShown: true,
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('MonBudget'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
        }}
        component={ParametrerAjoutCharges}
      />

      <TabMesBiensStack.Screen
        name="PartagerBien"
        options={{
          headerShown: true,
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('DetailsBien'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
        }}
        component={PartagerBien}
      />

      <TabMesBiensStack.Screen
        name="ModifierCharacteristiques"
        options={{
          headerShown: true,
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('DetailsBien'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
        }}
        component={ModifierCharacteristiques}
      />

    </TabMesBiensStack.Navigator>
  );
}

/** Ma Tresorerie Section */
const TabMaTresorerieStack = createStackNavigator<TabMaTresorerieParamList>();

export function TabMaTresorerieNavigator({ navigation }) {
  return (
    <TabMaTresorerieStack.Navigator
      initialRouteName="MaTresorerie"
    >
      <TabMaTresorerieStack.Screen
        name="MaTresorerie"
        component={MaTresorerie}
        options={{
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
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
        }}
      />
      <TabMaTresorerieStack.Screen
        name="TresoMouvement_page1"
        options={{
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('MaTresorerie'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
        }}
        component={TresoMouvement_page1}
      />
      <TabMaTresorerieStack.Screen
        name="TresoMouvement_page2"
        options={{
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('TresoMouvement_page1'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
        }}
        component={TresoMouvementPage2}
      />
      <TabMaTresorerieStack.Screen
        name="IgnorerMouvement"
        options={{
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('TresoMouvement_page1'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
        }}
        component={IgnorerMouvement}
      />
      <TabMaTresorerieStack.Screen
        name="AjoutCompte"
        options={{
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('MaTresorerie'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
        }}
        component={AjoutCompte}
      />
    </TabMaTresorerieStack.Navigator>
  );
}

/** Mon Assistant Section */
const TabMonAssistantStack = createStackNavigator<TabMonAssistantParamList>();

export function TabMonAssistantNavigator({ navigation }) {
  return (
    <TabMonAssistantStack.Navigator
      initialRouteName="MonAssistant"
    >
      <TabMonAssistantStack.Screen
        name="MonAssistant"
        component={MonAssistant}
        options={{
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
          headerLeft: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
          headerRight: () => (
            <HeaderRightOpenDrawerNavigation navigation={navigation} />
          ),
        }}
      />
      {/**         Declaration impots screens      */}
      <TabMonAssistantStack.Screen
        name="DeclarationImpots"
        component={DeclarationImpots}
        options={{
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('Mon Assistant'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
        }}
      />
      <TabMonAssistantStack.Screen
        name="DeclarationImpots2"
        component={DeclarationImpots2}
        options={{
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('DeclarationImpots'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>

          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
        }}
      />

      {/**         Pdf component      */}
      <TabMonAssistantStack.Screen
        name="PdfScreen"
        component={PdfScreen}
        options={{
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('Mon Assistant'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>

          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
        }}
      />

      {/**         Quittance Loyer screens      */}
      <TabMonAssistantStack.Screen
        name="QuittanceLoyer"
        component={QuittanceLoyer}
        options={{
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('Mon Assistant'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>

          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
        }}
      />
      <TabMonAssistantStack.Screen
        name="QuittanceLoyer2"
        component={QuittanceLoyer2}
        options={{
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('Mon Assistant'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>

          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
        }}
      />
    </TabMonAssistantStack.Navigator>
  );
}

/** Notifications Section */
const TabNotificationsStack = createStackNavigator<TabNotificationsParamList>();

export function TabNotificationsNavigator({ navigation }) {
  return (
    <TabNotificationsStack.Navigator
      initialRouteName="Notifications"
    >
      <TabNotificationsStack.Screen
        name="Notifications"
        component={Notifications}
        options={{
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
          headerLeft: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
          headerRight: () => (
            <HeaderRightOpenDrawerNavigation navigation={navigation} />
          ),
        }}
      />
    </TabNotificationsStack.Navigator>
  );
}

/** FAQ Section */
const TabFaqStack = createStackNavigator<TabFaqParamList>();

export function TabFaqNavigator({ navigation }) {
  return (
    <TabFaqStack.Navigator
      initialRouteName="Faq"
    >
      <TabFaqStack.Screen
        name="Faq"
        component={Faq}
        options={{
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => {
              navigation.dispatch(DrawerActions.toggleDrawer());
            }}
            >
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
        }}
      />
    </TabFaqStack.Navigator>
  );
}

/** Contact Section */
const TabContactStack = createStackNavigator<TabContactParamList>();

export function TabContactNavigator({ navigation }) {
  return (
    <TabContactStack.Navigator
      initialRouteName="Contact"
    >
      <TabContactStack.Screen
        name="Contact"
        component={Contact}
        options={{
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => {
              navigation.dispatch(DrawerActions.toggleDrawer());
            }}
            >
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
        }}
      />
      <TabContactStack.Screen
        name="Contact2"
        options={{
          headerTitle: false,
          headerLeftContainerStyle: {
            paddingBottom: 5,
          },
          headerRightContainerStyle: {
            marginBottom: 5,
          },
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('Contact'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
        }}
        component={Contact2}
      />
    </TabContactStack.Navigator>
  );
}

/** Mes Charges Section */
const TabMesChargesStack = createStackNavigator<TabMesChargesParamList>();

export function TabMesChargesNavigator({ navigation }) {
  return (
    <TabMesChargesStack.Navigator
      initialRouteName="TabMesChargesScreen"
    >
      <TabMesChargesStack.Screen
        name="TabMesChargesScreen"
        component={TabMesChargeScreen}
        options={{
          headerTitle: false,
          headerShown: false,
        }}
      />
    </TabMesChargesStack.Navigator>
  );
}

// NOT USED in Drawer Navigator because doesn't work that way
/** Ajout Bien Section */
const TabAjoutBienStack = createStackNavigator<AjoutBienParamList>();

export function TabAjoutNavigator({ navigation }) {
  return (
    <TabAjoutBienStack.Navigator>
      <TabAjoutBienStack.Screen
        name="AjoutBienScreen"
        component={AjoutBienScreen}
        options={{
          headerTitle: false,
          headerShown: false,
        }}
      />
      <TabAjoutBienStack.Screen
        name="CameraDom"
        options={{
          headerTitle: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('AjoutBienScreen'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>

          ),
        }}
        component={CameraDom}
      />
    </TabAjoutBienStack.Navigator>
  );
}
