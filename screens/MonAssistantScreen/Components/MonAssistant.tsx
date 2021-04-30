import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MonAssistant = () => {
  const navigation = useNavigation();

  const onDeclarationImpots = () => {
    navigation.navigate('DeclarationImpots');
  };

  const onQuittanceLoyer = () => {
    navigation.navigate('QuittanceLoyer');
  };

  return (
    <Layout style={styles.containerOut}>
      <Layout style={styles.container}>
        <Text style={styles.title}>Mon Assistant</Text>
        <Text style={styles.subtitle}>Générer les documents</Text>

        <Layout style={styles.docs}>
          <Text style={styles.aideText}>Aide à la déclaration d'impôts</Text>
          <TouchableOpacity onPress={onDeclarationImpots}>
            <AntDesign name="right" size={13} style={{ color: '#b5b5b5', fontWeight: '700' }} />
          </TouchableOpacity>
        </Layout>

        <Layout style={styles.docs}>
          <Text style={styles.quittanceText}>Quittance de loyer</Text>
          <TouchableOpacity onPress={onQuittanceLoyer}>
            <AntDesign name="right" size={13} style={{ color: '#b5b5b5', fontWeight: '700' }} />
          </TouchableOpacity>
        </Layout>

      </Layout>
    </Layout>

  );
};

const styles = StyleSheet.create({
  containerOut: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
  container: {
    padding: 24,
    // marginVertical: 13,
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
    fontFamily: 'HouschkaRoundedDemiBold',
  },
  quittanceText: {
    fontSize: 16,
    letterSpacing: 0.4,
    fontFamily: 'HouschkaRoundedDemiBold',
  },
});

export default MonAssistant;
