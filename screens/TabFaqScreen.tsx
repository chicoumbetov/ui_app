import * as React from 'react';
import {StyleSheet} from 'react-native';

import { View } from '../components/Themed';
import Faq from "../components/Faq/Faq";

export default function TabFaqScreen() {
  return (
    <View style={styles.container}>
      <Faq/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
