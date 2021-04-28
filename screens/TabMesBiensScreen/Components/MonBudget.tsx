/**
 * Page 2 Mes Biens - DetailsBiens
 *
 * @author: Shynggys UMBETOV
 */

import React, { useEffect, useState } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import {
  Image, LogBox, ScrollView, StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import comptesData from '../../../mockData/comptesData';

function MonBudget() {
  // to ignore warning
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const navigation = useNavigation();

  const [compte, setCompte] = useState(comptesData);

  const allerTresorie = () => {
    navigation.navigate('Ma Trésorerie');
  };

  return (
    <ScrollView style={{ backgroundColor: '#efefef' }}>

      {/**
             *  I. Details du bien
             */}
      <Layout style={{ ...styles.container, marginTop: 0 }}>
        <Text style={{ fontSize: 25, fontFamily: 'HouschkaRoundedDemiBold' }}>
          Détails du bien
        </Text>
        <Layout style={{ alignItems: 'center', backgroundColor: 'transparent', marginVertical: 30 }}>
          <Image
            source={require('../../../assets/Icones_omedom/logements/icones_log1.png')}
            style={{ height: 100, width: 100, marginRight: 12 }}
          />
          <Text style={{ fontSize: 21, fontFamily: 'HouschkaRoundedDemiBold' }}>
            La Maison de JP
          </Text>
        </Layout>

      </Layout>
    </ScrollView>
  );
}

export default MonBudget;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
    marginTop: 12,
    paddingVertical: 25,
    paddingHorizontal: 26,
  },
  mainTitle: {
    fontFamily: 'Houschka_Rounded_Alt_Light_Regular',
    fontSize: 22,
    paddingBottom: 30,
  },
});
