import React, { useEffect, useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
import { Layout, Text } from '@ui-kitten/components';

import { StyleSheet } from 'react-native';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import CompteHeader from '../../../components/CompteHeader';
import comptesData from '../../../mockData/comptesData';
import Graphics from '../../../components/Graphics/Graphics';
import GraphicsII from '../../../components/Graphics/GraphicsII';

const mesBiensData = [
  { x: '35%', y: 35 },
  { x: '15%', y: 15 },
  { x: '15%', y: 15 },
  { x: '35%', y: 35 },
];

const MesRapportBien2 = () => {
  const [data, setData] = useState(comptesData);
  useEffect(() => {
    console.log('useEffect of Mes Rapport Bien 2');
  });

  return (
    <MaxWidthContainer outerViewProps={{
      style: {
        backgroundColor: '#efefef',
      },
    }}
    >
      <Layout style={{
        padding: 22,
        backgroundColor: '#f6f6f6',
      }}
      >
        <Text category="h1" status="basic">
          Mes rapports par bien
        </Text>
        <CompteHeader data={data[0].title} />
      </Layout>

      <Layout style={{ marginTop: 12, backgroundColor: '#f6f6f6', padding: 22 }}>
        <Graphics data={mesBiensData} />

        <Text category="s2" style={{ marginVertical: 15 }}>Réntabilité</Text>

        <GraphicsII />
      </Layout>

    </MaxWidthContainer>
  );
};

export default MesRapportBien2;

const styles = StyleSheet.create({
  container: {
    padding: 22,
    marginVertical: 12,
    backgroundColor: '#f6f6f6',
  },
  containerRadio: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 15,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  buttonRight: { marginTop: 20, alignItems: 'flex-end' },
});
