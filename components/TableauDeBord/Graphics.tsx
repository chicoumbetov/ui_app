import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

import { VictoryPie } from 'victory-native';

const data = [
  { x: '35%', y: 35 },
  { x: '15%', y: 15 },
  { x: '15%', y: 15 },
  { x: '35%', y: 35 },
];

const Graphics = () => (
  <Layout style={styles.container}>
    <Layout style={styles.compteSection}>

      <Text>Graphics</Text>
      <Layout>
        <VictoryPie
          padAngle={1}
          cornerRadius={20}
          height={283}
          width={283}
          innerRadius={115}
          data={data}
          colorScale={['tomato', 'orange', 'gold', 'cyan']}
        />
      </Layout>

      <Layout style={{ borderBottomWidth: 1, borderBottomColor: '#b5b5b5' }} />
      <Layout style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
        <Layout style={{
          backgroundColor: 'gold', height: 30, width: 30, borderRadius: 30, marginRight: 10,
        }}
        />
        <Text>Eau</Text>
      </Layout>
      <Layout style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
        <Layout style={{
          backgroundColor: 'orange', height: 30, width: 30, borderRadius: 30, marginRight: 10,
        }}
        />
        <Text>Electiricité</Text>
      </Layout>
      <Layout style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
        <Layout style={{
          backgroundColor: 'tomato', height: 30, width: 30, borderRadius: 30, marginRight: 10,
        }}
        />
        <Text>Assurances</Text>
      </Layout>

    </Layout>
  </Layout>

);
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
  compteSection: {
    paddingTop: 10,
    padding: 20,
    borderRadius: 10,
  },
});

export default Graphics;
