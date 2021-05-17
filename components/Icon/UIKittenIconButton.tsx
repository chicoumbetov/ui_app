/**
 *  Renvoie un bouton avec une Icon UIKitten
 *
 * @author: David-Julian Buch
 */

import * as React from 'react';
import {
  Icon, IconProps,
} from '@ui-kitten/components';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

type IconButtonProps = IconProps & TouchableOpacityProps;

export default function UIKittenIconButton(props: IconButtonProps): JSX.Element {
  return (
    <TouchableOpacity {...props}>
      <Icon {...props} />
    </TouchableOpacity>
  );
}
