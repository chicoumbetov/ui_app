import { Dimensions, StyleSheet } from 'react-native';
import React from 'react';

const PdfScreen = () =>
// eslint-disable-next-line global-require

  (
    <></>
  );
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