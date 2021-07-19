/**
 * Page 1 Mes Biens pour visualiser les biens
 *
 * @author: Shynggys UMBETOV
 */

import React from 'react';
import { Text } from '@ui-kitten/components';
import { useLinkTo } from '@react-navigation/native';
import Button from '../../components/Button';

import MonBien from './Components/MonBien';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { useRealEstateList } from '../../src/API/RealEstate';
import ActivityIndicator from '../../components/ActivityIndicator';
//  import comptesData from '../../mockData/comptesData';

function MesBiens() {
  const linkTo = useLinkTo();
  // const [compte] = useState(comptesData);
  const { loading, data } = useRealEstateList('cache-and-network');

  const onAjoutBien = () => {
    linkTo('/mes-biens/ajouter');
  };

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      innerViewProps={{
        style: { flex: 1, padding: 26 },
      }}
      outerViewProps={{
        showsVerticalScrollIndicator: false,
      }}
    >

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
              (item) => item
                    && (
                    <MonBien
                      key={item.id}
                      biens={item.id}
                    />
                    ),
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

    </MaxWidthContainer>
  );
}

export default MesBiens;
