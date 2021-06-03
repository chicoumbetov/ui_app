import * as React from 'react';
import { Text } from '@ui-kitten/components';

export type AmountProps = { amount : number, category : string };

export default function Amount(props: AmountProps) {
  const { amount, category } = props;
  if (amount >= 0) {
    return (
      <Text category={category} status="success">
        +
        {' '}
        {amount}
        {' '}
        €
      </Text>
    );
  }

  return (
    <Text category={category} status="danger">
      {amount}
      {' '}
      €
    </Text>
  );
}
