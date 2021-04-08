import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Layout, Text } from '@ui-kitten/components';

export default function TabTableauDeBordScreen() {
  return (
    <Layout style={styles.container}>
      <Text>Tableau De Bord</Text>

    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
});
