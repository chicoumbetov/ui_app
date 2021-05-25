/**
 * Page 2 Mes Biens - DetailsBiens
 *
 * @author: Shynggys UMBETOV
 */

import React from 'react';
import {
  Layout, Text, Icon as IconUIKitten, useTheme,
} from '@ui-kitten/components';
import {
  FlatList, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { useLinkTo, useNavigation } from '@react-navigation/native';
import MaxWidthContainer from '../../../components/MaxWidthContainer';

import MaisonVert from '../../../assets/Omedom_Icons_svg/Logement/maison_verte.svg';
import Icon from '../../../components/Icon';

import comptesData from '../../../mockData/comptesData';

function MonBudget() {
  const navigation = useNavigation();
  const theme = useTheme();
  const linkTo = useLinkTo();

  const allerTresorerie = () => {
    linkTo('/ma-tresorerie');
  };

  const allerAjoutRevenu = () => {
    navigation.navigate('ajout-revenu', { id: 11 });
  };

  const allerAjoutCharge = () => {
    navigation.navigate('ParametrerAjoutCharges');
  };

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
      }}
    >

      {/**
      *  I. Mon Budget
      */}
      <Layout style={styles.container}>
        <Text category="h1" style={{ marginVertical: 12 }}>
          Mon Budget
        </Text>
        <View style={{
          marginTop: 10, marginRight: 20, flexDirection: 'row', alignItems: 'center',
        }}
        >
          <View style={{ marginRight: 12 }}>
            <MaisonVert height={40} width={40} />
          </View>

          <Text category="h2">
            {/* {compte.typeBien} */}
            La Maison de Mathieu
          </Text>
        </View>
      </Layout>

      {/**
      *     Revenus
      */}
      <Layout style={styles.container}>

        <Layout style={{
          backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center', marginBottom: 10,
        }}
        >
          <IconUIKitten
            name="arrow-upward-outline"
            fill={theme['color-success-400']}
            style={{
              height: 20, width: 20, marginRight: 5,
            }}
          />
          <Text category="h2" status="success">
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

                <Text category="h6" status="success" style={{ justifyContent: 'center' }}>
                  + 500 €
                </Text>

                <Text category="h6" appearance="hint">10/03/2021</Text>
                <Text category="p2" appearance="hint">Mensuel</Text>
              </Layout>

              <Layout style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              >
                <Text category="h6" status="warning" style={{ marginLeft: 15 }}>
                  En attente
                </Text>

              </Layout>
            </Layout>

          )}
        />

        <Layout style={styles.button}>
          <TouchableOpacity onPress={allerAjoutRevenu}>
            <Layout style={styles.button}>
              <Text category="h6" status="info" style={styles.buttonTextLeft}>Ajouter un compte</Text>
            </Layout>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Layout style={styles.button}>
              <Text category="h6" status="basic">Supprimer un compte</Text>
            </Layout>
          </TouchableOpacity>
        </Layout>

      </Layout>

      {/**
       *     Charges
       */}
      <Layout style={styles.container}>

        <Layout style={{
          backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center', marginBottom: 10,
        }}
        >
          <IconUIKitten
            name="arrow-downward-outline"
            fill={theme['color-danger-500']}
            style={{
              height: 20, width: 20, marginRight: 5,
            }}
          />
          <Text category="h2" status="danger">
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

                <Text
                  category="h6"
                  status="danger"
                  style={{ justifyContent: 'center' }}
                >
                  -500
                </Text>

                <Text category="h6" status="basic">Assurances</Text>
                <Text category="p1" appearance="hint">Mensuel</Text>
              </Layout>

              <Layout style={{
                flex: 1,
                marginLeft: 10,
              }}
              >
                <Text category="p1" appearance="hint" style={{ justifyContent: 'center' }}>
                  Date d'échéance
                </Text>

                <Text category="c1">03/03/2021</Text>
                <Text category="h6" status="success">Validé</Text>

              </Layout>
            </Layout>

          )}
        />

        <Layout style={styles.button}>
          <TouchableOpacity onPress={allerAjoutCharge}>
            <Layout style={styles.button}>
              <Text category="h6" status="info" style={{ marginLeft: 6 }}>Ajouter un compte</Text>
            </Layout>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Layout style={styles.button}>
              <Text category="h6" status="basic">Supprimer un compte</Text>
            </Layout>
          </TouchableOpacity>
        </Layout>

      </Layout>

      {/**
      *       Aller Tresorerie
      */}
      <Layout style={styles.container}>

        <Text category="h6" status="info" style={{ marginBottom: 20 }}>
          Consulter la trésorerie pour affecter les mouvements bancaires
        </Text>
        {/**   1   */}
        <Layout style={[styles.docs, { marginBottom: 10, justifyContent: 'center' }]}>

          <TouchableOpacity
            onPress={allerTresorerie}
            style={{
              flexDirection: 'row', alignItems: 'center',
            }}
          >
            <Icon name="money" size={30} color={theme['color-success-400']} style={{ marginRight: 10 }} />
            <Text category="h6" status="basic">
              Ma Trésorerie
            </Text>

          </TouchableOpacity>

        </Layout>
      </Layout>

    </MaxWidthContainer>
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
    marginLeft: 6,
  },
});
