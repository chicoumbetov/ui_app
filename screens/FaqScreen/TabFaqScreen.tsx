/**
 * FAQ page with mock data
 *
 * @author: Shynggys UMBETOV
 */

import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Layout } from '@ui-kitten/components';

import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import Faq from './Components/Faq';
import HeaderLeftOpenDrawerNavigation from '../../navigation/HeaderLeftOpenDrawerNavigation';

const Stack = createStackNavigator();

const TabFaqScreen = ({ navigation }) => (
  <Layout style={styles.container}>
    <Stack.Navigator>
      <Stack.Screen
        name="Faq"
        component={Faq}
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

export default TabFaqScreen;
