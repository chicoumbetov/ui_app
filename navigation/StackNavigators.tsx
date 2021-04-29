// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {
  TabMesBiensParamList,
  TabMesChargesParamList,
  TabMonAssistantParamList,
  TabNotificationsParamList,
  TabTableauDeBordParamList,
} from '../types';

import TabTableauDeBordScreen from '../screens/TabTableauDeBordScreen/TabTableauDeBordScreen';
import TabMesBiensScreen from '../screens/TabMesBiensScreen/TabMesBiensScreen';
import TabMonAssistantScreen from '../screens/MonAssistantScreen/TabMonAssistantScreen';
import TabNotificationsScreen from '../screens/TabNotificationsScreen/TabNotificationsScreen';
import TabMesChargeScreen from '../screens/TabMesChargesScreen/TabMesChargeScreen';
import HeaderLeftOpenDrawerNavigation from './HeaderLeftOpenDrawerNavigation';
import HeaderRightOpenDrawerNavigation from './HeaderRightOpenDrawerNavigation';
import MesBiens from '../screens/TabMesBiensScreen/Components/MesBiens';
import DetailsBien from '../screens/TabMesBiensScreen/Components/DetailsDuBien';
import MonBudget from '../screens/TabMesBiensScreen/Components/MonBudget';
import ParametrerAjoutRevenu from '../screens/TabMesBiensScreen/Components/ParametrerAjoutRevenu';
import ParametrerAjoutCharges from '../screens/TabMesBiensScreen/Components/ParametrerAjoutCharges';
import PartagerBien from '../screens/TabMesBiensScreen/Components/PartagerBien';
import ModifierCharacteristiques from '../screens/TabMesBiensScreen/Components/ModifierCharacteristiques';
import TableauDeBord from '../screens/TabTableauDeBordScreen/Components/TableauDeBord';
import MonAssistant from '../screens/MonAssistantScreen/Components/MonAssistant';
import DeclarationImpots from '../screens/MonAssistantScreen/Components/DeclarationImpots';
import DeclarationImpots2 from '../screens/MonAssistantScreen/Components/DeclarationImpots2';
import PdfScreen from '../screens/MonAssistantScreen/Components/PdfScreen';
import QuittanceLoyer from '../screens/MonAssistantScreen/Components/QuittanceLoyer';
import QuittanceLoyer2 from '../screens/MonAssistantScreen/Components/QuittanceLoyer2';
import Notifications from '../screens/TabNotificationsScreen/Components/Notifications';

const TabMesBiensStack = createStackNavigator<TabMesBiensParamList>();

export function TabMesBiensNavigator({ navigation }) {
  return (
    <TabMesBiensStack.Navigator headerMode="screen">
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

const TabMesChargesStack = createStackNavigator<TabMesChargesParamList>();

export function TabMesChargesNavigator({ navigation }) {
  return (
    <TabMesChargesStack.Navigator>
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

    </TabTableauDeBordStack.Navigator>
  );
}

const TabMonAssistantStack = createStackNavigator<TabMonAssistantParamList>();

export function TabMonAssistantNavigator({ navigation }) {
  return (
    <TabMonAssistantStack.Navigator>
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

const TabNotificationsStack = createStackNavigator<TabNotificationsParamList>();

export function TabNotificationsNavigator({ navigation }) {
  return (
    <TabNotificationsStack.Navigator>
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
