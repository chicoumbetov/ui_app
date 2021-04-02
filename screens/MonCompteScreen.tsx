import * as React from 'react';
import { Image } from 'react-native';

import { Text, View } from '../components/Themed';

export default function MonCompteScreen() {
  return (
      <View style={{ marginTop: 40}}>
        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../assets/images/img.png')}/>
          <Text> La Maison de Mathieu</Text>
        </View>
      </View>
  );
}