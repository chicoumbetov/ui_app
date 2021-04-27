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

        <Layout style={{ borderBottomWidth: 1, borderBottomColor: '#b5b5b5' }} />

        {/**
        *         Remake with Flatlist and connect with Victory Pie
        * */}
        <Layout style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
          <Layout style={{ ...styles.circles, backgroundColor: colors.bleu }} />
          <Text style={{ color: colors.gris }}>Eau</Text>
        </Layout>
        <Layout style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
          <Layout style={{ ...styles.circles, backgroundColor: colors.jaune }} />
          <Text style={{ color: colors.gris }}>Electiricité</Text>
        </Layout>
        <Layout style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
          <Layout style={{ ...styles.circles, backgroundColor: colors.vert2 }} />
          <Text style={{ color: colors.gris }}>Assurances</Text>
        </Layout>
        <Layout style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
          <Layout style={{ ...styles.circles, backgroundColor: colors.rouge }} />
          <Text style={{ color: colors.gris }}>Frais Divers</Text>
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
    backgroundColor: colors.rouge, height: 20, width: 20, borderRadius: 30, marginRight: 10,
  },
});

export default Graphics;
