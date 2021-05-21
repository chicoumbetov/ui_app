/**
 * Page 1 Mes Biens pour visualiser les biens
 *
 * @author: Shynggys UMBETOV
 */

import React from 'react';
import { Button, Layout, Text } from '@ui-kitten/components';

import { useLinkTo } from '@react-navigation/native';
import { FlatList } from 'react-native';
import MonBien from './Components/MonBien';
import MaxWidthContainer from '../../components/MaxWidthContainer';
//  import comptesData from '../../mockData/comptesData';

import { RealEstateItem, useRealEstateList } from '../../src/API/RealEstate';
import ActivityIndicator from '../../components/ActivityIndicator';

function MesBiens() {
  const linkTo = useLinkTo();
  // const [compte] = useState(comptesData);
  const { loading, data } = useRealEstateList();

  // console.log('biens', data);

  const onAjoutBien = () => {
    linkTo('/mes-biens/ajouter');
  };

  return (

    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        style: {
          backgroundColor: '#efefef',
        },
        showsVerticalScrollIndicator: false,
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
        {loading
          ? <ActivityIndicator />
          : (
            <FlatList<RealEstateItem>
              data={data?.listRealEstates?.items}
              renderItem={({ item }) => <MonBien bien={item} />}
              keyExtractor={(item) => item.id}
            />
          )}

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
