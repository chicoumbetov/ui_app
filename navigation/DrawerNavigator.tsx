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
import { Layout } from '@ui-kitten/components';
import { StatusBarHeight } from '../components/StatusBarHeight';
import { colors } from '../assets/styles';

import BottomTabNavigator from './BottomTabNavigator';
import CustomDrawer from './CustomDrawer';

import Icon from '../components/Icon/Icon';

import {
  TabContactNavigator,
  TabFaqNavigator,
  TabMaTresorerieNavigator,
  TabMesBiensNavigator,
  TabMonAssistantNavigator,
  TabMonCompteNavigator,
  TabNotificationsNavigator,
} from './StackNavigators';

const DrawerNav = createDrawerNavigator();

const DrawerNavigator = () => {
  const { Navigator, Screen } = DrawerNav;

  return (
    <Layout style={{ flex: 1 }}>
      <Navigator
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
        initialRouteName="TableauDeBordDrawer"
      >
        <Screen
          name="TableauDeBordDrawer"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name="MonCompteDrawer"
          component={TabMonCompteNavigator}
          options={{
            headerShown: false,
            drawerIcon: function getIcon({ color }: { color: string }) {
              return <Icon name="person-outline" {...{ color }} size={30} />;
            },
          }}
        />
        <Screen
          name="MesBiensDrawer"
          component={TabMesBiensNavigator}
          options={{
            headerShown: false,
            drawerIcon: function getIcon({ color }: { color: string }) {
              return <Icon name="home-outline" {...{ color }} size={30} />;
            },
          }}
        />
        <Screen
          name="MaTrésorerieDrawer"
          component={TabMaTresorerieNavigator}
          options={{
            headerShown: false,
            drawerIcon: function getIcon({ color }: { color: string }) {
              return <Icon name="calculator" {...{ color }} size={30} />;
            },
          }}
        />
        <Screen
          name="MonAssistantDrawer"
          component={TabMonAssistantNavigator}
          options={{
            headerShown: false,
            drawerIcon: function getIcon({ color }: { color: string }) {
              return <Icon name="email-outline" {...{ color }} size={30} />;
            },
          }}
        />

        <Screen
          name="NotificationsDrawer"
          component={TabNotificationsNavigator}
          options={{
            headerShown: false,
            drawerIcon: function getIcon({ color }: { color: string }) {
              return <Icon name="email-outline" {...{ color }} size={30} />;
            },
          }}
        />
        <Screen
          name="FaqDrawer"
          component={TabFaqNavigator}
          options={{
            headerShown: false,
            drawerIcon: function getIcon({ color }: { color: string }) {
              return <Icon name="question" {...{ color }} size={30} />;
            },
          }}
        />
        <Screen
          name="ContactDrawer"
          component={TabContactNavigator}
          options={{
            headerShown: false,
            drawerIcon: function getIcon({ color }: { color: string }) {
              return <Icon name="email-outline" {...{ color }} size={30} />;
            },
          }}
        />

      </Navigator>
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
