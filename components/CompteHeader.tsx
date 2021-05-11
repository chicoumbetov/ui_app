import React from 'react';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { CompteType } from '../types';
import MaxWidthContainer from './MaxWidthContainer';
import MaisonVert from '../assets/Omedom_Icons_svg/Logement/maison_verte.svg';

export type CompteProps = {
  title: string,
  id: string,
  data: CompteType,
};

const CompteHeader = ({ data }: CompteProps) => (
  <MaxWidthContainer>
    <View style={{
      marginTop: 10, marginRight: 20, flexDirection: 'row', alignItems: 'center',
    }}
    >
      <View style={{ marginRight: 12 }}>
        <MaisonVert height={40} width={40} />
      </View>
      <Text category="h5" style={{ marginRight: 12 }}>
        {' '}
        {/* {compte.typeBien} */}
        La Maison
        {' '}
        de Mathieu
        {' '}
        {data.prenom}
      </Text>
    </View>
  </MaxWidthContainer>
);

export default CompteHeader;
