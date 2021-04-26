import React from 'react';
import { StyleSheet } from 'react-native';

import { Layout, Text } from '@ui-kitten/components';

import { AntDesign } from '@expo/vector-icons';

const OwnerCompte = ({ compte }) => {
  const onPress = () => {
    console.warn('Button pressed');
  };

  return (

    <Layout style={styles.container}>

      <Layout style={{ paddingHorizontal: 14 }}>
        <Text style={{
          color: '#000',
          fontSize: 16,
          fontFamily: 'HouschkaRoundedMedium',
          borderRadius: 10,
          letterSpacing: 0.7,
          paddingTop: 11,
        }}
        >
          Monsieur
          {' '}
          {compte.nom}
          {' '}
          {compte.prenom}
        </Text>
        <Text style={{ color: '#b5b5b5', paddingTop: 8 }}>
          FR
          {compte.IBAN}
        </Text>
        <Text style={{
          fontSize: 14.5, color: '#b5b5b5', marginTop: 4.3, letterSpacing: 0.2,
        }}
        >
          {compte.bank}
        </Text>
      </Layout>

      <Layout style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Layout style={{
          backgroundColor: '#ffbe00',
          marginTop: 17,
          marginRight: 17,
          height: 30,
          width: 30,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 5,
          borderRadius: 30,
        }}
        >
          <Text style={{ color: '#fff' }}>3</Text>
        </Layout>

        <AntDesign name="right" size={14} color="#b5b5b5" onPress={onPress} style={{ marginRight: 11, marginTop: 17 }} />
      </Layout>

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 32,
    paddingBottom: 27,
    marginLeft: 7,
    borderRadius: 10,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowColor: '#b5b5b5',
    shadowOffset: {
      width: 0,
      height: 1,
    },

    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    justifyContent: 'space-between',
  },
});

export default OwnerCompte;
