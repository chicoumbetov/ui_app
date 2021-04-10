import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Layout } from '@ui-kitten/components';
import Contact from '../components/Contact/Contact';

export default function TabContactScreen() {
  return (
    <Layout style={styles.container}>
      <Contact />

    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
});
