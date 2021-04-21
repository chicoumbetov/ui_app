import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Layout } from '@ui-kitten/components';
import MesCharges from './Components/MesCharges';

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
