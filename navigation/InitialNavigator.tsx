/**
 *
 *
 * @author:
 */

import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import * as Notifications from 'expo-notifications';
import { useApolloClient } from 'react-apollo';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { RootStackParamList } from '../types';
import MainDrawerNavigator from './MainDrawerNavigator';
import NotFoundScreen from '../screens/NotFoundScreen';
import { useNotificationHandler } from '../components/NotificationCard';
import { getNotificationByIdQuery, useNotificationsList } from '../src/API/Notification';
import { ModelSortDirection } from '../src/API';
import { useUser } from '../src/API/UserContext';

const Stack = createStackNavigator<RootStackParamList>();

function InitialNavigator() {
  const apolloClient = useApolloClient();
  const notificationHandler = useNotificationHandler();
  const { user } = useUser();
  const { refetch } = useNotificationsList({
    userId: user?.id,
    sortDirection: ModelSortDirection.DESC,
    createdAt: {
      ge: moment().add(-30, 'days').format('YYYY-MM-DDT00:00:00'),
    },
  }, 'cache-and-network');

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/inactive|background/)
        && nextAppState === 'active'
    ) {
      refetch({
        userId: user?.id,
        sortDirection: ModelSortDirection.DESC,
        createdAt: {
          ge: moment().add(-30, 'days').format('YYYY-MM-DDT00:00:00'),
        },
      });
    }

    appState.current = nextAppState;
  };

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      async (notification) => {
        console.log(notification);
        if (notification.actionIdentifier === 'expo.modules.notifications.actions.DEFAULT') {
          if (notification.notification.request.content.data.notificationId) {
            const notificationResult = await getNotificationByIdQuery(apolloClient,
              { id: notification.notification.request.content.data.notificationId as string });
            console.log(notificationResult);
            if (notificationResult.data.getNotificationById?.items
              && notificationResult.data.getNotificationById?.items?.length > 0
              && notificationResult.data.getNotificationById?.items[0]) {
              await notificationHandler(notificationResult.data.getNotificationById?.items[0]);
              refetch({
                userId: user?.id,
                sortDirection: ModelSortDirection.DESC,
                createdAt: {
                  ge: moment().add(-30, 'days').format('YYYY-MM-DDT00:00:00'),
                },
              });
            }
          }
        }
      },
    );
    return () => subscription.remove();
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Root"
        component={MainDrawerNavigator}
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

export default InitialNavigator;
