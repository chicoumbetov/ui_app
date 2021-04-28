import * as React from 'react';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { StyleProp, ViewStyle } from 'react-native';
import icoMoonConfig from './selection.json';
import { colors, fontSize } from '../../assets/styles';

export type IconName = 'eye' | 'microphone' | 'camera' | 'image' | 'eye1' | 'arrow-downward-outline' | 'arrow-upward-outline' | 'arrow-back-outline' | 'arrow-forward-outline' | 'arrow-ios-forward-outline' | 'arrow-ios-back-outline' | 'arrow-ios-downward-outline' | 'arrow-ios-upward-outline' | 'cloud-download-outline' | 'vert_maison' | 'vert_magasin' | 'voiture' | 'vert_logement' | 'bleu_maison' | 'jaune_batiment' | 'vert_chateau' | 'jaune_maison' | 'voile' | 'vert_batiment' | 'calculator' | 'money' | 'question' | 'squares' | 'file-text-outline' | 'email-outline' | 'person-outline' | 'settings-2-outline' | 'bell-outline' | 'file-text-outline1' | 'grid-outline' | 'home-outline' | 'menu-outline' | 'trending-up-outline' | 'images' | 'camera1' | 'mic' | 'arrow-up2' | 'arrow-right2' | 'arrow-down2' | 'arrow-left2';

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
