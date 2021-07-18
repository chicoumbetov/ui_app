/**
 *
 *
 * @author: David-Julian Buch
 */

import * as React from 'react';
import { Layout, LayoutProps } from '@ui-kitten/components';
import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

export type CardProps = LayoutProps & Pick<TouchableOpacityProps, 'onPress'> & {
  withOpacity?: boolean
};

export default function Card(props: CardProps): JSX.Element {
  const {
    level = '3',
    style,
    onPress,
    withOpacity = true,
    ...otherViewProps
  } = props;

  if (onPress !== undefined) {
    if (withOpacity) {
      return (
        <TouchableOpacity
          onPress={onPress}
          style={[
            baseStyle.component,
            { backgroundColor: '#FFFFFF' },
            style]}
          {...otherViewProps}
        />
      );
    }
    return (
      <Pressable
        onPress={onPress}
        style={[
          baseStyle.component,
          { backgroundColor: '#FFFFFF' },
          style]}
        {...otherViewProps}
      />
    );
  }

  return (
    <Layout
      level={level}
      style={[
        baseStyle.component,
        style,
      ]}
      {...otherViewProps}
    />
  );
}

const baseStyle = StyleSheet.create({
  component: {
    flexDirection: 'column',
    padding: 15,
    borderRadius: 10,
    shadowColor: 'rgba(190, 190, 190, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 2,
  },
});
