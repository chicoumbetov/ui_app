/**
 * Page 1 Mes Biens pour visualiser les biens
 *
 * @author: Shynggys UMBETOV
 */

import React, { useState } from 'react';
import { Layout, Text } from '@ui-kitten/components';

import {
  StyleSheet, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { View as MotiView } from 'moti';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';
import GraphicsII from '../../../components/Graphics/GraphicsII';
import Graphics from '../../../components/Graphics/Graphics';
import { colors } from '../../../assets/styles';
import comptesData from '../../../mockData/comptesData';
import Icon from '../../../components/Icon';
import RotatingIcon from '../../../components/Icon/RotatingIcon';

const mesBiensData = [
  { x: '35%', y: 35 },
  { x: '15%', y: 15 },
  { x: '15%', y: 15 },
  { x: '35%', y: 35 },
];

function MonBien() {
  const navigation = useNavigation();
  const [opened, setOpened] = useState(false);

  const onDetailsBiens = () => {
    navigation.navigate('DetailsBien');
  };

  return (
    <>
      <Layout style={{
        flexDirection: 'column', marginTop: 27, padding: 15, paddingBottom: 20, borderRadius: 10,
      }}
      >
        <TouchableOpacity onPress={() => setOpened(!opened)}>
          <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <CompteHeader title={comptesData[0].title} />
            <RotatingIcon name="arrow-up2" state={opened} />
          </Layout>
        </TouchableOpacity>

        {!opened ? (
          <>
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
                  <Text
                    style={{ ...styles.biensIncomeMouvement, color: colors.rouge }}
                  >
                    - 160 €
                  </Text>
                </Layout>
              </Layout>

              <Layout style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              >
                <Layout style={{ alignItems: 'center', flexDirection: 'row' }}>
                  <Icon
                    name="trending-up-outline"
                    size={20}
                    color={colors.gris}
                    style={{
                      marginTop: 14, marginRight: 8,
                    }}
                  />
                  <Text style={{ ...styles.biensIncomeMouvement, color: colors.jaune }}>60 %</Text>
                </Layout>
              </Layout>
            </Layout>
          </>
        ) : (
          <>
            <Layout style={{ borderBottomWidth: 0.3, borderBottomColor: colors.gris, marginVertical: 20 }} />

            <Layout style={{ flexDirection: 'row' }}>
              <Layout style={styles.oneThirdBlock}>
                <Text style={styles.text}>Dernier mouvement</Text>
                <Text style={styles.incomeMouvement}>+ 500 €</Text>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.buttonTextRight}>Affecter</Text>
                </TouchableOpacity>
              </Layout>

              <Layout style={styles.oneThirdBlock}>
                <Text style={styles.text}>
                  Prochaine dépense
                </Text>
                <Text style={{ ...styles.incomeMouvement, color: colors.rouge }}>- 160 €</Text>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.buttonTextRight}>En savoir +</Text>
                </TouchableOpacity>
              </Layout>

              <Layout style={styles.oneThirdBlock}>
                <Text style={styles.text}>
                  Réntabilité du bien
                </Text>
                <Text style={{ ...styles.incomeMouvement, color: colors.jaune }}>60 %</Text>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.buttonTextRight}>Mes rapports</Text>
                </TouchableOpacity>
              </Layout>
            </Layout>

            <TouchableOpacity onPress={onDetailsBiens}>
              <Layout style={styles.button}>
                <Text style={{ ...styles.buttonTextRight, color: colors.noir }}>Accéder au bien</Text>
              </Layout>
            </TouchableOpacity>
            <Graphics data={mesBiensData} />
            <GraphicsII />
          </>
        )}
      </Layout>
    </>
  );
}

export default MonBien;

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
