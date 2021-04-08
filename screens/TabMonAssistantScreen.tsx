import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import MonAssistant from '../components/MonAssistant/MonAssistant';

export default function TabMonAssistantScreen() {
  return (
    <View style={styles.container}>
      <MonAssistant />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
