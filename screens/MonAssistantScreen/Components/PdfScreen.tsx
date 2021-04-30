import { Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import Pdf from 'react-native-pdf';

const PdfScreen = () => {
  // eslint-disable-next-line global-require
  const source = require('../../../mockData/ReactRedux.pdf');

  return (
    <Pdf
      source={source}
      style={styles.pdf}
    />
  );
};
export default PdfScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
});
