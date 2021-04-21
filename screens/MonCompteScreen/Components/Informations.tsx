import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

const Informations = () => {
  const onPress = () => {
    console.warn('Button pressed');
  };
  // eslint-disable-next-line implicit-arrow-linebreak
  return (
    <Layout style={styles.container}>

      {/* use SectionList to render several accounts with its types and details */}
      <Layout style={styles.compteSection}>
        <Text>Date de naissance</Text>
        <Text style={{ color: '#b5b5b5' }}>Informations</Text>
        <Layout style={{ borderBottomWidth: 1, borderBottomColor: '#b5b5b5', marginVertical: 10 }} />

        <Text>Adresse mail</Text>
        <Text style={{ color: '#b5b5b5' }}>Informations</Text>
        <Layout style={{ borderBottomWidth: 1, borderBottomColor: '#b5b5b5', marginVertical: 10 }} />

        <Text>Ville</Text>
        <Text style={{ color: '#b5b5b5' }}>Informations</Text>
        <Layout style={{ borderBottomWidth: 1, borderBottomColor: '#b5b5b5', marginVertical: 10 }} />

        <Text>Numéro de téléphone</Text>
        <Text style={{ color: '#b5b5b5' }}>Informations</Text>
      </Layout>

      <TouchableOpacity onPress={onPress}>
        <Text style={styles.buttonTextLeft}>Modifier les informations</Text>
      </TouchableOpacity>

    </Layout>

  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
  compteSection: {
    paddingTop: 10,
    padding: 20,
    borderRadius: 10,
  },
  buttonTextLeft: {
    color: '#0076c8',
    fontSize: 14,
    marginTop: 10,
    fontWeight: '600',
    backgroundColor: 'transparent',
  },
});

export default Informations;
