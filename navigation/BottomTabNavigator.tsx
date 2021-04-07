import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabMesBiensScreen from '../screens/TabMesBiensScreen';
import TabMesChargesScreen from '../screens/TabMesChargeScreen';
import TabTableauDeBordScreen from '../screens/TabTableauDeBordScreen';
import TabMonAssistantScreen from '../screens/TabMonAssistantScreen';
import TabNotificationsScreen from '../screens/TabNotificationsScreen';

import {
  BottomTabParamList,
  TabMesBiensParamList,
  TabMesChargesParamList,
  TabMonAssistantParamList,
  TabNotificationsParamList,
  TabTableauDeBordParamList,
} from '../types';
import LogoPicture from '../components/LogoPicture/LogoPicture';
import Icon from '../components/Icon';
import {TouchableOpacity} from "react-native";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Tableau de Bord"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Mes Biens"
        component={TabMesBiensNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon name="home-outline" {...{ color }} size={30} />,
        }}
      />
      <BottomTab.Screen
        name="Mes Charges"
        component={TabMesChargesNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon name="trending-up-outline" {...{ color }} size={30} />,
        }}
      />
      <BottomTab.Screen
        name="Tableau de Bord"
        component={TabTableauDeBordNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon name="grid-outline" {...{ color }} size={30} />,
        }}
      />
      <BottomTab.Screen
        name="Mon Assistant"
        component={TabMonAssistantNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon name="file-text-outline" {...{ color }} size={30} />,
        }}
      />
      <BottomTab.Screen
        name="Notifications"
        component={TabNotificationsNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon name="bell-outline" {...{ color }} size={30} />,
        }}
      />

    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
/*
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
    return <Ionicons size={30} style={{marginBottom: -3}} {...props} />;
}
*/

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabMesBiensStack = createStackNavigator<TabMesBiensParamList>();

function TabMesBiensNavigator({navigation}) {
  return (
    <TabMesBiensStack.Navigator>
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
              <TouchableOpacity onPress={() => { navigation.goBack() }}>
                  <LogoPicture />
              </TouchableOpacity>
          ),
          headerRight: () => (
              <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
                  <Ionicons name="menu" size={30} />
              </TouchableOpacity>
          ),
        }}
      />
    </TabMesBiensStack.Navigator>
  );
}

const TabMesChargesStack = createStackNavigator<TabMesChargesParamList>();

function TabMesChargesNavigator({navigation}) {
  return (
    <TabMesChargesStack.Navigator>
      <TabMesChargesStack.Screen
        name="TabMesChargesScreen"
        component={TabMesChargesScreen}
        options={{
          headerTitle: 'Tab Mes Charges',
          headerRightContainerStyle: {
            marginRight: 10,
          },
          headerRight: () => (
              <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
                  <Ionicons name="menu" size={30} />
              </TouchableOpacity>
          ),
          headerLeftContainerStyle: {
            marginLeft: 10,
          },
          headerLeft: () => (
              <TouchableOpacity onPress={() => { navigation.goBack() }}>
                  <LogoPicture />
              </TouchableOpacity>
          ),
        }}
      />
    </TabMesChargesStack.Navigator>
  );
}

const TabTableauDeBordStack = createStackNavigator<TabTableauDeBordParamList>();

function TabTableauDeBordNavigator({navigation}) {
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
              <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
                  <Ionicons name="menu" size={30} />
              </TouchableOpacity>
          ),
          headerLeftContainerStyle: {
            marginLeft: 10,
          },
          headerLeft: () => (
              <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
                  <LogoPicture />
              </TouchableOpacity>
          ),
        }}
      />
    </TabTableauDeBordStack.Navigator>
  );
}

const TabMonAssistantStack = createStackNavigator<TabMonAssistantParamList>();

function TabMonAssistantNavigator({navigation}) {
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
              <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
                  <Ionicons name="menu" size={30} />
              </TouchableOpacity>
          ),
          headerLeftContainerStyle: {
            marginLeft: 10,
          },
          headerLeft: () => (
              <TouchableOpacity onPress={() => { navigation.goBack() }}>
                  <LogoPicture />
              </TouchableOpacity>
          ),
        }}
      />
    </TabMonAssistantStack.Navigator>
  );
}

const TabNotificationsStack = createStackNavigator<TabNotificationsParamList>();

function TabNotificationsNavigator({navigation}) {
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
              <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
                  <Ionicons name="menu" size={30} />
              </TouchableOpacity>
          ),
          headerLeftContainerStyle: {
            marginLeft: 10,
          },
          headerLeft: () => (
              <TouchableOpacity onPress={() => { navigation.goBack() }}>
                  <LogoPicture />
              </TouchableOpacity>
          ),
        }}
      />
    </TabNotificationsStack.Navigator>
  );
}
