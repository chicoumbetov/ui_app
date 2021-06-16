/**
 * Drawer navigation
 *
 * @author: Shynggys UMBETOV
 */

import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigationState } from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';
import CustomDrawer from './CustomDrawer';

import Faq from '../screens/FaqScreen/Faq';
import Contact from '../screens/ContactScreen/Contact';
import HeaderLogo from '../components/Header/HeaderLogo';
import HeaderBurger from '../components/Header/HeaderBurger';
import HeaderBack from '../components/Header/HeaderBack';
import MaTresorerieStackNavigator from './MaTresorerieStackNavigator';
import MonCompteStackNavigator from './MonCompteStackNavigator';
import { getStackInfos } from './Utils';

const Drawer = createDrawerNavigator();

const getTitleFromName = (name?:string) => {
  switch (name) {
    case 'mon-assistant':
      return 'Mon assistant';
    default:
      return '';
  }
};

const MainDrawerNavigator = () => {
  const insets = useSafeAreaInsets();
  const navigationState = useNavigationState((state) => state);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="TableauDeBordDrawer"
      screenOptions={({ navigation }) => {
        const { showBack, currentRouteName } = getStackInfos(navigationState);
        return {
          title: getTitleFromName(currentRouteName),
          headerLeft: () => (
            showBack ? <HeaderBack /> : <HeaderBurger />
          ),
          headerRight: () => (
            <HeaderLogo />
          ),
          headerStyle: {
            height: 70 + insets.top,
          },
          headerShown: true,

        };
      }}
    >
      <Drawer.Screen
        name="bottom-tab-nav"
        component={BottomTabNavigator}
      />
      <Drawer.Screen
        name="mon-compte-nav"
        component={MonCompteStackNavigator}
      />
      <Drawer.Screen
        name="ma-tresorerie-nav"
        component={MaTresorerieStackNavigator}
      />
      <Drawer.Screen
        name="faq"
        component={Faq}
      />
      <Drawer.Screen
        name="contact"
        component={Contact}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;

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
  drawerItem: { alignItems: 'flex-start', marginVertical: 0 },
  drawerLabel: { color: 'white', marginLeft: -16 },
});
