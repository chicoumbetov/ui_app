/**
 * Page 1 Mes Biens pour visualiser les biens
 *
 * @author: Shynggys UMBETOV
 */

import React from 'react';
import { Button, Layout, Text } from '@ui-kitten/components';

import { useLinkTo } from '@react-navigation/native';
import MonBien from './Components/MonBien';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { useRealEstateList } from '../../src/API/RealEstate';
import ActivityIndicator from '../../components/ActivityIndicator';

//  import comptesData from '../../mockData/comptesData';

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
            <>
              {data?.listRealEstates?.items?.map(
                (item) => item && <MonBien key={item.id} bien={item} />,
              )}
            </>
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
