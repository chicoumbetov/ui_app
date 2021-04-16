import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Layout } from '@ui-kitten/components';
import MonAssistant from '../../components/MonAssistant/MonAssistant';

export default function TabMonAssistantScreen() {
  return (
    <Layout style={styles.container}>
      <MonAssistant />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
});
