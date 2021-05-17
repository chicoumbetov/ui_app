/**
 *
 *
 * @author: David-Julian Buch
 */

import * as React from 'react';
import { StyleProp, ViewStyle, Animated } from 'react-native';

export type BlurViewProps = {
  style?: StyleProp<ViewStyle>;
  intensity: Animated.Value;
};

export default function BlurView(props: BlurViewProps): JSX.Element {
  const { style, intensity } = props;
  const opacity = intensity.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 0.9],
  });
  return <Animated.View style={[style, { backgroundColor: 'black', opacity }]} />;
}
