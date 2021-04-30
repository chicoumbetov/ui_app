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
    width: window.width * 2,
    height: window.height * 2,
    top: -window.height,
    left: -window.width,
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
