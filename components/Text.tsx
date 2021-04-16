/**
 * Renvoie un component Text préformaté
 *
 * @author: David-Julian Buch
 */

import * as React from 'react';
import { Text as TextOriginal, TextProps } from 'react-native';

export default function Text(props: TextProps): JSX.Element {
  const {
    children,
  } = props;

  return (
    <TextOriginal>
      {children}
    </TextOriginal>
  );
}
