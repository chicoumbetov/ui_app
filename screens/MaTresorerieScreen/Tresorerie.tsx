/**
 * Trésorerie et les comptes bancaires
 *
 * @author: Shynggys UMBETOV
 */

import React, { useState } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import {
  FlatList, StyleSheet, TouchableOpacity, View,
} from 'react-native';

import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
import { useNavigation } from '@react-navigation/native';

import comptesData from '../../mockData/comptesData';
import MaxWidthContainer from '../../components/MaxWidthContainer';
// import MonBienResume from '../../components/MonBienResume';
import CompteHeader from '../../components/CompteHeader/CompteHeader';
import { RealEstateItem, useRealEstateList } from '../../src/API/RealEstate';

const MaTresorerie = () => {
  const [client] = useState(comptesData);
  const { data } = useRealEstateList();
  const navigation = useNavigation();

  const onMaTresorerie2 = () => {
    navigation.navigate('ma-tresorerie-2');
  };

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
      }}
    >
      <Layout style={styles.container}>
        <Text
          category="h1"
          status="basic"
          style={{ marginVertical: 20 }}
        >
          Ma Trésorerie
        </Text>

        <Text category="h2" status="basic" style={styles.compteHeader}>
          Derniers mouvements
        </Text>

        <Layout style={styles.window}>
          <Layout style={{
            flex: 1,
            borderRightWidth: 1,
            borderRightColor: '#b5b5b5',
          }}
          >
            <Text category="h6" appearance="hint">Dernier crédit</Text>
            <Layout style={{ marginLeft: 20 }}>
              <Text
                category="h4"
                status="success"
                style={{
                  marginTop: 14,
                  justifyContent: 'center',
                }}
              >
                + 500 €
              </Text>
            </Layout>
          </Layout>

          <Layout style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          >
            <Text category="h6" appearance="hint" style={{ marginLeft: 32 }}>Dernier débit</Text>
            <Text
              category="h4"
              status="danger"
              style={{
                marginLeft: 35,
              }}
            >
              - 80 €
            </Text>
          </Layout>

        </Layout>

      </Layout>

      <Layout style={styles.container}>
        <Text category="h2" style={styles.compteHeader}>
          Consulter votre trésorerie
        </Text>
        <Text category="h6" appearance="hint" style={{ marginTop: 15 }}>Sélectionner le bien</Text>

        <FlatList<RealEstateItem>
          data={data?.listRealEstates?.items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              {/**
              <MonBienResume title={item.title} id={item.id} />
              */}
              <Layout style={{
                flexDirection: 'column', marginTop: 28, padding: 17, borderRadius: 10,
              }}
              >
                <TouchableOpacity
                  onPress={() => {
                    onMaTresorerie2();
                  }}
                  style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <CompteHeader title={item.name} />
                  <IconUIKitten
                    name="arrow-ios-forward"
                    fill="#b5b5b5"
                    style={{
                      height: 16, width: 16, marginRight: 5, marginTop: 8,
                    }}
                  />
                </TouchableOpacity>
              </Layout>
            </View>
          )}
        />
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
  compteHeader: {
    // marginTop: 12,
    // marginBottom: 10,
  },
});

export default MaTresorerie;
