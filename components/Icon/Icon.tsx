import * as React from 'react';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { StyleProp, ViewStyle } from 'react-native';
import icoMoonConfig from './selection.json';
import { colors, fontSize } from '../../assets/styles';

export type IconName = 'grid-outline' | 'home-outline' | 'email-outline' | 'file-text-outline' | 'settings-2-outline' | 'person-outline' | 'calculator' | 'money' | 'question' | 'squares' | 'menu-outline' | 'trending-up-outline' | 'bell-outline' | 'menu' | 'warning' | 'arrow-left' | 'grid';

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
