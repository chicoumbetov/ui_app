/**
 *
 *
 * @author: David-Julian Buch
 */
import * as React from 'react';
import { BlurView as ExpoBlurView } from 'expo-blur';
import Animated from 'react-native-reanimated';
import { BlurViewProps } from './BlurView';

export default function BlurView(props: BlurViewProps): JSX.Element {
  const { style, intensity } = props;
  return <AnimatedBlurView tint="dark" {...{ intensity, style }} />;
}

const AnimatedBlurView = Animated.createAnimatedComponent(ExpoBlurView);
