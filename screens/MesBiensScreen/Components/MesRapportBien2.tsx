import React, { useEffect, useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
import { Layout, Text } from '@ui-kitten/components';

import MaxWidthContainer from '../../../components/MaxWidthContainer';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';
import comptesData from '../../../mockData/comptesData';
import Graphics from '../../../components/Graphics/Graphics';
import GraphicsII from '../../../components/Graphics/GraphicsII';

const mesBiensData = [
  { x: '35%', y: 35 },
  { x: '15%', y: 15 },
  { x: '15%', y: 15 },
  { x: '35%', y: 35 },
];

const mesTotalData = [
  { x: 1, y: 2 },
  { x: 2, y: 3 },
  { x: 3, y: 5 },
  { x: 4, y: 4 },
  { x: 5, y: 7 },
];

const MesRapportBien2 = () => {
  const [data] = useState(comptesData);
  useEffect(() => {
    console.log('useEffect of Mes Rapport Bien 2');
  });

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
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
        <CompteHeader title={data[0].title} />
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

// const styles = StyleSheet.create({ });
