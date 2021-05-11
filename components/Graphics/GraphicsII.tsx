import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, useTheme } from '@ui-kitten/components';
import { VictoryChart, VictoryLine } from 'victory-native';
import MaxWidthContainer from '../MaxWidthContainer';

const GraphicsII = () => {
  const theme = useTheme();
  return (
    <MaxWidthContainer outerViewProps={{
      style: {
        backgroundColor: '#f6f6f6',
      },
    }}
    >
      <Layout style={styles.container}>
        <Layout style={styles.compteSection}>
          <VictoryChart>
            <VictoryLine
              style={{
                data: { stroke: '#c43a31' },
                parent: { border: '1px solid #ccc' },
              }}
              interpolation="natural"
              height={283}
              width={283}
              data={[
                { x: 1, y: 2 },
                { x: 2, y: 3 },
                { x: 3, y: 5 },
                { x: 4, y: 4 },
                { x: 5, y: 7 },
              ]}
            />
          </VictoryChart>

          <Layout style={{ borderBottomWidth: 1, borderBottomColor: '#b5b5b5' }} />
          <Layout style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
            <Layout style={{
              backgroundColor: theme['color-info-500'], height: 30, width: 30, borderRadius: 30, marginRight: 10,
            }}
            />
            <Text category="h6" appearance="hint">Total Entrée par mois</Text>
          </Layout>
          <Layout style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
            <Layout style={{
              backgroundColor: theme['color-danger-500'], height: 30, width: 30, borderRadius: 30, marginRight: 10,
            }}
            />
            <Text category="h6" appearance="hint">Total Sorties par mois</Text>
          </Layout>
          <Layout style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
            <Layout style={{
              backgroundColor: theme['color-success-400'], height: 30, width: 30, borderRadius: 30, marginRight: 10,
            }}
            />
            <Text category="h6" appearance="hint">Total Trésorie Cumul</Text>
          </Layout>
          <Layout style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
            <Layout style={{
              backgroundColor: theme['color-warning-500'], height: 30, width: 30, borderRadius: 30, marginRight: 10,
            }}
            />
            <Text category="h6" appearance="hint">Evolution de la trésorerie par mois</Text>
          </Layout>
        </Layout>
      </Layout>
    </MaxWidthContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  compteSection: {
    paddingTop: 10,
    padding: 10,
    borderRadius: 10,
  },
});

export default GraphicsII;
