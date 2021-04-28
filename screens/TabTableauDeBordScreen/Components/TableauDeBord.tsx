/**
 * Page d'acceuil
 *
 * @author: Shynggys UMBETOV, Amaury
 */

import React, { useEffect, useState } from 'react';
import { Button, Layout, Text } from '@ui-kitten/components';
import {
  FlatList,
  Image, LogBox, ScrollView, StyleSheet, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { colors } from '../../../assets/styles';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';
import comptesData from '../../../mockData/comptesData';

function TableauDeBord() {
  // to ignore warning
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const navigation = useNavigation();

  const [compte, setCompte] = useState(comptesData);

  const allerTresorie = () => {
    navigation.navigate('Ma Trésorerie');
  };
  const allerNotificaitons = () => {
    navigation.navigate('Notifications');
  };

  const onAjoutBien = () => {
    navigation.navigate('AjoutBienScreen');
  };

  return (
    <ScrollView style={{ backgroundColor: '#efefef' }}>

      {/**
       *  Trésorerie section
       */}
      <Layout style={styles.container}>
        <Text style={{ fontSize: 25, fontFamily: 'HouschkaRoundedDemiBold' }}>
          Trésorerie
        </Text>
        <Layout style={{
          flexDirection: 'column', marginTop: 27, padding: 15, paddingBottom: 20, borderRadius: 10,
        }}
        >
          <Layout style={{ flexDirection: 'row' }}>
            <Layout style={styles.oneThirdBlock}>
              <Text style={styles.text}>Dernier crédit</Text>
              <Text style={styles.incomeMouvement}>+ 500 €</Text>
              <Image
                source={require('../../../assets/Icones_omedom/logements/icones_log1.png')}
                style={styles.mouvementImage}
              />
            </Layout>

            <Layout style={styles.oneThirdBlock}>
              <Text style={styles.text}>
                Dernier débit
              </Text>
              <Text style={styles.mouvementText}>- 80 €</Text>
              <Image
                source={require('../../../assets/Icones_omedom/logements/icones_log4.png')}
                style={styles.mouvementImage}
              />
            </Layout>

            <Layout style={styles.oneThirdBlock}>
              <Text style={styles.text}>
                Prochain mouvement
              </Text>
              <Text style={styles.mouvementText}>- 160 €</Text>
              <Image
                source={require('../../../assets/Icones_omedom/logements/icones_log1.png')}
                style={styles.mouvementImage}
              />
            </Layout>
          </Layout>
        </Layout>
        <Text style={styles.buttonText} onPress={allerTresorie}>Accéder à la trésorerie</Text>
      </Layout>

      {/**
      *  Mes Biens section
      */}
      <Layout style={styles.containerBiens}>
        <Text style={{ fontSize: 25, letterSpacing: 0.5, fontFamily: 'HouschkaRoundedDemiBold' }}>
          Mes Biens
        </Text>

        <FlatList
          data={comptesData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Layout style={{
              flexDirection: 'column', marginTop: 28, padding: 17, borderRadius: 10,
            }}
            >
              <TouchableOpacity onPress={() => {}} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <CompteHeader title={item.title} />
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
          )}
        />

        <Button
          style={{ marginVertical: 32 }}
          onPress={() => { onAjoutBien(); }}
        >
          Ajouter un nouveau bien
        </Button>
      </Layout>

      {/**
       *  Notifications
       */}
      <Layout style={styles.container}>
        <Text style={{ fontSize: 25, marginTop: -5, fontFamily: 'HouschkaRoundedDemiBold' }}>
          Notifications
        </Text>
        <Layout style={{
          flexDirection: 'column', marginTop: 27, padding: 15, paddingBottom: 20, borderRadius: 10,
        }}
        >

          <Layout style={{
            marginRight: 20, flexDirection: 'row', backgroundColor: 'transparent',
          }}
          >
            <Image
                  /* eslint-disable-next-line global-require */
              source={require('../../../assets/Icones_omedom/logements/icones_log1.png')}
              style={{
                height: 41, width: 41, marginRight: 18,
              }}
            />

            <Text style={{
              fontSize: 15, width: 245, paddingTop: 12.5, letterSpacing: 0.2, fontFamily: 'HouschkaRoundedDemiBold',
            }}
            >
              Un mouvement négatif a été détécté
            </Text>
            <AntDesign name="right" size={12.5} style={{ color: '#b5b5b5', alignItems: 'center', marginTop: 15 }} />
          </Layout>

        </Layout>
        <Text style={styles.buttonText} onPress={allerNotificaitons}>Consulter les notifications</Text>
      </Layout>

    </ScrollView>

  );
}

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

export default TableauDeBord;
