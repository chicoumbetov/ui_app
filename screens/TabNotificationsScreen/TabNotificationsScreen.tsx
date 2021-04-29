import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Layout } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import Notifications from './Components/Notifications';
import HeaderLeftOpenDrawerNavigation from '../../navigation/HeaderLeftOpenDrawerNavigation';
import HeaderRightOpenDrawerNavigation from '../../navigation/HeaderRightOpenDrawerNavigation';

const Stack = createStackNavigator();

// export default function TabNotificationsScreen({ navigation }) {
  return (
    <Layout style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>

    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
});
