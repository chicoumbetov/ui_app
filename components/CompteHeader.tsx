import React from 'react';
import { Image, Text, View } from 'react-native';
import { CompteType } from '../types';

export type CompteProps = {
  compte: CompteType,
};

const CompteHeader = ({ compte }: CompteProps) => (
  <View style={{
    marginTop: 10, marginRight: 20, flexDirection: 'row', alignItems: 'center',
  }}
  >
    <Image source={require('../assets/Icones_omedom/logements/icones_log1.png')} style={{ height: 40, width: 40, marginRight: 12 }} />
    <Text style={{ fontSize: 16, fontWeight: '600' }}>
      {' '}
      {/* {compte.typeBien} */}
      La Maison
      {' '}
      de Mathieu
      {' '}
      {compte.prenom}
    </Text>
  </View>
);

export default CompteHeader;
