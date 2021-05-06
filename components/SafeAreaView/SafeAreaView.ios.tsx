/**
 *
 *
 * @author: David-Julian Buch
 */

import * as React from 'react';
import {
  SafeAreaView as SafeAreaViewOriginal, StyleSheet, View, ViewStyle,
} from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
});

type SafeAreaViewProps = {
  top: boolean;
  children: React.ReactNode;
  style: ViewStyle;
};

export default function SafeAreaView(props: SafeAreaViewProps): JSX.Element {
  const { top = false, style, children } = props;

  // https://github.com/facebook/react-native/issues/17638#issuecomment-370512300
  const majorIOSVersionStr = Constants?.platform?.ios?.systemVersion?.split('.')[0] || '10';
  const majorIOSVersion = parseInt(majorIOSVersionStr, 10);
  if (top && majorIOSVersion < 11) {
    return <View style={[styles.container, style]}>{children}</View>;
  }
  return <SafeAreaViewOriginal {...{ style }}>{children}</SafeAreaViewOriginal>;
}
