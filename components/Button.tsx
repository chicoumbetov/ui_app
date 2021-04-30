/**
 *
 *
 * @author: David-Julian Buch
 */

import * as React from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import Icon, { IconName } from './Icon/Icon';
import ActivityIndicator from './ActivityIndicator';
import styles, { colors, size, spacing } from '../assets/styles';

export type ButtonProps = {
  onPress: () => void;
  primary?: boolean;
  secondary?: boolean;
  label?: string;
  icon?: IconName;
  disabled?: boolean;
  disabledAI?: boolean;
  primaryTextColor?: boolean;
  textColor?: string;
  backgroundColor?: string;
  shadow?: boolean;
  iconSize?: number;
  iconAtEnd?: boolean;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
};

export default function Button(props: ButtonProps): JSX.Element {
  const {
    onPress,
    style,
    label,
    icon,
    primary,
    secondary,
    primaryTextColor,
    disabled,
    iconSize,
    iconAtEnd,
    textStyle,
    disabledAI,
  } = props;
  const opacity = disabled ? 0.5 : 1;
  let color: string;
  let backgroundColor: string;
  if (primary) {
    backgroundColor = colors.primary;
  } else if (secondary) {
    backgroundColor = colors.secondary;
  } else if (props.backgroundColor) {
    backgroundColor = props.backgroundColor;
  } else {
    backgroundColor = 'transparent';
  }
  if (props.textColor) {
    color = props.textColor;
  } else if (primary) {
    color = 'white';
  } else if (secondary) {
    color = colors.primary;
  } else if (primaryTextColor) {
    color = colors.primary;
  } else {
    color = colors.darkGray;
  }
  const shadow = props.shadow ? styles.shadow : {};
  let Btn: React.ComponentType;
  if (disabled) {
    Btn = View;
  } else if (Platform.OS !== 'android') {
    Btn = TouchableOpacity;
  } else {
    Btn = TouchableNativeFeedback;
  }
  return (
    <Btn {...{ onPress }}>
      <View style={[innerStyles.button, { ...shadow, backgroundColor, opacity }, style]}>
        {icon && !iconAtEnd && (
        <Icon name={icon} style={label ? innerStyles.icon : {}} {...{ color, size: iconSize }} />
        )}
        {label && <Text style={[{ textAlign: 'center', color }, textStyle]}>{label}</Text>}
        {icon && iconAtEnd && (
        <Icon
          name={icon}
          style={[innerStyles.icon, { alignSelf: 'flex-end' }]}
          {...{ color, size: iconSize }}
        />
        )}
        {disabled && disabledAI && <ActivityIndicator color={color} style={{ marginLeft: 20 }} />}
      </View>
    </Btn>
  );
}

const innerStyles = StyleSheet.create({
  button: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: spacing.tiny,
    borderRadius: size.borderRadius,
  },
  icon: {
    marginRight: spacing.tiny,
  },
});
