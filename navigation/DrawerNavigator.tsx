import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import MonCompteScreen from '../screens/MonCompteScreen';
import TabMesBiensScreen from '../screens/TabMesBiensScreen';
import TabMaTresorerieScreen from '../screens/TabMaTresorerieScreen';
import TabFaqScreen from '../screens/TabFaqScreen';
import TabContactScreen from '../screens/TabContactScreen';

import BottomTabNavigator from './BottomTabNavigator';

import Icon from '../components/Icon/Icon';
import HeaderRightOpenDrawerNavigation from './HeaderRightOpenDrawerNavigation';
import HeaderLeftOpenDrawerNavigation from './HeaderLeftOpenDrawerNavigation';

import DrawerContent from './CustomDrawer';

const DrawerNav = createDrawerNavigator();

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
/*
write once here and use it downwards several times

function TabBarIcon(props: { name: React.ComponentProps<typeof Icon>['name']; color: string }) {
    return <Icon name="grid-outline" {...{ color }} size={30} />;
}
*/

const DrawerNavigator = ({ navigation }) => (
  <>
    <DrawerNav.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <DrawerNav.Screen
        name="Tableau de bord"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
          headerLeftContainerStyle: {
            marginLeft: 20,
          },
          headerRightContainerStyle: {
            marginRight: 20,
          },
          headerLeft: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
          headerRight: () => (
            <HeaderRightOpenDrawerNavigation navigation={navigation} />
          ),
          drawerIcon: function getIcon({ color }: { color: string }) {
            return <Icon name="grid-outline" {...{ color }} size={30} />;
          },

        }}
      />
      <DrawerNav.Screen
        name="Mon Compte"
        component={MonCompteScreen}
        options={{
          headerShown: true,
          headerLeftContainerStyle: {
            marginLeft: 20,
          },
          headerRightContainerStyle: {
            marginRight: 20,
          },
          headerLeft: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
          headerRight: () => (
            <HeaderRightOpenDrawerNavigation navigation={navigation} />
          ),
          drawerIcon: function getIcon({ color }: { color: string }) {
            return <Icon name="person-outline" {...{ color }} size={30} />;
          },
        }}
      />
      <DrawerNav.Screen
        name="Mes Biens"
        component={TabMesBiensScreen}
        options={{
          headerShown: true,
          headerLeftContainerStyle: {
            marginLeft: 20,
          },
          headerRightContainerStyle: {
            marginRight: 20,
          },
          headerLeft: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
          headerRight: () => (
            <HeaderRightOpenDrawerNavigation navigation={navigation} />
          ),
          drawerIcon: function getIcon({ color }: { color: string }) {
            return <Icon name="home-outline" {...{ color }} size={30} />;
          },
        }}
      />
      <DrawerNav.Screen
        name="Ma Trésorerie"
        component={TabMaTresorerieScreen}
        options={{
          headerShown: true,
          headerLeftContainerStyle: {
            marginLeft: 20,
          },
          headerRightContainerStyle: {
            marginRight: 20,
          },
          headerLeft: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
          headerRight: () => (
            <HeaderRightOpenDrawerNavigation navigation={navigation} />
          ),
          drawerIcon: function getIcon({ color }: { color: string }) {
            return <Icon name="money" {...{ color }} size={30} />;
          },
        }}
      />
      <DrawerNav.Screen
        name="FAQ"
        component={TabFaqScreen}
        options={{
          headerShown: true,
          headerLeftContainerStyle: {
            marginLeft: 20,
          },
          headerRightContainerStyle: {
            marginRight: 20,
          },
          headerLeft: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
          headerRight: () => (
            <HeaderRightOpenDrawerNavigation navigation={navigation} />
          ),
          drawerIcon: function getIcon({ color }: { color: string }) {
            return <Icon name="question" {...{ color }} size={30} />;
          },
        }}
      />
      <DrawerNav.Screen
        name="Contact"
        component={TabContactScreen}
        options={{
          headerShown: true,
          headerLeftContainerStyle: {
            marginLeft: 20,
          },
          headerRightContainerStyle: {
            marginRight: 20,
          },
          headerLeft: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
          headerRight: () => (
            <HeaderRightOpenDrawerNavigation navigation={navigation} />
          ),
          drawerIcon: function getIcon({ color }: { color: string }) {
            return <Icon name="email-outline" {...{ color }} size={30} />;
          },
        }}
      />
    </DrawerNav.Navigator>
  </>
);

export default DrawerNavigator;
