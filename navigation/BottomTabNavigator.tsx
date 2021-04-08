import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { TouchableOpacity } from 'react-native';
import {
  BottomNavigation, BottomNavigationTab,
} from '@ui-kitten/components';
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

// create type Props for props. Do Not leave any props

const BottomTabBar = ({ navigation, state }: any) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
    <BottomNavigationTab title="Tab Mes Biens" />
    <BottomNavigationTab title="Tab Mes Charges" />
    <BottomNavigationTab title="Tableau de Bord" />
    <BottomNavigationTab title="MonAssistant" />
    <BottomNavigationTab title="Tab Notifications" />
  </BottomNavigation>
);

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
    >

      <BottomTab.Screen
        name="Mes Biens"
        component={TabMesBiensScreen}

      />
      <BottomTab.Screen
        name="Mes Charges"
        component={TabMesChargesScreen}
      />
      <BottomTab.Screen
        name="Tableau de bord"
        component={TabTableauDeBordScreen}
      />
      <BottomTab.Screen
        name="Mon Assistant"
        component={TabMonAssistantScreen}
      />
      <BottomTab.Screen
        name="Notifications"
        component={TabNotificationsScreen}
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

function TabMesBiensNavigator({ navigation }) {
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
            <TouchableOpacity onPress={() => { navigation.goBack(); }}>
              <LogoPicture />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => { navigation.openDrawer(); }}>
              <Ionicons name="menu" size={30} />
            </TouchableOpacity>
          ),
        }}
      />
    </TabMesBiensStack.Navigator>
  );
}

const TabMesChargesStack = createStackNavigator<TabMesChargesParamList>();

function TabMesChargesNavigator({ navigation }) {
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
            <TouchableOpacity onPress={() => { navigation.openDrawer(); }}>
              <Ionicons name="menu" size={30} />
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: {
            marginLeft: 10,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.goBack(); }}>
              <LogoPicture />
            </TouchableOpacity>
          ),
        }}
      />
    </TabMesChargesStack.Navigator>
  );
}

const TabTableauDeBordStack = createStackNavigator<TabTableauDeBordParamList>();

function TabTableauDeBordNavigator({ navigation }) {
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
            <TouchableOpacity onPress={() => { navigation.openDrawer(); }}>
              <Ionicons name="menu" size={30} />
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: {
            marginLeft: 10,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.openDrawer(); }}>
              <LogoPicture />
            </TouchableOpacity>
          ),
        }}
      />
    </TabTableauDeBordStack.Navigator>
  );
}

const TabMonAssistantStack = createStackNavigator<TabMonAssistantParamList>();

function TabMonAssistantNavigator({ navigation }) {
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
            <TouchableOpacity onPress={() => { navigation.openDrawer(); }}>
              <Ionicons name="menu" size={30} />
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: {
            marginLeft: 10,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.goBack(); }}>
              <LogoPicture />
            </TouchableOpacity>
          ),
        }}
      />
    </TabMonAssistantStack.Navigator>
  );
}

const TabNotificationsStack = createStackNavigator<TabNotificationsParamList>();

function TabNotificationsNavigator({ navigation }) {
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
            <TouchableOpacity onPress={() => { navigation.openDrawer(); }}>
              <Ionicons name="menu" size={30} />
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: {
            marginLeft: 10,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.goBack(); }}>
              <LogoPicture />
            </TouchableOpacity>
          ),
        }}
      />
    </TabNotificationsStack.Navigator>
  );
}
