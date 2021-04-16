// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import {
  TabMesBiensParamList,
  TabMesChargesParamList,
  TabMonAssistantParamList,
  TabNotificationsParamList,
  TabTableauDeBordParamList,
} from '../types';
import TabMesBiensScreen from '../screens/TabMesBiensScreen';
import HeaderLeftOpenDrawerNavigation from './HeaderLeftOpenDrawerNavigation';
import HeaderRightOpenDrawerNavigation from './HeaderRightOpenDrawerNavigation';

import TabTableauDeBordScreen from '../screens/TabTableauDeBordScreen';
import TabMonAssistantScreen from '../screens/MonAssistantScreen/TabMonAssistantScreen';
import TabNotificationsScreen from '../screens/TabNotificationsScreen';

import LoginScreen from '../screens/LoginScreen/LoginScreen';
// import TabMesChargesScreen from '../screens/TabMesChargeScreen';

const TabMesBiensStack = createStackNavigator<TabMesBiensParamList>();

export function TabMesBiensNavigator({ navigation }) {
  return (
    <TabMesBiensStack.Navigator headerMode="screen">
      <TabMesBiensStack.Screen
        name="TabMesBiensScreen"
        component={TabMesBiensScreen}
        options={{
          headerTitle: 'Tab Mes Biens',
          headerLeftContainerStyle: {
            marginLeft: 10,
          },
          headerRightContainerStyle: {
            marginRight: 10,
          },
          headerLeft: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
          headerRight: () => (
            <HeaderRightOpenDrawerNavigation navigation={navigation} />
          ),
        }}
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
        component={LoginScreen}
        options={{
          headerTitle: 'Tab Mes Charges',
          headerRightContainerStyle: {
            marginRight: 10,
          },
          headerRight: () => (
            <HeaderRightOpenDrawerNavigation navigation={navigation} />
          ),
          headerLeftContainerStyle: {
            marginLeft: 10,
          },
          headerLeft: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
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
          headerTitle: 'Tableau De Bord',
          headerRightContainerStyle: {
            marginRight: 10,
          },
          headerRight: () => (
            <HeaderRightOpenDrawerNavigation navigation={navigation} />
          ),
          headerLeftContainerStyle: {
            marginLeft: 10,
          },
          headerLeft: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
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
        name="TabMonAssistantScreen"
        component={TabMonAssistantScreen}
        options={{
          headerTitle: 'Mon Assistant',
          headerRightContainerStyle: {
            marginRight: 10,
          },
          headerRight: () => (
            <HeaderRightOpenDrawerNavigation navigation={navigation} />
          ),
          headerLeftContainerStyle: {
            marginLeft: 10,
          },
          headerLeft: () => (
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
        name="TabNotificationsScreen"
        component={TabNotificationsScreen}
        options={{
          headerTitle: 'Notifications',
          headerRightContainerStyle: {
            marginRight: 10,
          },
          headerRight: () => (
            <HeaderRightOpenDrawerNavigation navigation={navigation} />
          ),
          headerLeftContainerStyle: {
            marginLeft: 10,
          },
          headerLeft: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
        }}
      />
    </TabNotificationsStack.Navigator>
  );
}
