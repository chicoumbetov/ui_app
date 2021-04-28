/**
 * Navigator pour basculer entre les pages de section Biens
 *
 * @author: Shynggys UMBETOV
 */

import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Layout } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import DetailsBien from './Components/DetailsDuBien';
import MesBiens from './Components/MesBiens';
import HeaderLeftOpenDrawerNavigation from '../../navigation/HeaderLeftOpenDrawerNavigation';
import MonBudget from './Components/MonBudget';
import ParametrerAjoutRevenu from './Components/ParametrerAjoutRevenu';
import ParametrerAjoutCharges from './Components/ParametrerAjoutCharges';
import PartagerBien from './Components/PartagerBien';
import ModifierCharacteristiques from './Components/ModifierCharacteristiques';

const Stack = createStackNavigator();

export default function TabMesBiensScreen({ navigation }) {
  return (
    <Layout style={{ flex: 1, backgroundColor: '#efefef' }}>
      <MesBiens />
    </Layout>
  );
}
