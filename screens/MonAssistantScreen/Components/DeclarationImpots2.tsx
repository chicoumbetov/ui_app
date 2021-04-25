import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo, SimpleLineIcons } from '@expo/vector-icons';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';
import clientData from '../../../mockData/clientDATA';

const DeclarationImpots = () => (
  // const onPdf = () => { navigation.navigate('PdfScreen'); };
  <Layout style={styles.containerOut}>

    <Layout style={styles.container}>
      <Text style={styles.title}>Paramétrer mon aide à la déclaration d'impôts</Text>
      <Layout style={{ marginTop: 20, backgroundColor: 'transparent' }}>
        <CompteHeader title={clientData.Client.fields[1].prenom} />
      </Layout>
    </Layout>

    <Layout style={styles.containerDocument}>
      <Text style={styles.subtitle}>Votre document est prêt</Text>
      <Layout style={styles.docs}>
        <Text style={styles.aideText}>Aide_Déclaration_Impôts_2021</Text>

        <Layout style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => {}}>
            <SimpleLineIcons name="cloud-download" size={14} style={{ color: '#b5b5b5', paddingRight: 25 }} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Entypo name="eye" size={16.5} style={{ color: '#b5b5b5', paddingRight: 3.5 }} />
          </TouchableOpacity>
        </Layout>
      </Layout>
    </Layout>

  </Layout>

);
export default DeclarationImpots;

const styles = StyleSheet.create({
  containerOut: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  container: {
    paddingHorizontal: 27,
    paddingTop: 44,
    paddingBottom: 35,
    marginBottom: 13,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
  title: {
    fontSize: 25,
    marginBottom: 6,
    lineHeight: 30,
    letterSpacing: 0.3,
    fontFamily: 'HouschkaRoundedDemiBold',
  },
  containerDocument: {
    flex: 1,
    paddingLeft: 27,
    paddingRight: 18,
    paddingTop: 33,
    marginBottom: 13,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'HouschkaRoundedMedium',
    letterSpacing: 0.6,
    marginBottom: 41,
  },
  docs: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
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
    fontSize: 15,
    letterSpacing: 0.01,
    fontFamily: 'HouschkaRoundedMedium',
  },
  quittanceText: {
    fontSize: 16,
    letterSpacing: 0.4,
    fontFamily: 'HouschkaRoundedDemiBold',
  },
});
