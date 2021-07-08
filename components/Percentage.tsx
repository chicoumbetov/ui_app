import * as React from 'react';
import { Text } from '@ui-kitten/components';
import { TextProps } from '@ui-kitten/components/ui/text/text.component';
import Formatter from '../utils/Formatter';

export type PercentageProps = { amount? : number } & TextProps;

export default function Percentage(props: PercentageProps) {
  const { amount, ...otherProps } = props;
  return (
    amount ? (
      <Text {...otherProps}>
        {Formatter.numberFormatter.format(amount)}
        {' '}
        %
      </Text>
    ) : (<Text {...otherProps}>--</Text>)
  );
}
