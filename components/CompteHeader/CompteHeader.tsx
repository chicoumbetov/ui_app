import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { Image } from 'react-native';

type TitleProps = {
  title: string
};

const CompteHeader = ({ title }: TitleProps) => (

  <Layout style={{
    marginRight: 20, flexDirection: 'row', backgroundColor: 'transparent',
  }}
  >
    <Image
      /* eslint-disable-next-line global-require */
      source={require('../../assets/Icones_omedom/logements/icones_log1.png')}
      style={{
        height: 40, width: 40, marginRight: 10,
      }}
    />

    <Text style={{
      fontSize: 21, fontWeight: '400', paddingTop: 12.5, letterSpacing: 0.2, fontFamily: 'HouschkaRoundedDemiBold',
    }}
    >
      {' '}
      La Maison de
      {' '}
      {title}
    </Text>
  </Layout>

);

export default CompteHeader;
