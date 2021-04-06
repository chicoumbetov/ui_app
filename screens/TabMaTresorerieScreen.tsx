import * as React from 'react';

import {View} from '../components/Themed';
import MaTresorerie from "../components/Tresorerie/Tresorerie";

export default function TabMaTresorerieScreen() {
  return (
    <View style={{ marginTop: 40}}>
      <View>
        <MaTresorerie/>
      </View>
    </View>
  );
}
