import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';

import { Layout } from '@ui-kitten/components';
import { AntDesign } from '@expo/vector-icons';

import HeaderLeftOpenDrawerNavigation from '../../navigation/HeaderLeftOpenDrawerNavigation';
import HeaderRightOpenDrawerNavigation from '../../navigation/HeaderRightOpenDrawerNavigation';

import MonAssistant from './Components/MonAssistant';
import DeclarationImpots from './Components/DeclarationImpots';
import QuittanceLoyer from './Components/QuittanceLoyer';

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
            headerLeftContainerStyle: {
              paddingBottom: 5,
            },
            headerRightContainerStyle: {
              marginBottom: 5,
            },
            headerShown: true,
            headerLeft: () => (
              <HeaderLeftOpenDrawerNavigation navigation={navigation} />
            ),
            headerRight: () => (
              <HeaderRightOpenDrawerNavigation navigation={navigation} />
            ),
          }}
          component={MonAssistant}
        />

        <Stack.Screen
          name="DeclarationImpots"
          component={DeclarationImpots}
          options={{
            headerTitle: false,
            headerLeftContainerStyle: {
              paddingBottom: 5,
            },
            headerRightContainerStyle: {
              marginBottom: 5,
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
          name="QuittanceLoyer"
          component={QuittanceLoyer}
          options={{
            headerTitle: false,
            headerLeftContainerStyle: {
              paddingBottom: 5,
            },
            headerRightContainerStyle: {
              marginBottom: 5,
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
