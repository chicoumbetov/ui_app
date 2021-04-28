import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';

import { Layout } from '@ui-kitten/components';
import { AntDesign } from '@expo/vector-icons';

import { DrawerActions } from '@react-navigation/native';
import HeaderLeftOpenDrawerNavigation from '../../navigation/HeaderLeftOpenDrawerNavigation';
import HeaderRightOpenDrawerNavigation from '../../navigation/HeaderRightOpenDrawerNavigation';

import MonAssistant from './Components/MonAssistant';
import DeclarationImpots from './Components/DeclarationImpots';
import QuittanceLoyer from './Components/QuittanceLoyer';
import DeclarationImpots2 from './Components/DeclarationImpots2';
import PdfScreen from './Components/PdfScreen';
import QuittanceLoyer2 from './Components/QuittanceLoyer2';

const Stack = createStackNavigator();

export default function TabMonAssistantScreen({ navigation }) {
  return (
    <Layout style={{ flex: 1, backgroundColor: '#efefef' }}>
      <Stack.Navigator
        initialRouteName="Mon Assistant"
      >
        <Stack.Screen
          name="Mon Assistant"
          options={{
            headerTitle: false,
            headerShown: true,
            headerStyle: {
              height: 120,
            },
            headerRightContainerStyle: {
              marginRight: 18,
            },
            headerLeftContainerStyle: {
              marginLeft: 13,
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}
              >
                <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <HeaderLeftOpenDrawerNavigation navigation={navigation} />
            ),
          }}
          component={MonAssistant}
        />

        {/**         Declaration impots screens      */}
        <Stack.Screen
          name="DeclarationImpots"
          component={DeclarationImpots}
          options={{
            headerTitle: false,
            headerStyle: {
              height: 120,
            },
            headerRightContainerStyle: {
              marginRight: 18,
            },
            headerLeftContainerStyle: {
              marginLeft: 13,
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => { navigation.navigate('Mon Assistant'); }}>
                <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <HeaderLeftOpenDrawerNavigation navigation={navigation} />
            ),
          }}
        />
        <Stack.Screen
          name="DeclarationImpots2"
          component={DeclarationImpots2}
          options={{
            headerTitle: false,
            headerStyle: {
              height: 120,
            },
            headerRightContainerStyle: {
              marginRight: 18,
            },
            headerLeftContainerStyle: {
              marginLeft: 13,
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => { navigation.navigate('DeclarationImpots'); }}>
                <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
              </TouchableOpacity>

            ),
            headerRight: () => (
              <HeaderLeftOpenDrawerNavigation navigation={navigation} />
            ),
          }}
        />

        {/**         Pdf component      */}
        <Stack.Screen
          name="PdfScreen"
          component={PdfScreen}
          options={{
            headerTitle: false,
            headerStyle: {
              height: 120,
            },
            headerRightContainerStyle: {
              marginRight: 18,
            },
            headerLeftContainerStyle: {
              marginLeft: 13,
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => { navigation.navigate('Mon Assistant'); }}>
                <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
              </TouchableOpacity>

            ),
            headerRight: () => (
              <HeaderLeftOpenDrawerNavigation navigation={navigation} />
            ),
          }}
        />

        {/**         Quittance Loyer screens      */}
        <Stack.Screen
          name="QuittanceLoyer"
          component={QuittanceLoyer}
          options={{
            headerTitle: false,
            headerStyle: {
              height: 120,
            },
            headerRightContainerStyle: {
              marginRight: 18,
            },
            headerLeftContainerStyle: {
              marginLeft: 13,
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => { navigation.navigate('Mon Assistant'); }}>
                <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
              </TouchableOpacity>

            ),
            headerRight: () => (
              <HeaderLeftOpenDrawerNavigation navigation={navigation} />
            ),
          }}
        />
        <Stack.Screen
          name="QuittanceLoyer2"
          component={QuittanceLoyer2}
          options={{
            headerTitle: false,
            headerStyle: {
              height: 120,
            },
            headerRightContainerStyle: {
              marginRight: 18,
            },
            headerLeftContainerStyle: {
              marginLeft: 13,
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => { navigation.navigate('Mon Assistant'); }}>
                <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
              </TouchableOpacity>

            ),
            headerRight: () => (
              <HeaderLeftOpenDrawerNavigation navigation={navigation} />
            ),
          }}
        />

      </Stack.Navigator>
    </Layout>
  );
}
