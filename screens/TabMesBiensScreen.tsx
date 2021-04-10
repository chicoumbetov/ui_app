import * as React from 'react';
import { Layout } from '@ui-kitten/components';
import MesBiens from '../components/MesBiens/MesBiens';

export default function TabMesBiensScreen() {
  return (
    <Layout style={{
      flex: 1,
      backgroundColor: 'rgba(246, 246, 246, 0.5)',
    }}
    >
      <MesBiens />
    </Layout>
  );
}
