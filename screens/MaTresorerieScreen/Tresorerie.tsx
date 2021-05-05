/**
 * Trésorerie et les comptes bancaires
 *
 * @author: Shynggys UMBETOV
 */

import React, { useEffect, useState } from 'react';
import { Layout, Text } from '@ui-kitten/components';

// import { API, graphqlOperation } from 'aws-amplify';
import { LogBox, ScrollView, StyleSheet } from 'react-native';
import ComptesBancaires from './Components/ComptesBancaires';
import comptesData from '../../mockData/comptesData';
// import { listComptes } from '../../src/graphql/queries';
/*
  useEffect(() => {
    const fetchCompte = async () => {
      // fetchCompte
      try {
        const response = await API.graphql(graphqlOperation(listComptes));
        console.log(response);
      } catch (e) {
        console.error(e);
      }
      fetchCompte();
    };
  }, []);
*/

const MaTresorerie = () => {
  const [value, setValue] = useState('');

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: '#efefef' }}
    >
      <Layout style={styles.container}>
        <Text style={{
          fontSize: 26, fontWeight: '600', letterSpacing: 0.2, marginLeft: 26, marginTop: 33,
        }}
        >
          Ma Trésorerie
        </Text>

        <Layout style={styles.window}>
          <Layout style={{
            flex: 1,
            borderRightWidth: 1,
            borderRightColor: '#b5b5b5',
          }}
          >
            <Text style={{ fontSize: 18, color: '#b5b5b5' }}>Dernier crédit</Text>
            <Layout style={{ marginLeft: 20 }}>
              <Text style={{
                fontSize: 18,
                marginTop: 14,
                letterSpacing: 0.5,
                fontWeight: '600',
                color: '#00c29a',
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
            <Text style={{ fontSize: 18, color: '#b5b5b5', marginLeft: 38 }}>Dernier débit</Text>
            <Text style={{
              fontSize: 18, letterSpacing: 0.4, marginLeft: 35, fontWeight: '800', color: '#ff5640',
            }}
            >
              - 80 €
            </Text>
          </Layout>

        </Layout>

      </Layout>

      <ComptesBancaires client={comptesData} />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
    paddingBottom: 9,
  },
  window: {
    flexDirection: 'row',
    margin: 24,
    marginTop: 35,
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
});

export default MaTresorerie;
