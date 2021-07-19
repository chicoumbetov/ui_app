/**
 *
 *
 * @author: David-Julian Buch
 */

import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button as UIButton, ButtonProps as UIButtonProps, Spinner } from '@ui-kitten/components';

export type ButtonProps = UIButtonProps & {
  loading?: boolean,
  loadingText?: string
};

export default function Button(props: ButtonProps): JSX.Element {
  const {
    status,
    loading,
    loadingText,
    style,
    ...buttonProps
  } = props;

  let { disabled, children } = props;

  let shadow = {};
  if ((status === undefined || status === 'primary')
  && (buttonProps.appearance === undefined || buttonProps.appearance === 'filled')
      && (!loading)
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

  const LoadingIndicator = () => (loading ? (
    <Spinner status="basic" size="small" />
  ) : (<></>)
  );

  if (loading) {
    disabled = true;
    if (loadingText) {
      children = loadingText;
    }
  }

  return (
    <UIButton
      status={status}
      style={StyleSheet.flatten([shadow, style])}
      {...buttonProps}
      disabled={disabled}
      accessoryRight={LoadingIndicator}
    >
      {children}
    </UIButton>
  );
}
