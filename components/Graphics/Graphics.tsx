import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

import { VictoryPie } from 'victory-native';
import { colors } from '../../assets/styles';

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
          backgroundColor: colors.bleu, height: 30, width: 30, borderRadius: 30, marginRight: 10,
        }}
        />
        <Text style={{ color: colors.gris }}>Eau</Text>
      </Layout>
      <Layout style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
        <Layout style={{
          backgroundColor: colors.jaune, height: 30, width: 30, borderRadius: 30, marginRight: 10,
        }}
        />
        <Text style={{ color: colors.gris }}>Electiricité</Text>
      </Layout>
      <Layout style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
        <Layout style={{
          backgroundColor: colors.vert2, height: 30, width: 30, borderRadius: 30, marginRight: 10,
        }}
        />
        <Text style={{ color: colors.gris }}>Assurances</Text>
      </Layout>
      <Layout style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
        <Layout style={{
          backgroundColor: colors.rouge, height: 30, width: 30, borderRadius: 30, marginRight: 10,
        }}
        />
        <Text style={{ color: colors.gris }}>Frais Divers</Text>
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
