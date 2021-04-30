/**
 * Renvoie un component Text préformaté
 *
 * @author: David-Julian Buch
 */

import * as React from 'react';
import { Text as TextOriginal, StyleSheet, TextProps } from 'react-native';
import { colors, typographies } from '../assets/styles';
import { Typographies } from '../assets/stylesTypes';

export type TypographyProps = TextProps & {
  type?: keyof Typographies;
  color?: string;
  children: React.ReactNode;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  primary?: boolean;
  numberOfLines?: number;
  ellipsizeMode?: 'tail' | 'head' | 'middle' | 'clip';
};

export default function Text(props: TypographyProps): JSX.Element {
  const {
    type = 'body',
    align: textAlign = 'left',
    style,
    children,
    primary,
    color: propColor,
    ...otherProps
  } = props;

  const usedTypography = typographies[type];
  const color = (() => {
    if (primary) {
      return colors.green;
    } if (typeof usedTypography.color === 'string' && !propColor) {
      return usedTypography.color;
    }
    return propColor;
  })();
  const computedStyle = StyleSheet.flatten([usedTypography, { textAlign, color }, style]);
  return (
    <TextOriginal style={computedStyle} {...otherProps}>
      {children}
    </TextOriginal>
  );
}
