// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import {
  TabMesBiensParamList,
  TabMesChargesParamList,
  TabMonAssistantParamList,
  TabNotificationsParamList,
  TabTableauDeBordParamList,
} from '../types';

import HeaderLeftOpenDrawerNavigation from './HeaderLeftOpenDrawerNavigation';
import HeaderRightOpenDrawerNavigation from './HeaderRightOpenDrawerNavigation';

import TabTableauDeBordScreen from '../screens/TabTableauDeBordScreen/TabTableauDeBordScreen';
import TabMesBiensScreen from '../screens/TabMesBiensScreen/TabMesBiensScreen';
import TabMonAssistantScreen from '../screens/MonAssistantScreen/TabMonAssistantScreen';
import TabNotificationsScreen from '../screens/TabNotificationsScreen/TabNotificationsScreen';
import TabMesChargeScreen from '../screens/TabMesChargesScreen/TabMesChargeScreen';
import DetailsBien from '../screens/TabMesBiensScreen/Components/DetailsDuBien';
import MonBudget from '../screens/TabMesBiensScreen/Components/MonBudget';
import ParametrerAjoutRevenu from '../screens/TabMesBiensScreen/Components/ParametrerAjoutRevenu';
import ParametrerAjoutCharges from '../screens/TabMesBiensScreen/Components/ParametrerAjoutCharges';
import PartagerBien from '../screens/TabMesBiensScreen/Components/PartagerBien';
import ModifierCharacteristiques from '../screens/TabMesBiensScreen/Components/ModifierCharacteristiques';

const TabMesBiensStack = createStackNavigator<TabMesBiensParamList>();

export function TabMesBiensNavigator({ navigation }) {
  return (
    <TabMesBiensStack.Navigator headerMode="screen">
      <TabMesBiensStack.Screen
        name="TabMesBiensScreen"
        component={TabMesBiensScreen}
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
        name="TabTableauDeBordScreen"
        component={TabTableauDeBordScreen}
        options={{
          headerTitle: 'TableauDeBord',
          headerShown: false,
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
        name="TabMonAssistantScreen"
        component={TabMonAssistantScreen}
        options={{
          headerTitle: 'Mon Assistant',
          headerShown: false,
        }}
      />
    </TabMonAssistantStack.Navigator>
  );
}

const TabNotificationsStack = createStackNavigator<TabNotificationsParamList>();

{ /**
 *      Notification from Bottom Tab Nav
 */ }
export function TabNotificationsNavigator({ navigation }) {
  return (
    <TabNotificationsStack.Navigator>
      <TabNotificationsStack.Screen
        name="TabNotificationsScreen"
        component={TabNotificationsScreen}
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
          headerRight: () => (
            <HeaderRightOpenDrawerNavigation navigation={navigation} />
          ),
          headerLeft: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
        }}
      />
    </TabNotificationsStack.Navigator>
  );
}
