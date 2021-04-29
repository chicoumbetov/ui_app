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

import BottomTabNavigator from './BottomTabNavigator';

import Icon from '../components/Icon/Icon';

import HeaderLeftOpenDrawerNavigation from './HeaderLeftOpenDrawerNavigation';

import CustomDrawer from './CustomDrawer';
import { StatusBarHeight } from '../components/StatusBarHeight';
import AjoutBienScreen from '../screens/AjoutBienScreen/AjoutBienSceen';
import { colors } from '../assets/styles';

import {
  TabAjoutNavigator,
  TabContactNavigator,
  TabFaqNavigator,
  TabMaTresorerieNavigator,
  TabMesBiensNavigator,
  TabMonAssistantNavigator,
  TabMonCompteNavigator,
  TabNotificationsNavigator,
} from './StackNavigators';

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
          name="MonCompteDrawer"
          component={TabMonCompteNavigator}
          options={{
            headerShown: false,
            drawerIcon: function getIcon({ color }: { color: string }) {
              return <Icon name="person-outline" {...{ color }} size={30} />;
            },
          }}
        />
        <DrawerNav.Screen
          name="MesBiensDrawer"
          component={TabMesBiensNavigator}
          options={{
            headerShown: false,
            drawerIcon: function getIcon({ color }: { color: string }) {
              return <Icon name="home-outline" {...{ color }} size={30} />;
            },
          }}
        />
        <DrawerNav.Screen
          name="MaTrésorerieDrawer"
          component={TabMaTresorerieNavigator}
          options={{
            headerShown: false,
            drawerIcon: function getIcon({ color }: { color: string }) {
              return <Icon name="calculator" {...{ color }} size={30} />;
            },
          }}
        />
        <DrawerNav.Screen
          name="MonAssistantDrawer"
          component={TabMonAssistantNavigator}
          options={{
            headerShown: false,
            drawerIcon: function getIcon({ color }: { color: string }) {
              return <Icon name="email-outline" {...{ color }} size={30} />;
            },
          }}
        />

        <DrawerNav.Screen
          name="NotificationsDrawer"
          component={TabNotificationsNavigator}
          options={{
            headerShown: false,
            headerTitle: false,
            drawerIcon: function getIcon({ color }: { color: string }) {
              return <Icon name="email-outline" {...{ color }} size={30} />;
            },
          }}
        />
        <DrawerNav.Screen
          name="FaqDrawer"
          component={TabFaqNavigator}
          options={{
            headerShown: false,
            drawerIcon: function getIcon({ color }: { color: string }) {
              return <Icon name="question" {...{ color }} size={30} />;
            },
          }}
        />
        <DrawerNav.Screen
          name="ContactDrawer"
          component={TabContactNavigator}
          options={{
            headerShown: false,
            drawerIcon: function getIcon({ color }: { color: string }) {
              return <Icon name="email-outline" {...{ color }} size={30} />;
            },
          }}
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
