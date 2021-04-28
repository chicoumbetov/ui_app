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

import TabTableauDeBordScreen from '../screens/TabTableauDeBordScreen/TabTableauDeBordScreen';
import TabMesBiensScreen from '../screens/TabMesBiensScreen/TabMesBiensScreen';
import TabMonAssistantScreen from '../screens/MonAssistantScreen/TabMonAssistantScreen';
import TabNotificationsScreen from '../screens/TabNotificationsScreen/TabNotificationsScreen';
import TabMesChargeScreen from '../screens/TabMesChargesScreen/TabMesChargeScreen';

const TabMesBiensStack = createStackNavigator<TabMesBiensParamList>();

export function TabMesBiensNavigator({ navigation }) {
  return (
    <TabMesBiensStack.Navigator headerMode="screen">
      <TabMesBiensStack.Screen
        name="TabMesBiensScreen"
        component={TabMesBiensScreen}
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
          headerShown: false,
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
          headerShown: false,
        }}
      />
    </TabNotificationsStack.Navigator>
  );
}
