/**
 * Mon Compte to visualise compte info or modify.
 *
 * @author: Shynggys UMBETOV
 */
import * as React from 'react';
import { Layout, Text } from '@ui-kitten/components';

import { useState } from 'react';
import { DataStore } from 'aws-amplify';
import Informations from './Components/Informations';
import Abonnement from './Components/Abonnement';
import MaxWidthContainer from '../../components/MaxWidthContainer';

import ManAvatar from '../../assets/Omedom_Icons_svg/Avatars/manAvatar.svg';
import clientData from '../../mockData/clientDATA';

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

    <MaxWidthContainer outerViewProps={{
      style: {
        backgroundColor: '#efefef',
      },
    }}
    >

      <Layout style={{
        backgroundColor: '#f6f6f6', paddingHorizontal: 46, paddingTop: 37,
      }}
      >
        <Text category="h1">
          Mon Compte
        </Text>
        <Layout style={{
          alignItems: 'center', backgroundColor: 'transparent', marginTop: 41, marginBottom: 34,
        }}
        >
          <ManAvatar height={109} width={108} />
          <Text category="h2" style={{ marginTop: 15 }}>
            {clients.Client.fields[0].nom}
          </Text>

        </Layout>
      </Layout>

      <Informations clientData={clients} />
      <Abonnement />

    </MaxWidthContainer>
  );
}
