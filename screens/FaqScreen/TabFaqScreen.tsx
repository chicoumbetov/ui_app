import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Layout } from '@ui-kitten/components';
import faqQandA from '../../mockData/faqQandA';
import Faq from './Components/Faq';

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
