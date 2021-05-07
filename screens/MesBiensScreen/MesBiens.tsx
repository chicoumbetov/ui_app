/**
 * Page 1 Mes Biens pour visualiser les biens
 *
 * @author: Shynggys UMBETOV
 */

import React from 'react';
import { Layout, Text } from '@ui-kitten/components';

import { ScrollView } from 'react-native';
import MonBien from './Components/MonBien';

function MesBiens() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: '#efefef', marginTop: 12 }}
    >
      <Layout style={{ backgroundColor: '#f6f6f6', padding: 26 }}>
        <Text
          category="h1"
          style={{
            marginBottom: 20,
          }}
        >
          Mes Biens
        </Text>

        <MonBien />
        <MonBien />

      </Layout>
    </ScrollView>
  );
}

export default MesBiens;
