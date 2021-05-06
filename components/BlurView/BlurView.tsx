/**
 *
 *
 * @author: David-Julian Buch
 */

import * as React from 'react';
import Animated, { interpolate } from 'react-native-reanimated';
import { StyleProp, ViewStyle } from 'react-native';
import { colors } from '../../assets/styles';

export type BlurViewProps = {
  style?: StyleProp<ViewStyle>;
  intensity: Animated.Node<number>;
};

export default function BlurView(props: BlurViewProps): JSX.Element {
  const { style, intensity } = props;
  // @ts-ignore there are only 2 arguments in interpolate function (expected 3 or 4)
  const opacity = interpolate(intensity, {
    inputRange: [0, 100],
    outputRange: [0, 0.9],
  });
  return <Animated.View style={[style, { backgroundColor: colors.black, opacity }]} />;
}
