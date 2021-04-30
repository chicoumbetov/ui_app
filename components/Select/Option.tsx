/**
 * Renvoi un composant visuel
 *
 * @author: Randy Larzabal
 */

import React from 'react';
import {
  StyleSheet, View, StyleProp, ViewStyle, TextStyle,
} from 'react-native';
import Text from '../Text';

export type OptionProps = {
  style: StyleProp<ViewStyle>;
  styleText: StyleProp<TextStyle>;
  children: React.ReactNode;
};

export function Option(props: OptionProps): JSX.Element {
  const { style, styleText, children } = props;
  return (
    <View style={[styles.container, style]}>
      <Text style={styleText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
  },
});
