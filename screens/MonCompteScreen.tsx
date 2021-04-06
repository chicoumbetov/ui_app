import * as React from 'react';

import {View} from '../components/Themed';
import MonCompte from "../components/MonCompte/MonCompte";

export default function MonCompteScreen() {
  return (
      <View style={{ marginTop: 40, padding: 7 }}>
        <MonCompte/>
      </View>
  );
}
