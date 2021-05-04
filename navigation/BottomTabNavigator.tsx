import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import { BottomNavigationTab } from '@ui-kitten/components';

import { SafeAreaView } from 'react-native';
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
import { BottomNavigation } from './BottomNavigation';

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

  <SafeAreaView>
    <BottomNavigation
      style={{ marginHorizontal: 2 }}
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
      <BottomNavigationTab title="Mes Biens" icon={HomeIcon} />
      <BottomNavigationTab title="Mes Charges" icon={TrendingUpIcon} />
      <BottomNavigationTab title="Tableau de bord" icon={GridIcon} />
      <BottomNavigationTab title="Mon Assistant" icon={FileIcon} />
      <BottomNavigationTab title="Notifications" icon={BellIcon} />
    </BottomNavigation>
  </SafeAreaView>
);

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="TableauDeBordBottom"
      tabBar={
        (props) => <BottomTabBar {...props} style={{ margin: 100 }} />
      }
    >
      <BottomTab.Screen
        name="MesBiensBottom"
        component={TabMesBiensNavigator}
      />
      <BottomTab.Screen
        name="MesChargesBottom"
        component={TabMesChargesNavigator}
      />
      <BottomTab.Screen
        name="TableauDeBordBottom"
        component={TabTableauDeBordNavigator}
      />
      <BottomTab.Screen
        name="MonAssistantBottom"
        component={TabMonAssistantNavigator}
      />
      <BottomTab.Screen
        name="NotificationsBottom"
        component={TabNotificationsNavigator}
      />

    </BottomTab.Navigator>
  );
}
