/**
 * Contact Screen to access in Contact Page and visualize
 *
 * @author: Shynggys UMBETOV
 */

import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Layout } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import Contact from './Components/Contact';
import HeaderLeftOpenDrawerNavigation from '../../navigation/HeaderLeftOpenDrawerNavigation';
import HeaderRightOpenDrawerNavigation from '../../navigation/HeaderRightOpenDrawerNavigation';
import Contact2 from './Components/Contact2';

const Stack = createStackNavigator();

const TabContactScreen = ({ navigation }) => (
  <Layout style={styles.container}>
    <Stack.Navigator
      initialRouteName="Contact"
    >
      <Stack.Screen
        name="Contact"
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
        component={Contact}
      />
      <Stack.Screen
        name="Contact2"
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
            <TouchableOpacity onPress={() => { navigation.navigate('Contact'); }}>
              <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderLeftOpenDrawerNavigation navigation={navigation} />
          ),
        }}
        component={Contact2}
      />
    </Stack.Navigator>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
});

export default TabContactScreen;
