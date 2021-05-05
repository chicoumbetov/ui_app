import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import { BottomNavigationTab } from '@ui-kitten/components';

import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BottomTabParamList } from '../types';

import Icon from '../components/Icon';
import { BottomNavigation } from './BottomNavigation';
import MonAssistantStackNavigator from './MonAssistantStackNavigator';
import Notifications from '../screens/NotificationsScreen/Notifications';
import MesBiensStackNavigator from './MesBiensStackNavigator';
import MesChargesStackNavigator from './MesChargesStackNavigator';
import { getStackInfos } from './Utils';
import TableauDeBord from '../screens/TabTableauDeBordScreen/TableauDeBord';

const HomeIcon = () => (
  <Icon name="home-outline" size={30} status="primary" />
);

const TrendingUpIcon = () => (
  <Icon name="trending-up-outline" size={30} status="primary" />
);

const GridIcon = () => (
  <Icon name="grid-outline" size={30} status="primary" />
);

const FileIcon = () => (
  <Icon name="file-text-outline1" size={30} status="primary" />
);

const BellIcon = () => (
  <Icon name="bell-outline" size={30} status="primary" />
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
  const navigation = useNavigation();
  return (
    <BottomTab.Navigator
      initialRouteName="tableau-de-bord"
      tabBar={
        (props) => {
          const { showBack } = getStackInfos(navigation.getState());
          if (showBack) {
            return <></>;
          }
          return <BottomTabBar {...props} style={{ margin: 100 }} />;
        }
      }
      screenOptions={{ headerShown: false }}
    >
      <BottomTab.Screen
        name="mes-biens-nav"
        component={MesBiensStackNavigator}
      />
      <BottomTab.Screen
        name="mes-charges-nav"
        component={MesChargesStackNavigator}
      />
      <BottomTab.Screen
        name="tableau-de-bord"
        component={TableauDeBord}
      />
      <BottomTab.Screen
        name="mon-assistant-nav"
        component={MonAssistantStackNavigator}
      />
      <BottomTab.Screen
        name="notifications"
        component={Notifications}
      />

    </BottomTab.Navigator>
  );
}
