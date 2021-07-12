import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import { BottomNavigationTab, Text, useTheme } from '@ui-kitten/components';

import { SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useDimensions } from '@react-native-community/hooks';
import { BottomTabParamList } from '../types';

import { BottomNavigation } from '../components/UIKittenRewrite/BottomNavigation';
import MonAssistantStackNavigator from './MonAssistantStackNavigator';
import MesBiensStackNavigator from './MesBiensStackNavigator';
import MesChargesStackNavigator from './MesChargesStackNavigator';
import { getStackInfos } from './Utils';
import TableauDeBord from '../screens/TabTableauDeBordScreen/TableauDeBord';

import BellOutlineColor from '../assets/Icones_couleurs_2/bellOutlineIcon.svg';
import TrendingUPColor from '../assets/Icones_couleurs_2/trendingUpIcon.svg';
import GridColor from '../assets/Icones_couleurs_2/squareIcon.svg';
import FileTextColor from '../assets/Icones_couleurs_2/fileTextIcon.svg';
import HomeColor from '../assets/Icones_couleurs_2/homeIcon.svg';
import NotificationsStackNavigator from './NotificationsStackNavigator';
import { useCountUnseenNotification } from '../src/API/Notification';

const HomeIcon = () => (
  <HomeColor height={20} width={20} />
);

const TrendingUpIcon = () => (
  <TrendingUPColor height={20} width={20} />
);

const GridIcon = () => (
  <GridColor height={20} width={20} />
);

const FileIcon = () => (
  <FileTextColor height={20} width={20} />
);

// create type Props for props. Do Not leave any props

const BottomTabBar = ({ navigation, state }: any) => {
  const theme = useTheme();
  const countNotification = useCountUnseenNotification();

  const BellIcon = () => (
    <>
      <BellOutlineColor height={20} width={20} />
      {countNotification > 0 && (
      <View style={{
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: theme['color-danger-600'],
        position: 'absolute',
        top: 0,
        right: 5,
        marginLeft: 20,
      }}
      >
        <Text
          category="c1"
          appearance="alternative"
          style={{
            lineHeight: 20,
            textAlign: 'center',
          }}
        >
          {countNotification}
        </Text>
      </View>
      )}
    </>
  );

  return (
    <SafeAreaView style={{ backgroundColor: theme['color-basic-100'] }}>
      <BottomNavigation
        style={{ marginHorizontal: 2 }}
        selectedIndex={state.index}
        onSelect={(index) => navigation.navigate(state.routeNames[index])}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
        <BottomNavigationTab title="Mes Biens" appearance="custom" icon={HomeIcon} />
        <BottomNavigationTab title="Mes Charges" appearance="custom" icon={TrendingUpIcon} />
        <BottomNavigationTab title="Accueil" appearance="custom" icon={GridIcon} />
        <BottomNavigationTab title="Mon Assistant" appearance="custom" icon={FileIcon} />
        <BottomNavigationTab title="Notifications" appearance="custom" icon={BellIcon} />
      </BottomNavigation>
    </SafeAreaView>
  );
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const navigation = useNavigation();
  const { window } = useDimensions();
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
        component={NotificationsStackNavigator}
      />

    </BottomTab.Navigator>
  );
}
