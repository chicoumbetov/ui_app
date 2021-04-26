/**
 * Page 1 Mes Biens pour visualiser les biens
 *
 * @author: Shynggys UMBETOV
 */

import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Layout } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import MesBiens from './Components/MesBiens';
import ajoutBienScreen from './AjoutBien/ajoutBienSceen';

import HeaderLeftOpenDrawerNavigation from '../../navigation/HeaderLeftOpenDrawerNavigation';
import HeaderRightOpenDrawerNavigation from '../../navigation/HeaderRightOpenDrawerNavigation';

const Stack = createStackNavigator();

export default function TabMesBiensScreen({ navigation }) {
  return (
    <Layout style={{ flex: 1, backgroundColor: '#efefef' }}>
      <Stack.Navigator
        initialRouteName="TabMesBiensScreen"
      >
        <Stack.Screen
          name="TabMesBiensScreen"
          options={{
            headerShown: false,
            headerLeft: () => (
              <HeaderLeftOpenDrawerNavigation navigation={navigation} />
            ),
            headerRight: () => (
              <HeaderRightOpenDrawerNavigation navigation={navigation} />
            ),
          }}
          component={MesBiens}
        />

        <Stack.Screen
          name="ajoutBienScreen"
          component={ajoutBienScreen}
          options={{
            headerTitle: false,
            headerLeftContainerStyle: {
              paddingBottom: 5,
            },
            headerRightContainerStyle: {
              marginBottom: 5,
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => { navigation.navigate('TabMesBiensScreen'); }}>
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
