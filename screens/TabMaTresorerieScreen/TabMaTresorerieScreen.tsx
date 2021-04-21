import * as React from 'react';
import { Layout } from '@ui-kitten/components';
import MaTresorerie from './Components/Tresorerie';

export default function TabMaTresorerieScreen() {
  return (
    <Layout style={{ flex: 1, marginBottom: 480, backgroundColor: 'rgba(246, 246, 246, 0.5)' }}>
      <MaTresorerie />
    </Layout>
  );
}
