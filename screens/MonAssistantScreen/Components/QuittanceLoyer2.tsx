import React from 'react';
import { Icon, Layout, Text } from '@ui-kitten/components';
import { StyleSheet, TouchableOpacity } from 'react-native';

import CompteHeader from '../../../components/CompteHeader/CompteHeader';
import clientData from '../../../mockData/clientDATA';

const QuittanceLoyer2 = () => (
  // const onPdf = () => { navigation.navigate('PdfScreen'); };
  <Layout style={styles.containerOut}>

    <Layout style={styles.container}>
      <Text category="h1" style={{ marginBottom: 6 }}>Générer une quittance de loyer</Text>
      <Layout style={{ marginTop: 20, backgroundColor: 'transparent' }}>
        <CompteHeader title={clientData.Client.fields[1].prenom} />
      </Layout>
    </Layout>

    <Layout style={styles.containerDocument}>
      <Text category="h2" style={{ marginBottom: 41 }}>Votre document est prêt</Text>
      <Layout style={styles.docs}>
        <Text category="p2">Quittance_Loyer_Maison_de_JP</Text>

        <Layout style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => {}}>
            <Icon name="cloud-download" fill="#b5b5b5" style={{ height: 20, width: 20, marginRight: 24 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Icon name="eye" fill="#b5b5b5" style={{ height: 20, width: 20 }} />
          </TouchableOpacity>

        </Layout>
      </Layout>
    </Layout>

  </Layout>

);

export default QuittanceLoyer2;

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
  containerDocument: {
    flex: 1,
    paddingLeft: 27,
    paddingRight: 18,
    paddingTop: 33,
    marginBottom: 13,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
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
    borderColor: 'transparent',
    shadowColor: '#dedede',
  },
});
