/**
 * Contact Screen to access in Contact Page and visualize
 *
 * @author: Shynggys UMBETOV
 */

import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Layout } from '@ui-kitten/components';
import Contact from './Components/Contact';
import faqQandA from '../../mockData/faqQandA';

const TabContactScreen = () => (
  <Layout style={styles.container}>
    <Contact faqQandAs={faqQandA} />
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
});

export default TabContactScreen;