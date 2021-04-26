/**
 * Page d'acceuil
 *
 * @author: Shynggys UMBETOV, Amaury
 */

import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Layout } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import TableauDeBord from './Components/TableauDeBord';
import HeaderLeftOpenDrawerNavigation from '../../navigation/HeaderLeftOpenDrawerNavigation';
import AjoutBienScreen from '../AjoutBienScreen/AjoutBienSceen';

const Stack = createStackNavigator();

export default function TabTableauDeBordScreen({ navigation }) {
  return (
    <Layout style={styles.container}>
      <Stack.Navigator
        initialRouteName="TableauDeBord"
      >
        <Stack.Screen
          name="TableauDeBord"
          options={{
            headerTitle: false,
            headerLeft: () => (
              <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()); }}>
                <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <HeaderLeftOpenDrawerNavigation navigation={navigation} />
            ),
          }}
          component={TableauDeBord}
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
