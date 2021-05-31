/**
 * Trésorerie et les comptes bancaires
 *
 * @author: Shynggys UMBETOV
 */

import React, { useState } from 'react';
import { Button, Text } from '@ui-kitten/components';
import {
  TouchableOpacity,
} from 'react-native';

import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
// import comptesData from '../../mockData/comptesData';
import MaxWidthContainer from '../../components/MaxWidthContainer';

import { useGetRealEstate, useRealEstateList } from '../../src/API/RealEstate';
import CompteHeader from '../../components/CompteHeader/CompteHeader';
import OwnerCompte from './Components/OwnerCompte';
import ActivityIndicator from '../../components/ActivityIndicator';
import { TabMaTresorerieParamList } from '../../types';

import comptesData from '../../mockData/comptesData';

const MaTresorerie2 = () => {
  const { loading, data } = useRealEstateList();
  const [compte] = useState(comptesData);

  const route = useRoute<RouteProp<TabMaTresorerieParamList, 'ma-tresorerie-2'>>();
  // console.log('mon-budget data', route.params);
  const { bien } = useGetRealEstate(route.params.id);

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
        style: {
          paddingHorizontal: 26,
        },
      }}
    >

      <Text
        category="h1"
        status="basic"
        style={{ marginVertical: 20 }}
      >
        Ma Trésorerie
      </Text>
      <CompteHeader
        title={
            bien.name
          }
      />
      <Text category="s2" status="basic" style={{ marginVertical: 20 }}>
        Comptes bancaires
      </Text>
      <Text category="p2" appearance="hint">Sélectionner le compte pour consulter votre trésorerie</Text>

      {loading
        ? <ActivityIndicator />
        : (
          <>
            {data?.listRealEstates?.items?.map(
              (item) => item && (
              <OwnerCompte
                key={item.id}
                compte={item}
              />
              ),
            )}
          </>
        )}

      <TouchableOpacity
        onPress={() => {}}
        style={{
          flexDirection: 'row', marginTop: 30, justifyContent: 'flex-end', backgroundColor: 'transparent',
        }}
      >
        <Text category="h5">Supprimer un compte</Text>
      </TouchableOpacity>

      <Button
        size="large"
        onPress={() => {}}
        style={{ pqddingVertical: 25, borderTopWidth: 1, borderTopColor: '#b5b5b5' }}
      >
        Lier un autre compte bancaire
      </Button>

    </MaxWidthContainer>
  );
};

export default MaTresorerie2;

// const styles = StyleSheet.create({ container: { } });
