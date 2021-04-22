/**
 * Page 1 Mes Biens pour visualiser les biens
 *
 * @author: Shynggys UMBETOV
 */

import * as React from 'react';
import { Layout } from '@ui-kitten/components';
import MesBiens from './Components/MesBiens';

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
