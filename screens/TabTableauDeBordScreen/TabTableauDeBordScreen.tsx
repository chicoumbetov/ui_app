import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Layout } from '@ui-kitten/components';
import TableauDeBord from './Components/TableauDeBord';

export default function TabTableauDeBordScreen() {
  return (
    <Layout style={styles.container}>
      <TableauDeBord />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
});