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
  TextStyle,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Text from './Text';

import { colors, size, spacing } from '../assets/styles';

type LinkProps = {
  onPress: () => void;
  primary?: boolean;
  secondary?: boolean;
  label?: string;
  disabled?: boolean;
  primaryTextColor?: boolean;
  textColor?: string;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
};

export default function Link(props: LinkProps): JSX.Element {
  const {
    onPress, style, label, primary, secondary, primaryTextColor, disabled, textStyle,
  } = props;
  let color: string;

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
      <View style={[innerStyles.Link, style]}>
        {label && (
        <Text style={textStyle} color={color} align="center">
          {label}
        </Text>
        )}
      </View>
    </Btn>
  );
}

const innerStyles = StyleSheet.create({
  Link: {
    height: 36,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: spacing.small,
    padding: spacing.tiny,
    borderRadius: size.borderRadius,
  },
  icon: {
    marginRight: spacing.tiny,
  },
});
