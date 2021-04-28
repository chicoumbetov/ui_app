import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';

import {
  TabMesBiensNavigator,
  TabMesChargesNavigator,
  TabMonAssistantNavigator,
  TabNotificationsNavigator,
  TabTableauDeBordNavigator,
} from './StackNavigators';

import { BottomTabParamList } from '../types';

import Icon from '../components/Icon';
import { colors } from '../assets/styles';
import TabMonAssistantScreen from '../screens/MonAssistantScreen/TabMonAssistantScreen';
import TabTableauDeBordScreen from '../screens/TabTableauDeBordScreen/TabTableauDeBordScreen';
import TabMesBiensScreen from '../screens/TabMesBiensScreen/TabMesBiensScreen';
import TabNotificationsScreen from '../screens/TabNotificationsScreen/TabNotificationsScreen';
import TabMesChargeScreen from '../screens/TabMesChargesScreen/TabMesChargeScreen';

const HomeIcon = () => (
  <Icon name="home-outline" size={30} color={colors.green} />
);

const TrendingUpIcon = () => (
  <Icon name="trending-up-outline" size={30} color={colors.green} />
);

const GridIcon = () => (
  <Icon name="grid-outline" size={30} color={colors.green} />
);

const FileIcon = () => (
  <Icon name="file-text-outline1" size={30} color={colors.green} />
);

const BellIcon = () => (
  <Icon name="bell-outline" size={30} color={colors.green} />
);

// create type Props for props. Do Not leave any props

const BottomTabBar = ({ navigation, state }: any) => (

  <BottomNavigation
    style={{ marginHorizontal: 2 }}
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
    <BottomNavigationTab title="Mes Biens" icon={HomeIcon} />
    <BottomNavigationTab title="Mes Charges" icon={TrendingUpIcon} />
    <BottomNavigationTab title="TableauDeBord" icon={GridIcon} />
    <BottomNavigationTab title="Mon Assistant" icon={FileIcon} />
    <BottomNavigationTab title="Notifications" icon={BellIcon} />
  </BottomNavigation>
);

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="TableauDeBord"
      tabBar={
        (props) => <BottomTabBar {...props} style={{ margin: 100 }} />
      }
    >
      <BottomTab.Screen
        name="MesBiens"
        component={TabMesBiensScreen}
      />
      <BottomTab.Screen
        name="MesCharges"
        component={TabMesChargeScreen}
      />
      <BottomTab.Screen
        name="TableauDeBord"
        component={TabTableauDeBordScreen}
      />
      <BottomTab.Screen
        name="MonAssistant"
        component={TabMonAssistantScreen}
      />
      <BottomTab.Screen
        name="Notifications"
        component={TabNotificationsScreen}
      />

    </BottomTab.Navigator>
  );
}
