/**
 * Page 1 Mes Biens pour visualiser les biens
 *
 * @author: Shynggys UMBETOV
 */

import React from 'react';
import { Layout, Text } from '@ui-kitten/components';

import {
  ScrollView, StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../assets/styles';
import MonBien from './MonBien';

function MesBiens() {
  const navigation = useNavigation();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: '#efefef', marginTop: 12 }}
    >
      <Layout style={{ backgroundColor: '#f6f6f6', padding: 26 }}>
        <Text style={{
          fontSize: 24.5, letterSpacing: 0.2, fontFamily: 'HouschkaRoundedDemiBold', marginBottom: 20,
        }}
        >
          Mes Biens
        </Text>

        <MonBien />
        <MonBien />

      </Layout>
    </ScrollView>
  );
}

export default MesBiens;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
    marginTop: 12,
    paddingTop: 38,

    paddingHorizontal: 26,
  },
  containerBiens: {
    backgroundColor: '#f6f6f6',
    marginTop: 12,
    paddingTop: 38,

    paddingHorizontal: 23,
  },

  // Part I
  oneThirdBlock: {
    flex: 1,
    marginTop: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
    width: 94,
    letterSpacing: 0.005,
    lineHeight: 20,
    justifyContent: 'center',
    color: colors.gris,
    fontFamily: 'HouschkaRoundedDemiBold',
    textAlign: 'center',
  },
  incomeMouvement: {
    fontSize: 18.5,
    marginVertical: 14,
    letterSpacing: 0.6,
    color: '#00c29a',
    fontFamily: 'HouschkaRoundedDemiBold',
  },

  biensIncomeMouvement: {
    fontSize: 17,
    marginTop: 14,
    letterSpacing: 0.6,
    color: colors.vert2,
    fontFamily: 'HouschkaRoundedDemiBold',
  },

  buttonText: {
    fontSize: 16.5,
    marginTop: 21,
    marginBottom: 35,
    letterSpacing: 0.15,
    fontFamily: 'HouschkaRoundedDemiBold',
    color: colors.bleu,
  },

  // Button ignorer les mouvements
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 30,
    backgroundColor: 'transparent',
  },
  buttonTextRight: {
    color: colors.bleu,
    fontSize: 17.5,
    fontFamily: 'HouschkaRoundedDemiBold',
  },
});
