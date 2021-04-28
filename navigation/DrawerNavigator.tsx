/**
 * Drawer navigation
 *
 * @author: Shynggys UMBETOV
 */

import React, { useEffect } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  LogBox, StyleSheet, TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { Layout } from '@ui-kitten/components';
import MonCompteScreen from '../screens/MonCompteScreen/MonCompteScreen';
import TabMesBiensScreen from '../screens/TabMesBiensScreen/TabMesBiensScreen';
import TabMaTresorerieScreen from '../screens/TabMaTresorerieScreen/TabMaTresorerieScreen';
import TabFaqScreen from '../screens/FaqScreen/TabFaqScreen';
import TabContactScreen from '../screens/TabContactScreen/TabContactScreen';

import BottomTabNavigator from './BottomTabNavigator';

import Icon from '../components/Icon/Icon';

import HeaderLeftOpenDrawerNavigation from './HeaderLeftOpenDrawerNavigation';

import CustomDrawer from './CustomDrawer';
import TabNotificationsScreen from '../screens/TabNotificationsScreen/TabNotificationsScreen';
import TabMonAssistantScreen from '../screens/MonAssistantScreen/TabMonAssistantScreen';
import { StatusBarHeight } from '../components/StatusBarHeight';
import AjoutBienScreen from '../screens/AjoutBienScreen/AjoutBienSceen';
import { colors } from '../assets/styles';

const DrawerNav = createDrawerNavigator();

const DrawerNavigator = ({ navigation }) => {
  // to ignore warning
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <Layout style={{ flex: 1 }}>
      <DrawerNav.Navigator
        drawerType="slide"
        drawerStyle={{ ...styles.drawerStyles }}
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
        drawerContentOptions={{
          activeBackgroundColor: 'transparent',
          activeTintColor: colors.green,
          inactiveTintColor: 'white',
          // itemStyle: { height: 10 },
          // labelStyle: { fontSize: 20 },
        }}
        drawerContent={(props) => <CustomDrawer {...props} />}
        initialRouteName="TableauDeBord"
      >
        <DrawerNav.Screen
          name="TableauDeBord"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <DrawerNav.Screen
          name="Mon Compte"
          component={MonCompteScreen}
          options={{
            headerShown: false,
            drawerIcon: function getIcon({ color }: { color: string }) {
              return <Icon name="person-outline" {...{ color }} size={30} />;
            },
          }}
        />
        <DrawerNav.Screen
          name="Mes Biens"
          component={TabMesBiensScreen}
          options={{
            headerShown: false,
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
              return <Icon name="calculator" {...{ color }} size={30} />;
            },
          }}
        />
        <DrawerNav.Screen
          name="MonAssistant"
          component={TabMonAssistantScreen}
          options={{
            headerShown: false,
            drawerIcon: function getIcon({ color }: { color: string }) {
              return <Icon name="email-outline" {...{ color }} size={30} />;
            },
          }}
        />

        { /**
        *      Notification from Drawer Nav
        */}
        <DrawerNav.Screen
          name="Notifications"
          component={TabNotificationsScreen}
          options={{
            headerShown: false,
            headerTitle: false,
            drawerIcon: function getIcon({ color }: { color: string }) {
              return <Icon name="email-outline" {...{ color }} size={30} />;
            },
          }}
        />
        <DrawerNav.Screen
          name="FAQ"
          component={TabFaqScreen}
          options={{
            headerShown: false,
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
              <TouchableOpacity onPress={() => {
                navigation.navigate('TableauDeBord');
              }}
              >
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
    </Layout>
  );
};

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
  },
  drawerStyles: {
    flex: 1, width: '76%', marginTop: StatusBarHeight, backgroundColor: '#fff',
  },
  drawerItem: { alignItems: 'flex-start', marginVertical: 0 },
  drawerLabel: { color: 'white', marginLeft: -16 },
});
