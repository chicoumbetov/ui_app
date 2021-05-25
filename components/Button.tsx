/**
 *
 *
 * @author: David-Julian Buch
 */

import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button as UIButton, ButtonProps } from '@ui-kitten/components';

export default function Button(props: ButtonProps): JSX.Element {
  const {
    status, style, ...buttonProps
  } = props;

  let shadow = {};
  if ((status === undefined || status === 'primary')
  && (buttonProps.appearance === undefined || buttonProps.appearance === 'filled')
  ) {
    shadow = {
      shadowColor: 'rgba(190, 190, 190, 0.5)',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowRadius: 2,
      shadowOpacity: 1,
      elevation: 2,
    };
  }

  return (
    <UIButton
      status={status}
      style={StyleSheet.flatten([shadow, style])}
      {...buttonProps}
    />
  );
}
