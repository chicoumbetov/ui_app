import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import {BottomNavigationTab, Icon} from '@ui-kitten/components';

import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BottomTabParamList } from '../types';


import { BottomNavigation } from '../components/UIKittenRewrite/BottomNavigation';
import MonAssistantStackNavigator from './MonAssistantStackNavigator';
import Notifications from '../screens/NotificationsScreen/Notifications';
import MesBiensStackNavigator from './MesBiensStackNavigator';
import MesChargesStackNavigator from './MesChargesStackNavigator';
import { getStackInfos } from './Utils';
import TableauDeBord from '../screens/TabTableauDeBordScreen/TableauDeBord';
import {useDimensions} from "@react-native-community/hooks";

const HomeIcon = () => (
    <Icon name="home-outline" fill='#5eecb4' style={{ height: 20, width: 20 }} />
);

const TrendingUpIcon = () => (
    <Icon name="trending-up-outline" fill='#5eecb4' style={{ height: 20, width: 20 }} />
);

const GridIcon = () => (
    <Icon name="grid-outline" fill='#5eecb4' style={{ height: 20, width: 20 }} />
);

const FileIcon = () => (
    <Icon name="file-text-outline" fill='#5eecb4' style={{ height: 20, width: 20 }} />
);

const BellIcon = () => (
    <Icon name="bell-outline" fill='#5eecb4' style={{ height: 20, width: 20 }} />
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
  const {window} = useDimensions();
  return (
    <BottomTab.Navigator
      initialRouteName="tableau-de-bord"
      tabBar={
        (props) => {
          const { showBack } = getStackInfos(navigation.dangerouslyGetState());
          if (showBack || window.width > 780) {
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
