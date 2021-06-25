import * as React from 'react';
import { Text } from '@ui-kitten/components';
import { TextProps } from '@ui-kitten/components/ui/text/text.component';
import Formatter from '../utils/Formatter';

export type AmountProps = { amount : number } & Pick<TextProps, 'category'>;

export default function Amount(props: AmountProps) {
  const { amount, category } = props;
  if (amount >= 0) {
    return (
      <Text category={category} status="success">
        +
        {' '}
        {Formatter.currencyFormatter.format(amount)}
      </Text>
    );
  }

  return (
    <Text category={category} status="danger">
      -
      {' '}
      {Formatter.currencyFormatter.format(-amount)}
    </Text>
  );
}
