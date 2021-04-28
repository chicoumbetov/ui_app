import * as React from 'react';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { StyleProp, ViewStyle } from 'react-native';
import icoMoonConfig from './selection.json';
import { colors, fontSize } from '../../assets/styles';

export type IconName = 'eye' | 'microphone' | 'camera' | 'image' | 'images' | 'camera1' | 'mic' | 'arrow-up2' | 'arrow-right2' | 'arrow-down2' | 'arrow-left2' | 'arrow-downward-outline' | 'arrow-upward-outline' | 'arrow-back-outline' | 'arrow-forward-outline' | 'arrow-ios-forward-outline' | 'arrow-ios-back-outline' | 'arrow-ios-downward-outline' | 'arrow-ios-upward-outline' | 'grid-outline' | 'home-outline' | 'email-outline' | 'file-text-outline' | 'file-text-outline1' | 'settings-2-outline' | 'person-outline' | 'calculator' | 'money' | 'question' | 'squares' | 'menu-outline' | 'trending-up-outline' | 'bell-outline' | 'menu' | 'warning' | 'arrow-left' | 'grid' | 'final4Plan-de-travail-1' | 'final4Plan-de-travail-1_22' | 'final4Plan-de-travail-1_20' | 'final4Plan-de-travail-1_11' | 'final4Plan-de-travail-1_10' | 'final4Plan-de-travail-1_9' | 'final4Plan-de-travail-1_8' | 'final4Plan-de-travail-1_6' | 'final4Plan-de-travail-1_5' | 'final4Plan-de-travail-1_7';

export type IconProps = {
  name: IconName;
  primary?: boolean;
  secondary?: boolean;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
};

export const IcomoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'Icons', 'icomoon.ttf');

export default function Icon(props: IconProps): JSX.Element {
  const {
    name, primary, secondary, color, size, style, iconStyle,
  } = props;
  let iconColor: string;
  if (primary) {
    iconColor = colors.gris;
  } else if (secondary) {
    iconColor = colors.green;
  } else if (color) {
    iconColor = color;
  } else {
    iconColor = colors.green;
  }
  let iconSize: number = fontSize.text;
  if (size) {
    iconSize = size;
  }
  return (
    <IcomoonIcon
      color={iconColor}
      size={iconSize}
      name={name as never}
      {...{ style, iconStyle }}
    />
  );
}
