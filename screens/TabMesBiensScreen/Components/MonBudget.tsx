/**
 * Page 2 Mes Biens - DetailsBiens
 *
 * @author: Shynggys UMBETOV
 */

import React, { useEffect, useState } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import {
  FlatList,
  Image, LogBox, ScrollView, StyleSheet, TouchableOpacity, View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import comptesData from '../../../mockData/comptesData';

import { colors } from '../../../assets/styles';
import Icon from '../../../components/Icon';

function MonBudget() {
  const navigation = useNavigation();

  const [compte, setCompte] = useState(comptesData);

  const allerTresorerie = () => {
    console.warn('Go to Tresorerie');
  };

  const allerAjoutRevenu = () => {
    navigation.navigate('ParametrerAjoutRevenu');
  };

  const allerAjoutCharge = () => {
    navigation.navigate('ParametrerAjoutCharges');
  };

  return (
    <ScrollView style={{ backgroundColor: '#efefef' }}>

      {/**
             *  I. Mon Budget
             */}
      <Layout style={{ ...styles.container, marginTop: 0 }}>
        <Text style={{ fontSize: 25, fontFamily: 'HouschkaRoundedDemiBold' }}>
          Mon Budget
        </Text>
        <View style={{
          marginTop: 10, marginRight: 20, flexDirection: 'row', alignItems: 'center',
        }}
        >
          <Image source={require('../../../assets/Icones_omedom/logements/icones_log1.png')} style={{ height: 40, width: 40, marginRight: 12 }} />
          <Text style={{ fontSize: 19, fontFamily: 'HouschkaRoundedDemiBold' }}>
            {' '}
            {/* {compte.typeBien} */}
            La Maison
            {' '}
            de Mathieu
            {' '}
          </Text>
        </View>
      </Layout>

      {/**
      *     Revenus
      */}
      <Layout style={styles.container}>

        <Layout style={{ backgroundColor: 'transparent', flexDirection: 'row' }}>
          <Icon name="arrow-up2" size={18} style={{ marginRight: 10, marginTop: 5 }} />
          <Text style={{ ...styles.mainTitle, color: colors.green }}>
            Revenus
          </Text>
        </Layout>

        <FlatList
          data={comptesData}
          keyExtractor={(item) => item.id}
          renderItem={() => (

            <Layout style={styles.window}>
              <Layout style={{
                flex: 1,
                borderRightWidth: 1,
                borderRightColor: '#b5b5b5',
              }}
              >

                <Text style={{
                  fontSize: 18,
                  letterSpacing: 0.5,
                  fontWeight: '600',
                  color: '#00c29a',
                  justifyContent: 'center',
                }}
                >
                  + 500 €
                </Text>

                <Text style={{ fontSize: 16, color: '#b5b5b5' }}>10/03/2021</Text>
                <Text style={{ fontSize: 14, color: '#b5b5b5' }}>Libellé du mouvement</Text>
              </Layout>

              <Layout style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              >
                <Text style={{
                  fontSize: 18, letterSpacing: 0.4, marginLeft: 15, fontWeight: '800', color: 'orange',
                }}
                >
                  En attente
                </Text>

              </Layout>
            </Layout>

          )}
        />

        <Layout style={styles.button}>
          <TouchableOpacity onPress={allerAjoutRevenu}>
            <Layout style={styles.button}>
              <Text style={styles.buttonTextLeft}>Ajouter un compte</Text>
            </Layout>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Layout style={styles.button}>
              <Text style={styles.buttonTextRight}>Supprimer un compte</Text>
            </Layout>
          </TouchableOpacity>
        </Layout>

      </Layout>

      {/**
       *     Charge
       */}
      <Layout style={styles.container}>

        <Layout style={{ backgroundColor: 'transparent', flexDirection: 'row' }}>
          <Icon name="arrow-down2" size={18} style={{ marginRight: 10, marginTop: 5, color: colors.rouge }} />
          <Text style={{ ...styles.mainTitle, color: colors.rouge }}>
            Charges
          </Text>
        </Layout>

        <FlatList
          data={comptesData}
          keyExtractor={(item) => item.id}
          renderItem={() => (

            <Layout style={styles.window}>
              <Layout style={{
                flex: 1,
                borderRightWidth: 1,
                borderRightColor: '#b5b5b5',
              }}
              >

                <Text style={{
                  fontSize: 18,
                  letterSpacing: 0.5,
                  fontWeight: '600',
                  color: '#00c29a',
                  justifyContent: 'center',
                }}
                >
                  + 500 €
                </Text>

                <Text style={{ fontSize: 16, color: '#b5b5b5' }}>10/03/2021</Text>
                <Text style={{ fontSize: 14, color: '#b5b5b5' }}>Libellé du mouvement</Text>
              </Layout>

              <Layout style={{
                flex: 1,
                marginLeft: 10,
              }}
              >
                <Text style={{
                  fontSize: 18,
                  letterSpacing: 0.5,
                  fontWeight: '600',
                  color: '#00c29a',
                  justifyContent: 'center',
                }}
                >
                  + 500 €
                </Text>

                <Text style={{ fontSize: 16, color: colors.noir }}>10/03/2021</Text>
                <Text style={{ fontSize: 14, color: '#b5b5b5' }}>Libellé du mouvement</Text>

              </Layout>
            </Layout>

          )}
        />

        <Layout style={styles.button}>
          <TouchableOpacity onPress={allerAjoutCharge}>
            <Layout style={styles.button}>
              <Text style={styles.buttonTextLeft}>Ajouter un compte</Text>
            </Layout>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Layout style={styles.button}>
              <Text style={styles.buttonTextRight}>Supprimer un compte</Text>
            </Layout>
          </TouchableOpacity>
        </Layout>

      </Layout>

      {/**
      *       Aller Tresorerie
      */}
      <Layout style={styles.container}>

        <Text style={{
          fontSize: 16, fontFamily: 'HouschkaRoundedDemiBold', letterSpacing: 0.2, marginBottom: 20,
        }}
        >
          Consulter la trésorerie pour affecter les mouvements bancaires
        </Text>
        {/**   1   */}
        <Layout style={{ ...styles.docs, marginBottom: 10, justifyContent: 'center' }}>

          <TouchableOpacity
            onPress={allerTresorerie}
            style={{
              flexDirection: 'row', alignItems: 'center',
            }}
          >
            <Icon name="money" size={30} color={colors.green} style={{ marginRight: 10 }} />
            <Text style={{
              fontSize: 16, fontFamily: 'HouschkaRoundedDemiBold', letterSpacing: 0.2,
            }}
            >
              Ma Trésorerie
            </Text>

          </TouchableOpacity>

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
  window: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 37,
    borderRadius: 10,
    borderColor: 'transparent',
    shadowColor: '#dedede',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 0.5,
    shadowOpacity: 1,
  },

  // III part
  // Aide Declaration Impots
  docs: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 1,

    backgroundColor: '#fff',
    fontWeight: 'normal',
    borderColor: 'transparent',
    shadowColor: '#dedede',
  },

  // Footer
  button: {
    flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', backgroundColor: 'transparent',
  },
  buttonTextLeft: {
    color: '#0076c8',
    fontSize: 17,
    marginLeft: 6,
    letterSpacing: 0.3,
    // fontWeight: '600',
  },
  buttonTextRight: {
    fontSize: 17.5,
    fontWeight: '600',
  },
});
