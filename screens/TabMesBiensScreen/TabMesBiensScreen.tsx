/**
 * Navigator pour basculer entre les pages de section Biens
 *
 * @author: Shynggys UMBETOV
 */

import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Layout } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import DetailsBien from './Components/DetailsDuBien';
import MesBiens from './Components/MesBiens';
import HeaderLeftOpenDrawerNavigation from '../../navigation/HeaderLeftOpenDrawerNavigation';
import MonBudget from './Components/MonBudget';
import ParametrerAjoutRevenu from './Components/ParametrerAjoutRevenu';
import ParametrerAjoutCharges from './Components/ParametrerAjoutCharges';
import PartagerBien from './Components/PartagerBien';
import ModifierCharacteristiques from './Components/ModifierCharacteristiques';
import HeaderRightOpenDrawerNavigation from '../../navigation/HeaderRightOpenDrawerNavigation';

const Stack = createStackNavigator();

// export default function TabMesBiensScreen({ navigation }) {
  return (
    <Layout style={{ flex: 1, backgroundColor: '#efefef' }}>
      <Stack.Navigator>
        <Stack.Screen
          name="MesBiens"
          component={MesBiens}
          options={{
            headerTitle: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetailsBien"
          options={{
            headerShown: true,
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
              <TouchableOpacity onPress={() => { navigation.navigate('MesBiens'); }}>
                <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <HeaderLeftOpenDrawerNavigation navigation={navigation} />
            ),
          }}
          component={DetailsBien}
        />
        <Stack.Screen
          name="MonBudget"
          options={{
            headerShown: true,
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
              <TouchableOpacity onPress={() => { navigation.navigate('DetailsBien'); }}>
                <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <HeaderLeftOpenDrawerNavigation navigation={navigation} />
            ),
          }}
          component={MonBudget}
        />
        <Stack.Screen
          name="ParametrerAjoutRevenu"
          options={{
            headerShown: true,
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
              <TouchableOpacity onPress={() => { navigation.navigate('MonBudget'); }}>
                <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <HeaderLeftOpenDrawerNavigation navigation={navigation} />
            ),
          }}
          component={ParametrerAjoutRevenu}
        />
        <Stack.Screen
          name="ParametrerAjoutCharges"
          options={{
            headerShown: true,
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
              <TouchableOpacity onPress={() => { navigation.navigate('MonBudget'); }}>
                <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <HeaderLeftOpenDrawerNavigation navigation={navigation} />
            ),
          }}
          component={ParametrerAjoutCharges}
        />

        <Stack.Screen
          name="PartagerBien"
          options={{
            headerShown: true,
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
              <TouchableOpacity onPress={() => { navigation.navigate('DetailsBien'); }}>
                <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <HeaderLeftOpenDrawerNavigation navigation={navigation} />
            ),
          }}
          component={PartagerBien}
        />

        <Stack.Screen
          name="ModifierCharacteristiques"
          options={{
            headerShown: true,
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
              <TouchableOpacity onPress={() => { navigation.navigate('DetailsBien'); }}>
                <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <HeaderLeftOpenDrawerNavigation navigation={navigation} />
            ),
          }}
          component={ModifierCharacteristiques}
        />
      </Stack.Navigator>
    </Layout>
  );
}
