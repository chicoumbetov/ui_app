import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';

const DeclarationImpots = () => {
  const navigation = useNavigation();

  return (
    <Layout style={styles.containerOut}>

      <Layout style={styles.container}>
        <Text style={styles.title}>Paramétrer mon aide à la déclaration d'impôts</Text>
        <Layout>
          <CompteHeader />
        </Layout>
      </Layout>

      <Layout style={styles.container}>
        <Text style={styles.subtitle}>Générer les documents</Text>
        <Layout style={styles.docs}>
          <Text style={styles.aideText}>Aide à la déclaration d impôts</Text>
          <TouchableOpacity onPress={() => {}}>
            <AntDesign name="right" size={11} style={{ color: '#b5b5b5' }} />
          </TouchableOpacity>
        </Layout>
      </Layout>

    </Layout>

  );
};

export default DeclarationImpots;

const styles = StyleSheet.create({
  containerOut: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  container: {
    padding: 24,
    marginBottom: 13,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
  title: {
    fontSize: 25,
    marginTop: 13,
    letterSpacing: 0.2,
    fontFamily: 'HouschkaRoundedDemiBold',
  },
  subtitle: {
    fontSize: 20,
    marginTop: 40,
    letterSpacing: 0.7,
    marginBottom: 39,
  },
  docs: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: 25,
    paddingVertical: 30,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 29,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 1,

    backgroundColor: '#fff',
    fontWeight: 'normal',
    borderColor: 'transparent',
    shadowColor: '#dedede',
  },
  aideText: {
    fontSize: 16,
    letterSpacing: 0.4,
    fontFamily: 'HouschkaRoundedMedium',
  },
  quittanceText: {
    fontSize: 16,
    letterSpacing: 0.4,
    fontFamily: 'HouschkaRoundedDemiBold',
  },
});
