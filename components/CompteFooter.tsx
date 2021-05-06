import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const CompteFooter = () => {
  const navigation = useNavigation();
  const onPress = () => {
    console.warn('Button pressed');
  };
  const onAjoutCompte = () => {
    navigation.navigate('AjoutCompte');
  };

  return (
    <Layout style={styles.button}>
      <TouchableOpacity onPress={onAjoutCompte}>
        <Layout style={styles.button}>
          <Text category="h5" status="info" style={{ marginLeft: 6 }}>Ajouter un compte</Text>
        </Layout>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <Layout style={styles.button}>
          <Text category="h5">Supprimer un compte</Text>
        </Layout>
      </TouchableOpacity>
    </Layout>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', backgroundColor: 'transparent',
  },
  separator: { borderBottomWidth: 1, borderBottomColor: '#b5b5b5' },

});

export default CompteFooter;
