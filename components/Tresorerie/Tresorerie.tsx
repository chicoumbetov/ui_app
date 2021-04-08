import React from 'react';
import { Text, View } from 'react-native';

import ComptesBancaires from '../CompteBancaires/ComptesBancaires';

const MaTresorerie = () => (
  <View style={{ backgroundColor: '#efefef', padding: 26 }}>
    <Text style={{ fontSize: 34, fontWeight: '600' }}>
      Ma Trésorerie
    </Text>
    <View style={{
      flexDirection: 'row', backgroundColor: '#fff', marginTop: 20, padding: 20, borderRadius: 10,
    }}
    >

      <View style={{
        flex: 1,
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: '#b5b5b5',
      }}
      >
        <Text style={{ justifyContent: 'center', color: '#b5b5b5' }}>Dernier crédit</Text>
        <Text style={{ marginTop: 10, fontWeight: '600', color: '#00c29a' }}> + 500 €</Text>
      </View>

      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ justifyContent: 'center', color: '#b5b5b5' }}>Dernier débit</Text>
        <Text style={{ marginTop: 10, fontWeight: '600', color: '#ff5640' }}> - 80 €</Text>
      </View>

    </View>
    <ComptesBancaires />
  </View>
);

export default MaTresorerie;
