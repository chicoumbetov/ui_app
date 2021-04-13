import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { Image, ScrollView } from 'react-native';
import Informations from './Informations';

const MonCompte = () => (
  <ScrollView>
    <Layout style={{ flex: 1 }}>
      <Layout style={{ flex: 1, backgroundColor: '#efefef', padding: 26 }}>
        <Text style={{ fontSize: 25, fontWeight: '600' }}>
          Mon Compte
        </Text>
        <Layout style={{ alignItems: 'center', backgroundColor: '#efefef', margin: 20 }}>
          <Image
            source={require('../../assets/Icones_omedom/avatars/avatar_1.png')}
            style={{ height: 100, width: 100, marginRight: 12 }}
          />

          <Text style={{ fontSize: 20, fontWeight: '500' }}>
            Mathieu
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
        <Informations />
      </Layout>

    </Layout>
  </ScrollView>
);

export default MonCompte;
