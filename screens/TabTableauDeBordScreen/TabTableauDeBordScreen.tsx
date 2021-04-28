/**
 * Page d'acceuil
 *
 * @author: Shynggys UMBETOV
 */

import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Layout } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';

import TableauDeBord from './Components/TableauDeBord';
import HeaderLeftOpenDrawerNavigation from '../../navigation/HeaderLeftOpenDrawerNavigation';

import HeaderRightOpenDrawerNavigation from '../../navigation/HeaderRightOpenDrawerNavigation';

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
              <HeaderLeftOpenDrawerNavigation navigation={navigation} />
            ),
            headerRight: () => (
              <HeaderRightOpenDrawerNavigation navigation={navigation} />
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
