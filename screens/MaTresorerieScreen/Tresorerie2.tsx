/**
 * Trésorerie et les comptes bancaires
 *
 * @author: Shynggys UMBETOV
 */

import React, { useState } from 'react';
import { Button, Text } from '@ui-kitten/components';
import {
  StyleSheet, View,
} from 'react-native';

// import { useRoute } from '@react-navigation/native';
// 4import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
// import comptesData from '../../mockData/comptesData';
import MaxWidthContainer from '../../components/MaxWidthContainer';

import { useRealEstateList } from '../../src/API/RealEstate';
import CompteHeader from '../../components/CompteHeader/CompteHeader';
import OwnerCompte from './Components/OwnerCompte';
// import CompteFooter from '../../components/CompteFooter';
import ActivityIndicator from '../../components/ActivityIndicator';

const MaTresorerie2 = () => {
  const { loading, data } = useRealEstateList();
  // const [compte] = useState(comptesData);

  // const route = useRoute<RouteProp<TabMaTresorerieParamList, 'ma-tresorerie-2'>>();
  // console.log('mon-budget data', route.params);
  // const { bien } = useGetRealEstate(route.params.id);

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
      }}
    >
      <View style={styles.container}>
        <Text
          category="h1"
          status="basic"
          style={{ marginVertical: 20 }}
        >
          Ma Trésorerie
        </Text>
        <CompteHeader
          title={data?.listRealEstates?.items?.map((item) => item?.name)}
        />
        <Text category="h2" style={{ marginVertical: 20 }}>
          Comptes Bancaires
        </Text>
        <Text category="h6" appearance="hint">Sélectionner le compte pour consulter votre trésorerie</Text>

        {loading
          ? <ActivityIndicator />
          : (
            <>
              {data?.listRealEstates?.items?.map(
                (item) => item && <OwnerCompte key={item.id} compte={item} />,
              )}
            </>
          )}

        <Button
          size="large"
          onPress={() => {}}
          style={{ marginVertical: 25 }}
        >
          Connecter une autre compte bancaire
        </Button>

        <Button
          size="large"
          onPress={() => {}}
          appearance="outline"
          status="danger"
        >
          Supprimer un compte
        </Button>

      </View>

    </MaxWidthContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
    paddingVertical: 25,
    marginBottom: 12,
    paddingHorizontal: 26,
  },
  window: {
    flexDirection: 'row',
    marginTop: 30,
    paddingTop: 31,
    paddingBottom: 28,
    paddingHorizontal: 37,
    borderRadius: 10,
    borderColor: 'transparent',
    shadowColor: '#dedede',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 0.5,
    shadowOpacity: 1,
  },
  footer: {
    paddingTop: 5,
    backgroundColor: 'transparent',
    paddingBottom: 32,
    borderBottomWidth: 0.5,
    borderBottomColor: '#b5b5b5',
  },
});

export default MaTresorerie2;
