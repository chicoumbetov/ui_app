import * as React from 'react';

import { Layout } from '@ui-kitten/components';
import MaTresorerie from '../components/Tresorerie/Tresorerie';

export default function TabMaTresorerieScreen() {
  return (
    <Layout style={{ flex: 1, backgroundColor: 'rgba(246, 246, 246, 0.5)' }}>
      <MaTresorerie />
    </Layout>
  );
}
