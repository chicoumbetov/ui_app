/**
 * Page 1 Mes Biens pour visualiser les biens
 *
 * @author: Shynggys UMBETOV
 */

import React from 'react';
import { Button, Text } from '@ui-kitten/components';

import { useLinkTo } from '@react-navigation/native';
import { View } from 'react-native';
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
      <View style={{ flex: 1, padding: 26 }}>
        <Text
          category="h1"
          style={{
            marginBottom: 20,
          }}
        >
          Mes Biens
        </Text>

        {loading
          ? <ActivityIndicator />
          : (
            <>
              {data?.listRealEstates?.items?.map(
                (item) => item && <MonBien key={item.id} biens={item} />,
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

      </View>

    </MaxWidthContainer>
  );
}

export default MesBiens;
