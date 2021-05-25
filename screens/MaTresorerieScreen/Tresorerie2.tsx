/**
 * Trésorerie et les comptes bancaires
 *
 * @author: Shynggys UMBETOV
 */

import React, { useState } from 'react';
import { Button, Layout, Text } from '@ui-kitten/components';
import {
  FlatList,
  SectionList,
  StyleSheet, View,
} from 'react-native';

import comptesData from '../../mockData/comptesData';
import MaxWidthContainer from '../../components/MaxWidthContainer';

import { useRealEstateList } from '../../src/API/RealEstate';
import CompteHeader from '../../components/CompteHeader/CompteHeader';
import ComptesBancaires from './Components/ComptesBancaires';
import OwnerCompte from './Components/OwnerCompte';
import CompteFooter from '../../components/CompteFooter';

const MaTresorerie2 = () => {
  const [client] = useState(comptesData);
  const { loading, refetch, data } = useRealEstateList();
  const [compte] = useState(comptesData);

  return (
    <MaxWidthContainer>
      <Layout style={styles.container}>
        <Text
          category="h1"
          status="basic"
          style={{ marginVertical: 20 }}
        >
          Ma Trésorerie
        </Text>
        <CompteHeader title={data?.listRealEstates?.items?.map((item) => item?.name)} />
        <Text category="h2" style={{ marginVertical: 20 }}>
          Comptes Bancaires
        </Text>
        <Text category="h6" appearance="hint">Sélectionner le compte pour consulter votre trésorerie</Text>

        <FlatList
          data={compte}
          renderItem={({ item }) => (
            <View>
              <OwnerCompte compte={item.data} />
            </View>
          )}
        />

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

      </Layout>

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
