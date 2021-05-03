/**
 * Renvoi un Overlay qui ce positionne au dessus de tout les items
 *
 * @author: Randy Larzabal
 */

import React from 'react';
import {
  Dimensions, StyleSheet, TouchableWithoutFeedback, View,
} from 'react-native';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width: window.width,
    height: window.height,
    top: 0,
    left: 0,
    backgroundColor: 'red',
  },
});

export type OverlayProps = {
  onPress?: () => void;
};

export function Overlay(props: OverlayProps): JSX.Element {
  const { onPress } = props;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.overlay} />
    </TouchableWithoutFeedback>
  );
}
