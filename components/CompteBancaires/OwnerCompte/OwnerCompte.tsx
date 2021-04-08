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
      <Layout style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        justifyContent: 'space-between',
      }}
      >

        <Layout>
          <Text style={{
            color: '#222b45',
            fontSize: 16,
            fontWeight: '600',
          }}
          >
            Monsieur
            {' '}
            {compte.nom}
            {' '}
            {compte.prenom}
          </Text>
          <Text style={{ color: '#b5b5b5' }}>
            FR
            {compte.IBAN}
          </Text>
          <Text style={{ color: '#b5b5b5' }}>{compte.bank}</Text>
        </Layout>

        <Layout style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Layout style={{
            backgroundColor: '#ffbe00',
            marginHorizontal: 5,
            height: 30,
            width: 30,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5,
            borderRadius: 30,
          }}
          >
            <Text>3</Text>
          </Layout>

          <AntDesign name="right" size={24} color="#b5b5b5" onPress={onPress} />
        </Layout>

      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 15,
    borderRadius: 10,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowColor: '#b5b5b5',
  },
});

export default OwnerCompte;
