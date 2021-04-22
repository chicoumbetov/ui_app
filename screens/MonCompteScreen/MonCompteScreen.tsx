/**
 * Mon Compte to visualise compte info or modify.
 *
 * @author: Shynggys UMBETOV
 */

import * as React from 'react';

import { Layout, Text } from '@ui-kitten/components';
import { Image, ScrollView } from 'react-native';
// import { API, graphqlOperation, DataStore } from 'aws-amplify';
import { useEffect, useState } from 'react';
import Informations from './Components/Informations';

// import { Client } from '../../src/models';
// import { getClient } from '../../src/graphql/queries';

import clientData from '../../mockData/clientDATA';

export default function MonCompteScreen() {
  const [clients, updateClients] = useState(clientData);
  // console.log('clients3:', clients);

  /*
  // DataStore connexion
  async function fetchClient() {
    try {
      const clients = await DataStore.query(Client);
      console.log('clients: ', clients);
    } catch (e) {
      console.log('Error retrieving posts', e);
    }
  }

  useEffect(() => {
    fetchClient();
    const subscription = DataStore.observe(Client).subscribe(() => getClient);
    return () => subscription.unsubscribe();
  });

  useEffect(() => {
    const fetchClient2 = async () => {
      try {
        const clientData = await API.graphql(
          graphqlOperation(
            getClient, {
              id: '4a62b89d-b6ab-48ee-b84e-d1b140e959c9',
            },
          ),
        );
        console.log('clientData: ', clientData);
      } catch (e) {
        console.log(e);
      }
    };
    fetchClient2();
  }, []);

 */

  return (
    <Layout style={{ flex: 1, backgroundColor: 'rgba(246, 246, 246, 0.5)' }}>
      <ScrollView>
        <Layout style={{ flex: 1 }}>
          <Layout style={{ flex: 1, backgroundColor: '#efefef', padding: 26 }}>
            <Text style={{ fontSize: 25, fontWeight: '500' }}>
              Mon Compte
            </Text>
            <Layout style={{ alignItems: 'center', backgroundColor: '#efefef', margin: 20 }}>
              <Image
                source={require('../../assets/Icones_omedom/avatars/avatar_1.png')}
                style={{ height: 100, width: 100 }}
              />

              <Text style={{ fontSize: 20, fontWeight: '500' }}>
                {clients.Client.fields[0].nom}
              </Text>
            </Layout>
          </Layout>
          <Layout style={{
            flex: 1, backgroundColor: '#efefef', padding: 26, marginTop: 20,
          }}
          >
            <Text style={{ fontSize: 25, fontWeight: '600', marginBottom: 20 }}>
              Informations
            </Text>
            <Informations clientData={clients} />
          </Layout>

        </Layout>
      </ScrollView>
    </Layout>
  );
}
