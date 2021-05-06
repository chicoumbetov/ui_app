import * as React from 'react';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@ui-kitten/components';
import { ReactElement } from 'react';
import icoMoonConfig from './selection.json';

export type IconName = 'calculator' | 'money' | 'question';

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
