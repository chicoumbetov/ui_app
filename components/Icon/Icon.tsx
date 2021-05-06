import * as React from 'react';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@ui-kitten/components';
import { ReactElement } from 'react';
import icoMoonConfig from './selection.json';

export type IconName = 'eye' | 'microphone' | 'camera' | 'image' | 'eye1' | 'arrow-downward-outline' | 'arrow-upward-outline' | 'arrow-back-outline' | 'arrow-forward-outline' | 'arrow-ios-forward-outline' | 'arrow-ios-back-outline' | 'arrow-ios-downward-outline' | 'arrow-ios-upward-outline' | 'cloud-download-outline' | 'vert_maison' | 'vert_magasin' | 'voiture' | 'vert_logement' | 'bleu_maison' | 'jaune_batiment' | 'vert_chateau' | 'jaune_maison' | 'voile' | 'vert_batiment' | 'calculator' | 'money' | 'question' | 'squares' | 'file-text-outline' | 'email-outline' | 'person-outline' | 'settings-2-outline' | 'bell-outline' | 'file-text-outline1' | 'grid-outline' | 'home-outline' | 'menu-outline' | 'trending-up-outline' | 'images' | 'camera1' | 'mic' | 'arrow-up2' | 'arrow-right2' | 'arrow-down2' | 'arrow-left2' | 'up-down';

export type IconProps = {
  name: IconName;
  status?: 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger';
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
};

export const IcomoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'Icons', 'icomoon.ttf');

const Icon: React.FunctionComponent<IconProps> = (props: IconProps): ReactElement => {
  const theme = useTheme();
  const {
    name, status = 'basic', size, style, iconStyle, color,
  } = props;
  const iconColor = color || theme[`color-${status}-600`];
  const iconSize: number = size || parseInt(theme['icon-size-default'], 10);
  return (
    <IcomoonIcon
      color={iconColor}
      size={iconSize}
      name={name as never}
      {...{ style, iconStyle }}
    />
  );
};

export default Icon;
