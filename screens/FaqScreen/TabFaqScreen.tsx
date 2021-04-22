/**
 * FAQ page with mock data
 *
 * @author: Shynggys UMBETOV
 */

import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Layout } from '@ui-kitten/components';
import faqDATA from '../../mockData/faqDATA';
import Faq from './Components/Faq';

const TabFaqScreen = () => (
  <Layout style={styles.container}>
    <Faq faqDATA={faqDATA} />
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
});

export default TabFaqScreen;
