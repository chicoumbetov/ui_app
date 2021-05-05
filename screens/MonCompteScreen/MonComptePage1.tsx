/**
 * Mon Compte to visualise compte info or modify.
 *
 * @author: Shynggys UMBETOV
 */

import * as React from 'react';

import { Layout, Text } from '@ui-kitten/components';
import {
  Image, ScrollView, StyleSheet,
} from 'react-native';
// import { API, graphqlOperation, DataStore } from 'aws-amplify';
import { useState } from 'react';
import Informations from './Components/Informations';

// import { Client } from '../../src/models';
// import { getClient } from '../../src/graphql/queries';

import clientData from '../../mockData/clientDATA';
import Abonnement from './Components/Abonnement';

export default function MonComptePage1() {
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
    <Layout style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        <Layout style={{
          flex: 1, backgroundColor: 'rgba(246, 246, 246, 0.5)', paddingHorizontal: 22, paddingTop: 37,
        }}
        >
          <Text category="h1">
            Mon Compte
          </Text>
          <Layout style={{
            alignItems: 'center', backgroundColor: 'rgba(246, 246, 246, 0.5)', marginTop: 41, marginBottom: 34,
          }}
          >
            <Image
              source={require('../../assets/Icones_omedom/avatars/avatar_1.png')}
              style={{ height: 109, width: 108 }}
            />

            <Text style={{ fontSize: 22, fontWeight: '400', marginTop: 15 }}>
              {clients.Client.fields[0].nom}
            </Text>
          </Layout>
        </Layout>

        <Informations clientData={clients} />
        <Abonnement clientData={clients} />

      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#efefef',
  },
});
