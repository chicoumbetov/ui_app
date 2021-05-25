/**
 *
 *
 * @author: David-Julian Buch
 */

import * as React from 'react';
import { Layout, LayoutProps } from '@ui-kitten/components';

export type SeparatorProps = {
  height?: number
  level?: Pick<LayoutProps, 'level'>;
};

export default function Separator(props: SeparatorProps): JSX.Element {
  const {
    height = 12,
    level = '2',
  } = props;

  return <Layout level={level} style={{ height }} />;
}
