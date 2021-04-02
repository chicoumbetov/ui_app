import * as React from 'react';

import { Text, View } from '../components/Themed';
import OwnerCompte from "../components/CompteBancaires/OwnerCompte";

export default function TabMaTresorerieScreen() {
  return (
    <View style={{ marginTop: 40}}>
      <View style={{ backgroundColor: '#dcdcdc' }}>
        <Text style={{ fontSize: 22 }}>
          Ma Trésorerie
        </Text>
        <View style={{ backgroundColor: '#fff', marginTop: 20, padding: 30, borderRadius: 10, }} >
          <View style={{ flexDirection: 'row'}}>
            <View style={{ flex: 1, borderWidth: 1, alignItems: 'center' }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ borderWidth: 1, justifyContent: 'center' }}>Dernier crédit</Text>
              </View>

              <Text style={{ marginTop: 10, fontWeight: '800', color: 'green' }}> + 500 €</Text>

            </View>

            <View style={{ flex: 1, borderWidth: 1, alignItems: 'center'  }}>
              <Text>Dernier débit</Text>
              <Text style={{ marginTop: 10, fontWeight: '800', color: 'red' }}> - 80 €</Text>

            </View>
          </View>
        </View>
      </View>
      <View>
        <OwnerCompte/>
      </View>
    </View>
  );
}
