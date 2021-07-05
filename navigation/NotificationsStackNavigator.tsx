import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { TabNotificationParamList } from '../types';
import NotificationsPage from '../screens/NotificationsScreen/Notifications';
import NotificationsParamsScreen from '../screens/NotificationsScreen/NotificationsParams';

/** Notification Section */
const Stack = createStackNavigator<TabNotificationParamList>();

export default () => (
  <Stack.Navigator
    initialRouteName="notifications"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name="notifications"
      component={NotificationsPage}
    />
    {/**         Declaration impots screens      */}
    <Stack.Screen
      name="notifications-params"
      component={NotificationsParamsScreen}
    />
  </Stack.Navigator>
);
