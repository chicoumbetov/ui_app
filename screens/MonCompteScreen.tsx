import * as React from 'react';

import { Layout } from '@ui-kitten/components';
import MonCompte from '../components/MonCompte/MonCompte';

export default function MonCompteScreen() {
  return (
    <Layout style={{ flex: 1, backgroundColor: 'rgba(246, 246, 246, 0.5)' }}>
      <MonCompte />
    </Layout>
  );
}
