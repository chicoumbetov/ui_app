import React, { useEffect } from 'react';
import { Layout, Text } from '@ui-kitten/components';

// import { API, graphqlOperation } from 'aws-amplify';
import ComptesBancaires from '../CompteBancaires/ComptesBancaires';
// import { listComptes } from '../../src/graphql/queries';
/*
  useEffect(() => {
    const fetchCompte = async () => {
      // fetchCompte
      try {
        const response = await API.graphql(graphqlOperation(listComptes));
        console.log(response);
      } catch (e) {
        console.error(e);
      }
      fetchCompte();
    };
  }, []);
*/

const MaTresorerie = () => (
  <Layout style={{ backgroundColor: 'transparent', margin: 20 }}>
    <Text style={{ fontSize: 34, fontWeight: '600' }}>
      Ma Trésorerie
    </Text>
    <Layout style={{
      flexDirection: 'row', backgroundColor: '#fff', marginTop: 20, padding: 20, borderRadius: 10,
    }}
    >

      <Layout style={{
        flex: 1,
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: '#b5b5b5',
      }}
      >
        <Text style={{ justifyContent: 'center', color: '#b5b5b5' }}>Dernier crédit</Text>
        <Text style={{ marginTop: 10, fontWeight: '600', color: '#00c29a' }}> + 500 €</Text>
      </Layout>

      <Layout style={{
        flex: 1,
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: '#b5b5b5',
        justifyContent: 'space-between',
      }}
      >
        <Text style={{ justifyContent: 'center', color: '#b5b5b5', margin: 1 }}>Dernier débit</Text>
        <Text style={{ marginTop: 10, fontWeight: '600', color: '#ff5640' }}> - 80 €</Text>
      </Layout>

      <Layout style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ justifyContent: 'center', color: '#b5b5b5' }}>Prochain mouvement</Text>
        <Text style={{ marginTop: 10, fontWeight: '600', color: '#ff5640' }}> - 160 €</Text>
      </Layout>

    </Layout>
    <ComptesBancaires />
  </Layout>
);

export default MaTresorerie;
