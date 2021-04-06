/**
 *
 *
 * @author: David-Julian Buch
 */

import * as React from 'react';
import { ActivityIndicator as AI, ActivityIndicatorProps } from 'react-native';
import { colors } from '../assets/styles';

export default function ActivityIndicator(props: ActivityIndicatorProps): JSX.Element {
  return <AI color={colors.bleuFonc} {...props} />;
}
