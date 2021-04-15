import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Layout, Text } from '@ui-kitten/components';
import LoginScreen from './LoginScreen';
import Login from '../components/Login/Login';
import MesCharges from '../components/MesCharges';

export default function TabMesChargeScreen() {
  return (
    <Layout style={styles.container}>
      <MesCharges />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
});
