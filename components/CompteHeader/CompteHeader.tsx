import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { Image } from 'react-native';

const CompteHeader = ({ title }) => (

  <Layout>
    <Layout>
      <Layout style={{
        marginRight: 20, flexDirection: 'row', alignItems: 'center',
      }}
      >
        <Image
          source={require('../../assets/Icones_omedom/logements/icones_log1.png')}
          style={{ height: 40, width: 40, marginRight: 12 }}
        />

        <Text style={{ fontSize: 20, fontWeight: '500' }}>
          {' '}
          La maison de
          {' '}
          {title}
        </Text>
      </Layout>
    </Layout>
  </Layout>

);

export default CompteHeader;
