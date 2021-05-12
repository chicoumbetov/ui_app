/**
 * Trésorerie et les comptes bancaires
 *
 * @author: Shynggys UMBETOV
 */

import React, { useState } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import ComptesBancaires from './Components/ComptesBancaires';
import comptesData from '../../mockData/comptesData';
import MaxWidthContainer from '../../components/MaxWidthContainer';

const MaTresorerie = () => {
  const [client] = useState(comptesData);

  return (
    <MaxWidthContainer outerViewProps={{
      style: {
        backgroundColor: '#efefef',
      },
    }}
    >
      <Layout style={styles.container}>
        <Text
          category="h1"
          style={{
            marginLeft: 26, marginTop: 33,
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

      <ComptesBancaires client={client} />

    </MaxWidthContainer>
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
    marginTop: 39,
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
