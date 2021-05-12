/**
 * Page 1 Mes Biens pour visualiser les biens
 *
 * @author: Shynggys UMBETOV
 */

import React, { useState } from 'react';
import { Button, Layout, Text } from '@ui-kitten/components';

import { useLinkTo } from '@react-navigation/native';
import { FlatList } from 'react-native';
import MonBien from './Components/MonBien';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import comptesData from '../../mockData/comptesData';

function MesBiens() {
  const linkTo = useLinkTo();
  const [compte] = useState(comptesData);

  const onAjoutBien = () => {
    linkTo('/mes-biens/ajouter');
  };

  return (

    <MaxWidthContainer outerViewProps={{
      style: {
        backgroundColor: '#efefef',
      },
    }}
    >
      <Layout style={{ flex: 1, backgroundColor: '#f6f6f6', padding: 26 }}>
        <Text
          category="h1"
          style={{
            marginBottom: 20,
          }}
        >
          Mes Biens
        </Text>

        {/**
        <MonBien />
        <MonBien />
        */}

        <FlatList
          data={compte}
          renderItem={(item) => <MonBien title={item.item.title} id={item.item.id} />}
          keyExtractor={(item) => item.id}
        />

        <Button
          size="large"
          onPress={() => { onAjoutBien(); }}
          style={{ marginVertical: 30 }}
        >
          Ajouter un nouveau bien
        </Button>

      </Layout>

    </MaxWidthContainer>
  );
}

export default MesBiens;
