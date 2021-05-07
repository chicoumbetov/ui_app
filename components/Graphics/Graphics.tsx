import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

import { VictoryPie } from 'victory-native';
import { colors } from '../../assets/styles';

const Graphics = ({ data }) => {
  const [victoryData, setVictoryData] = useState(data);
  return (
    <Layout style={styles.container}>
      <Layout style={styles.compteSection}>

        <Layout style={{ alignItems: 'center', margin: 30 }}>
          <VictoryPie
            padAngle={4}
            startAngle={-27}
            endAngle={333}
            cornerRadius={30}
            height={272}
            width={272}
            innerRadius={67}
            data={victoryData}
            colorScale={[colors.green, colors.jaune, colors.bleu, colors.rouge]}
          />
        </Layout>

        <Layout style={{
          borderWidth: 1,
          borderColor: '#b5b5b5',
          marginVertical: 20,
        }}
        />

        {/**
        *         Remake with Flatlist and connect with Victory Pie
        * */}
        <Layout style={{
          flex: 1, flexDirection: 'row', marginTop: 10, alignItems: 'center',
        }}
        >
          <Layout style={{
            backgroundColor: colors.bleu, height: 30, width: 30, borderRadius: 30, marginRight: 10,
          }}
          />
          <Text category="h6" appearance="hint">Eau</Text>
        </Layout>
        <Layout style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>

          <Layout style={{
            backgroundColor: colors.jaune, height: 30, width: 30, borderRadius: 30, marginRight: 10,
          }}
          />
          <Text category="h6" appearance="hint">Electiricité</Text>
        </Layout>
        <Layout style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
          <Layout style={{
            backgroundColor: colors.green, height: 30, width: 30, borderRadius: 30, marginRight: 10,
          }}
          />
          <Text category="h6" appearance="hint">Assurances</Text>
        </Layout>
        <Layout style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
          <Layout style={{
            backgroundColor: colors.rouge, height: 30, width: 30, borderRadius: 30, marginRight: 10,
          }}
          />
          <Text category="h6" appearance="hint">Frais Divers</Text>
        </Layout>

      </Layout>
    </Layout>

  );
};

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
  circles: {
    height: 20, width: 20, borderRadius: 30, marginRight: 10,
  },
});

export default Graphics;
