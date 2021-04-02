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

import { BottomTabParamList, TabMesBiensParamList, TabMesChargesParamList, TabTableauDeBordParamList, TabNotificationsParamList, TabMonAssistantParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Mes Biens"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Mes Biens"
        component={TabMesBiensNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Mes Charges"
        component={TabMesChargesNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
        <BottomTab.Screen
            name="Tableau de Bord"
            component={TabTableauDeBordNavigator}
            options={{
                tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
            }}
        />
        <BottomTab.Screen
            name="Mon Assistant"
            component={TabMonAssistantNavigator}
            options={{
                tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
            }}
        />
        <BottomTab.Screen
            name="Notifications"
            component={TabNotificationsNavigator}
            options={{
                tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
            }}
        />

    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabMesBiensStack = createStackNavigator<TabMesBiensParamList>();

function TabMesBiensNavigator() {
  return (
    <TabMesBiensStack.Navigator>
      <TabMesBiensStack.Screen
        name="TabMesBiensScreen"
        component={TabMesBiensScreen}
        options={{ headerTitle: 'Tab Mes Biens' }}
      />
    </TabMesBiensStack.Navigator>
  );
}

const TabMesChargesStack = createStackNavigator<TabMesChargesParamList>();

function TabMesChargesNavigator() {
  return (
    <TabMesChargesStack.Navigator>
      <TabMesChargesStack.Screen
        name="TabMesChargesScreen"
        component={TabMesChargesScreen}
        options={{ headerTitle: 'Tab Mes Charges' }}
      />
    </TabMesChargesStack.Navigator>
  );
}

const TabTableauDeBordStack = createStackNavigator<TabTableauDeBordParamList>();

function TabTableauDeBordNavigator() {
    return (
        <TabTableauDeBordStack.Navigator>
            <TabTableauDeBordStack.Screen
                name="TabTableauDeBordScreen"
                component={TabTableauDeBordScreen}
                options={{ headerTitle: 'Tableau De Bord' }}
            />
        </TabTableauDeBordStack.Navigator>
    );
}

const TabMonAssistantStack = createStackNavigator<TabMonAssistantParamList>();

function TabMonAssistantNavigator() {
    return (
        <TabMonAssistantStack.Navigator>
            <TabMonAssistantStack.Screen
                name="TabMonAssistantScreen"
                component={TabMonAssistantScreen}
                options={{ headerTitle: 'Mon Assistant' }}
            />
        </TabMonAssistantStack.Navigator>
    );
}

const TabNotificationsStack = createStackNavigator<TabNotificationsParamList>();

function TabNotificationsNavigator() {
    return (
        <TabNotificationsStack.Navigator>
            <TabNotificationsStack.Screen
                name="TabNotificationsScreen"
                component={TabNotificationsScreen}
                options={{ headerTitle: 'Notifications' }}
            />
        </TabNotificationsStack.Navigator>
    );
}

