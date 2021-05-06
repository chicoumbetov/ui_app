/**
 *
 *
 * @author: David-Julian Buch
 */

import * as React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
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

  if (top) {
    return <View style={[styles.container, style]}>{children}</View>;
  }
  return <View {...{ style }}>{children}</View>;
}
