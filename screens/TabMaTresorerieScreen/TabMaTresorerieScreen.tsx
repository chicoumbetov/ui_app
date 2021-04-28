import * as React from 'react';
import { useEffect } from 'react';
import { LogBox, StyleSheet, TouchableOpacity } from 'react-native';

import { Layout } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import MaTresorerie from './Components/Tresorerie';
import HeaderLeftOpenDrawerNavigation from '../../navigation/HeaderLeftOpenDrawerNavigation';
import TresoMouvement_page1 from './Components/TresoMouvement/TresoMouvement_page1';
import TresoMouvementPage2 from './Components/TresoMouvement/TresoMouvement_page2';
import IgnorerMouvement from './Components/TresoMouvement/IgnorerMouvement';
import AjoutCompte from './Components/AjoutCompte/AjoutCompte';

const Stack = createStackNavigator();

export default function TabMaTresorerieScreen({ navigation }) {
  // to ignore warning
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (

    <Layout style={styles.container}>
      <Stack.Navigator
        initialRouteName="MaTresorerie"
      >
        <Stack.Screen
          name="MaTresorerie"
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
              <TouchableOpacity
                onPress={() => {
                  navigation.dispatch(DrawerActions.toggleDrawer());
                }}
              >
                <AntDesign name="arrowleft" size={31} style={{ color: '#b5b5b5', marginLeft: 20 }} />
              </TouchableOpacity>

            ),
            headerRight: () => (
              <HeaderLeftOpenDrawerNavigation navigation={navigation} />
            ),
          }}
          component={MaTresorerie}
        />
        <Stack.Screen
          name="TresoMouvement_page1"
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
              <TouchableOpacity onPress={() => { navigation.navigate('MaTresorerie'); }}>
                <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <HeaderLeftOpenDrawerNavigation navigation={navigation} />
            ),
          }}
          component={TresoMouvement_page1}
        />
        <Stack.Screen
          name="TresoMouvement_page2"
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
              <TouchableOpacity onPress={() => { navigation.navigate('TresoMouvement_page1'); }}>
                <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <HeaderLeftOpenDrawerNavigation navigation={navigation} />
            ),
          }}
          component={TresoMouvementPage2}
        />
        <Stack.Screen
          name="IgnorerMouvement"
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
              <TouchableOpacity onPress={() => { navigation.navigate('TresoMouvement_page1'); }}>
                <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <HeaderLeftOpenDrawerNavigation navigation={navigation} />
            ),
          }}
          component={IgnorerMouvement}
        />
        <Stack.Screen
          name="AjoutCompte"
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
              <TouchableOpacity onPress={() => { navigation.navigate('MaTresorerie'); }}>
                <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5', marginLeft: 20 }} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <HeaderLeftOpenDrawerNavigation navigation={navigation} />
            ),
          }}
          component={AjoutCompte}
        />
      </Stack.Navigator>
    </Layout>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
