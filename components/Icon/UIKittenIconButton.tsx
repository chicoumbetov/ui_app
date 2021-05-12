/**
 *  Renvoie un bouton avec une Icon UIKitten
 *
 * @author: David-Julian Buch
 */

import * as React from 'react';
import { Button, ButtonProps, Icon } from '@ui-kitten/components';

type IconButtonProps = {
  name: string;
} & ButtonProps;

export default function UIKittenIconButton(props: IconButtonProps): JSX.Element {
  const {
    name,
    ...otherProps
  } = props;

  return (
    <Button
      {...otherProps}
      accessoryLeft={(iconProps) => (
        <Icon {...iconProps} name={name} />
      )}
    />
  );
}
