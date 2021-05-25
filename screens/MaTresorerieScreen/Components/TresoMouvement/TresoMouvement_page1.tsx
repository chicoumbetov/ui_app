import React, { useEffect, useState } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import CompteHeader from '../../../../components/CompteHeader/CompteHeader';
import comptesData from '../../../../mockData/comptesData';
import MouvementAttente from './MouvementAttente';
import MaxWidthContainer from '../../../../components/MaxWidthContainer';

const TresoMouvementPage1 = ({ compte }) => {
  const [client, setClient] = useState(comptesData);

  return (
    <MaxWidthContainer>
      <Layout style={{ backgroundColor: '#f6f6f6', padding: 26 }}>
        <Text category="h1" status="basic">
          Ma Trésorerie
        </Text>
        <Layout style={{ backgroundColor: 'transparent', marginTop: 20 }}>
          <CompteHeader title={client[0].title} />
        </Layout>

      </Layout>

      <Layout style={{
        marginVertical: 20, paddingVertical: 20, backgroundColor: '#f6f6f6', paddingHorizontal: 26,
      }}
      >
        <Text category="h5" style={{ paddingTop: 11 }}>
          Monsieur
          {' '}
          {client[0].data[0].nom}
          {' '}
          {client[0].data[0].prenom}
        </Text>
        <Text appearance="hint" style={{ paddingTop: 8 }}>
          FR
          {client[0].data[0].IBAN}
        </Text>
        <Text
          category="p2"
          appearance="hint"
          style={{ marginTop: 4.3 }}
        >
          {client[0].data[0].bank}
        </Text>
      </Layout>

      <Layout style={{
        flex: 1, marginBottom: 20, paddingVertical: 20, backgroundColor: '#f6f6f6', paddingHorizontal: 26,
      }}
      >
        <Text category="h2" style={{ borderRadius: 10, paddingTop: 11 }}>
          Mouvements
        </Text>

        <MouvementAttente />

      </Layout>

    </MaxWidthContainer>
  );
};

export default TresoMouvementPage1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  windowOut: {
    backgroundColor: '#f6f6f6',

  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#b5b5b5',
  },
  window: {
    flexDirection: 'row',
    marginTop: 35,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 37,
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
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 15,
    backgroundColor: 'transparent',
  },
  buttonTextRight: {
    color: '#0076c8',
    fontSize: 17.5,
    fontWeight: '600',
  },
});
