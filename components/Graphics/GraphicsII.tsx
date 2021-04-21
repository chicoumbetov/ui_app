import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { VictoryLine, VictoryPie } from 'victory-native';

const GraphicsII = () => (
  <Layout style={styles.container}>
    <Layout style={styles.compteSection}>

      <Text>Graphics</Text>

      <VictoryLine
        style={{
          data: { stroke: '#c43a31' },
          parent: { border: '1px solid #ccc' },
        }}
        interpolation="natural"
        height={283}
        width={330}
        data={[
          { x: 1, y: 2 },
          { x: 2, y: 3 },
          { x: 3, y: 5 },
          { x: 4, y: 4 },
          { x: 5, y: 7 },
        ]}
      />

      <Layout style={{ borderBottomWidth: 1, borderBottomColor: '#b5b5b5' }} />
      <Layout style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
        <Layout style={{
          backgroundColor: 'gold', height: 30, width: 30, borderRadius: 30, marginRight: 10,
        }}
        />
        <Text>Total Entrée par mois</Text>
      </Layout>
      <Layout style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
        <Layout style={{
          backgroundColor: 'tomato', height: 30, width: 30, borderRadius: 30, marginRight: 10,
        }}
        />
        <Text>Total Sorties par mois</Text>
      </Layout>
      <Layout style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
        <Layout style={{
          backgroundColor: 'green', height: 30, width: 30, borderRadius: 30, marginRight: 10,
        }}
        />
        <Text>Total Trésorie Cumul</Text>
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

export default GraphicsII;
