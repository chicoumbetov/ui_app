/**
 *  Renvoie un bouton avec un Icon
 *
 * @author: David-Julian Buch
 */

import * as React from 'react';
import {
  TouchableOpacity, View, ViewStyle, StyleSheet,
} from 'react-native';

import Icon, { IconName } from './Icon';
import Text from '../Text';
import { colors } from '../../assets/styles';

type IconButtonProps = {
  style?: ViewStyle;
  onPress: () => void;
  name?: IconName;
  label?: string;
  color?: string;
  primary?: boolean;
  secondary?: boolean;
  backgroundPrimary?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  disabledOpacity?: number;
  iconSize?: number;
};

export default function IconButton(props: IconButtonProps): JSX.Element {
  const {
    color: defaultColor = 'white',
    backgroundPrimary = false,
    primary = false,
    secondary = false,
    rounded = false,
    disabled = false,
    disabledOpacity = 0.5,
    iconSize = 28,
    onPress,
    name,
    label,
  } = props;

  const style: ViewStyle[] = [{ opacity: disabled ? disabledOpacity : 1 }];
  if (rounded) {
    style.push({
      borderRadius: 14,
      width: 28,
      height: 28,
      justifyContent: 'center',
      alignItems: 'center',
    });
  }
  if (backgroundPrimary) {
    style.push({
      backgroundColor: colors.primary,
    });
  }
  let color: string;
  if (primary) {
    color = colors.primary;
  } else if (secondary) {
    color = colors.secondary;
  } else {
    color = defaultColor;
  }
  // eslint-disable-next-line react/destructuring-assignment
  if (props.style) {
    style.push(props.style);
  }
  const Btn = (disabled ? View : TouchableOpacity) as React.ElementType;
  return (
    <View style={StyleSheet.flatten(style)}>
      <Btn {...{ onPress }}>
        {name && <Icon {...{ name, color }} size={iconSize} />}
        {label && (
        <Text type="headline" color="white">
          {label}
        </Text>
        )}
      </Btn>
    </View>
  );
}
