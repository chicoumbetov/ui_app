import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

const Informations = () => {
  const onPress = () => {
    console.warn('Button pressed');
  };
  return (
    <Layout style={styles.container}>
      <Text>Modifier vos informations</Text>

      <TouchableOpacity onPress={onPress}>
        <Text style={styles.buttonTextLeft}>Valider</Text>
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
