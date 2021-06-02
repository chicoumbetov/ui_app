/**
 * Trésorerie et les comptes bancaires
 *
 * @author: Shynggys UMBETOV
 */

import React, { useState } from 'react';
import { Button, Text } from '@ui-kitten/components';
import {
  TouchableOpacity, View,
} from 'react-native';

import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import MaxWidthContainer from '../../components/MaxWidthContainer';

import { useGetRealEstate, useRealEstateList } from '../../src/API/RealEstate';
import CompteHeader from '../../components/CompteHeader/CompteHeader';
import OwnerCompte from './Components/OwnerCompte';
import ActivityIndicator from '../../components/ActivityIndicator';
import { TabMaTresorerieParamList } from '../../types';

// import comptesData from '../../mockData/comptesData';

const MaTresorerie2 = () => {
  const { loading, data } = useRealEstateList();
  // const [compte] = useState(comptesData);

  const [toggle, setToggle] = useState(false);
  const [supprim, setSupprim] = useState(false);

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
      {toggle
        ? <Text category="p2" appearance="hint">Ajoutez un compte pour consulter votre trésorerie</Text>
        : <Text category="p2" appearance="hint">Sélectionner le compte pour consulter votre trésorerie</Text>}
      {loading
        ? <ActivityIndicator />
        : (
          <>
            {data?.listRealEstates?.items?.map(
              (item) => item && (
              <OwnerCompte
                key={item.id}
                compte={item}
                supprimer={supprim}
              />
              ),
            )}
          </>
        )}

      <TouchableOpacity
        onPress={() => setSupprim(!supprim)}
        style={{
          flexDirection: 'row', marginTop: 30, justifyContent: 'flex-end', backgroundColor: 'transparent',
        }}
      >
        <Text
          category="h5"
          status={supprim ? 'danger' : 'basic'}
        >
          Supprimer un compte
        </Text>
      </TouchableOpacity>

      <View style={{ marginVertical: 30, borderTopWidth: 1, borderColor: '#b5b5b5' }} />
      {supprim
        ? <></>
        : (
          <Button
            size="large"
            onPress={() => setToggle(!toggle)}
            style={{
              paddingVertical: 20, marginBottom: 30, borderTopWidth: 1, borderTopColor: '#b5b5b5',
            }}
          >
            {toggle
              ? 'Lier un compte bancaire'
              : 'Lier un autre compte bancaire'}
          </Button>
        )}

    </MaxWidthContainer>
  );
};

export default MaTresorerie2;

// const styles = StyleSheet.create({ container: { } });
