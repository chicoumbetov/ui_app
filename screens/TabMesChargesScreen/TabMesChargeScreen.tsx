import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Layout } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';

import MesCharges1 from './Components/MesCharges1';
import HeaderLeftOpenDrawerNavigation from '../../navigation/HeaderLeftOpenDrawerNavigation';
import MesCharges2 from './Components/MesCharges2';
import MesCharges3 from './Components/MesCharges3';

const Stack = createStackNavigator();

export default function TabMesChargeScreen({ navigation }) {
  return (
    <Layout style={styles.container}>
      <Stack.Navigator
        initialRouteName="MesCharges1"
      >
        <Stack.Screen
          name="MesCharges1"
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
              <TouchableOpacity
                onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()); }}
              >
                <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <HeaderLeftOpenDrawerNavigation navigation={navigation} />
            ),
          }}
          component={MesCharges1}
        />
        <Stack.Screen
          name="MesCharges2"
          options={{
            headerTitle: false,
            headerLeftContainerStyle: {
              paddingBottom: 5,
            },
            headerRightContainerStyle: {
              marginBottom: 5,
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => { navigation.navigate('MesCharges1'); }}>
                <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <HeaderLeftOpenDrawerNavigation navigation={navigation} />
            ),
          }}
          component={MesCharges2}
        />
        <Stack.Screen
          name="MesCharges3"
          options={{
            headerTitle: false,
            headerLeftContainerStyle: {
              paddingBottom: 5,
            },
            headerRightContainerStyle: {
              marginBottom: 5,
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => { navigation.navigate('MesCharges2'); }}>
                <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <HeaderLeftOpenDrawerNavigation navigation={navigation} />
            ),
          }}
          component={MesCharges3}
        />
      </Stack.Navigator>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
});
