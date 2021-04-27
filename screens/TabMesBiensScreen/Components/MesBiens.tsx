/**
 * Page 1 Mes Biens pour visualiser les biens
 *
 * @author: Shynggys UMBETOV
 */

import React, { useEffect } from 'react';
import { Layout, Text } from '@ui-kitten/components';

import {
  LogBox, ScrollView, StyleSheet, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';
import GraphicsII from '../../../components/Graphics/GraphicsII';
import Graphics from '../../../components/Graphics/Graphics';
import { colors } from '../../../assets/styles';

function MesBiens() {
  // to ignore warning
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const navigation = useNavigation();

  const onDetailsDuBien = () => {
    console.warn('Pressed');
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <Layout style={{ backgroundColor: '#efefef', padding: 26 }}>
        <Text style={{ fontSize: 34, fontWeight: '600' }}>
          Mes Biens
        </Text>
        <Layout style={{
          flexDirection: 'column',
          backgroundColor: '#fff',
          marginTop: 20,
          padding: 15,
          borderRadius: 10,
        }}
        >
          <CompteHeader />
          <Layout style={{ flexDirection: 'row' }}>
            <Layout style={{
              flex: 1,
              alignItems: 'center',
              borderRightColor: '#b5b5b5',
              borderRightWidth: 1,
              justifyContent: 'space-between',
            }}
            >
              <Text style={{ justifyContent: 'center', color: '#b5b5b5' }}>Dernier crédit</Text>
              <Text style={{ marginTop: 10, fontWeight: '600', color: '#00c29a' }}> + 500 €</Text>
              <TouchableOpacity>
                <Text style={{ color: colors.bleu }}>Affecter</Text>
              </TouchableOpacity>
            </Layout>

            <Layout style={{
              flex: 1,
              alignItems: 'center',
              borderRightWidth: 1,
              borderRightColor: '#b5b5b5',
              justifyContent: 'space-between',
            }}
            >
              <Text style={{ justifyContent: 'center', color: '#b5b5b5' }}>Dernier débit</Text>
              <Text style={{ marginTop: 10, fontWeight: '600', color: '#ff5640' }}> - 80 €</Text>
              <TouchableOpacity>
                <Text style={{ color: colors.bleu }}>En savoir +</Text>
              </TouchableOpacity>
            </Layout>

            <Layout style={{ flex: 1, justifyContent: 'space-between' }}>
              <Text style={{ alignItems: 'center', color: '#b5b5b5' }}>Prochain mouvement</Text>
              <Text style={{ marginTop: 10, fontWeight: '600', color: '#ff5640' }}> - 160 €</Text>
              <TouchableOpacity>
                <Text style={{ color: colors.bleu }}>Mes rapports</Text>
              </TouchableOpacity>
            </Layout>
          </Layout>

        </Layout>
        <Graphics />
        <GraphicsII />

        <Layout style={{
          flexDirection: 'column', marginTop: 28, padding: 17, borderRadius: 10,
        }}
        >
          <TouchableOpacity onPress={() => {}} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <CompteHeader />
            <AntDesign name="right" size={12.5} style={{ color: '#b5b5b5', marginRight: 5, marginTop: 8 }} />
          </TouchableOpacity>

          <Layout style={{ flexDirection: 'row', marginTop: 8, marginBottom: 5 }}>
            <Layout style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            >

              <Layout style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Ionicons
                  name="swap-vertical"
                  size={18}
                  style={{
                    marginTop: 14, marginRight: 8, color: '#b5b5b5',
                  }}
                />
                <Text style={styles.biensIncomeMouvement}>+ 10 800 €</Text>
              </Layout>
            </Layout>

            <Layout style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            >
              <Layout style={{ alignItems: 'center', flexDirection: 'row' }}>
                <AntDesign name="arrowdown" size={13} style={{ marginTop: 14, color: '#b5b5b5' }} />
                <Text style={styles.mouvementText}>- 160 €</Text>
              </Layout>
            </Layout>

            <Layout style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            >
              <Layout style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Feather
                  name="trending-up"
                  size={14}
                  style={{
                    marginTop: 14, marginRight: 8, fontWeight: 'bold', color: '#b5b5b5',
                  }}
                />
                <Text style={styles.mouvementPourcent}>60 %</Text>
              </Layout>
            </Layout>
          </Layout>

        </Layout>

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
    marginTop: 14,
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
  mouvementText: {
    fontSize: 18,
    fontFamily: 'HouschkaRoundedDemiBold',
    marginTop: 13,
    color: colors.rouge,
  },
  mouvementPourcent: {
    fontSize: 18,
    fontFamily: 'HouschkaRoundedDemiBold',
    marginTop: 13,
    color: colors.jaune,
  },
  mouvementImage: {
    height: 42,
    width: 44,
    marginRight: 3,
    marginTop: 15,
  },
  buttonText: {
    fontSize: 16.5,
    marginTop: 21,
    marginBottom: 35,
    letterSpacing: 0.15,
    fontFamily: 'HouschkaRoundedDemiBold',
    color: colors.bleu,
  },
});
