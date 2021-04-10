import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Layout } from '@ui-kitten/components';
import Notifications from '../components/Notifications/Notifications';

export default function TabNotificationsScreen() {
  return (
    <Layout style={styles.container}>
      <Notifications />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
});
