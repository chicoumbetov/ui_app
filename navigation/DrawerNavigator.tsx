/**
 * Drawer navigation
 *
 * @author: Shynggys UMBETOV
 */

import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import MonCompteScreen from '../screens/MonCompteScreen/MonCompteScreen';
import TabMesBiensScreen from '../screens/TabMesBiensScreen/TabMesBiensScreen';
import TabMaTresorerieScreen from '../screens/TabMaTresorerieScreen/TabMaTresorerieScreen';
import TabFaqScreen from '../screens/FaqScreen/TabFaqScreen';
import TabContactScreen from '../screens/TabContactScreen/TabContactScreen';

import BottomTabNavigator from './BottomTabNavigator';

import Icon from '../components/Icon/Icon';
import HeaderRightOpenDrawerNavigation from './HeaderRightOpenDrawerNavigation';
import HeaderLeftOpenDrawerNavigation from './HeaderLeftOpenDrawerNavigation';

import CustomDrawer from './CustomDrawer';
import TabNotificationsScreen from '../screens/TabNotificationsScreen/TabNotificationsScreen';
import TabMonAssistantScreen from '../screens/MonAssistantScreen/TabMonAssistantScreen';
import { StatusBarHeight } from '../components/StatusBarHeight';
import AjoutBienScreen from '../screens/AjoutBienScreen/AjoutBienSceen';

const DrawerNav = createDrawerNavigator();

const DrawerNavigator = ({ navigation }) => (
  <>
    <DrawerNav.Navigator
      drawerType="slide"
      drawerStyle={styles.drawerStyles}
      sceneContainerStyle={{ backgroundColor: 'transparent' }}
      drawerContentOptions={{
        activeBackgroundColor: 'transparent',
        activeTintColor: 'white',
        inactiveTintColor: 'white',
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="TableauDeBord"
    >
      <DrawerNav.Screen
        name="TableauDeBord"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
          drawerIcon: function getIcon({ color }: { color: string }) {
            return <Icon name="grid-outline" {...{ color }} />;
          },
        }}
      />
      <DrawerNav.Screen
        name="Mon Compte"
        component={MonCompteScreen}
        options={{
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
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
          headerShown: false,
          drawerIcon: function getIcon({ color }: { color: string }) {
            return <Icon name="money" {...{ color }} size={30} />;
          },
        }}
      />
      <DrawerNav.Screen
        name="MonAssistant"
        component={TabMonAssistantScreen}
        options={{

          drawerIcon: function getIcon({ color }: { color: string }) {
            return <Icon name="email-outline" {...{ color }} size={30} />;
          },
        }}
      />

      <DrawerNav.Screen
        name="Notifications"
        component={TabNotificationsScreen}
        options={{
          headerShown: true,
          headerTitle: false,
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
      <DrawerNav.Screen
        name="FAQ"
        component={TabFaqScreen}
        options={{
          headerShown: true,
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
          headerShown: false,
          drawerIcon: function getIcon({ color }: { color: string }) {
            return <Icon name="email-outline" {...{ color }} size={30} />;
          },
        }}
      />
      <DrawerNav.Screen
        name="AjoutBienScreen"
        options={{
          headerTitle: false,
          headerShown: true,
          headerLeftContainerStyle: {
            paddingBottom: 5,
          },
          headerRightContainerStyle: {
            marginBottom: 5,
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
        component={AjoutBienScreen}
      />
    </DrawerNav.Navigator>
  </>
);

export default DrawerNavigator;

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    // overflow: 'scroll',
    // borderWidth: 1,
  },
  drawerStyles: {
    flex: 1, width: '70%', marginTop: StatusBarHeight, backgroundColor: 'transparent',
  },
  drawerItem: { alignItems: 'flex-start', marginVertical: 0 },
  drawerLabel: { color: 'white', marginLeft: -16 },
});
