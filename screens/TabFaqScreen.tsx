import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Layout } from '@ui-kitten/components';
import Faq from '../components/Faq/Faq';
import faqQandA from '../mockData/faqQandA';

const TabFaqScreen = () => (
  <Layout style={styles.container}>
    <Faq faqQandAs={faqQandA} />
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
});

export default TabFaqScreen;
