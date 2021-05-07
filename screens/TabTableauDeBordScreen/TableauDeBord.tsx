/**
 * Page d'acceuil
 *
 * @author: Shynggys UMBETOV, Amaury
 */

import React, { useEffect, useState } from 'react';
import {
  Button, Icon, Layout, Text,
} from '@ui-kitten/components';
import {
  FlatList, ScrollView, StyleSheet, TouchableOpacity, View,
} from 'react-native';

import { useLinkTo, useNavigation } from '@react-navigation/native';
import CompteHeader from '../../components/CompteHeader/CompteHeader';
import comptesData from '../../mockData/comptesData';
import MaisonVert from '../../assets/Omedom_Icons_svg/Logement/maison_verte.svg';
import Immeuble from '../../assets/Omedom_Icons_svg/Logement/immeuble.svg';

function TableauDeBord() {
  const navigation = useNavigation();
  const linkTo = useLinkTo();

  // const [compte, setCompte] = useState(comptesData);

  const allerTresorie = () => {
    navigation.navigate('MaTrésorerieDrawer');
  };
  const allerNotificaitons = () => {
    linkTo('/notifications');
  };

  const onAjoutBien = () => {
    linkTo('/mes-biens/ajouter');
  };

  useEffect(() => {
    console.log('useEffect test of Tableau de bord');
  });

  return (
    <ScrollView style={{ backgroundColor: '#efefef' }}>

      {/**
       *  Trésorerie section
       */}
      <Layout style={styles.container}>
        <Text category="h1">
          Trésorerie
        </Text>
        <Layout style={{
          flexDirection: 'column', marginTop: 27, padding: 15, paddingBottom: 20, borderRadius: 10,
        }}
        >
          <Layout style={{ flexDirection: 'row' }}>
            <Layout style={styles.oneThirdBlock}>
              <Text appearance="hint" style={styles.text}>Dernier crédit</Text>
              <Text category="h3" status="success" style={{ marginTop: 14 }}>+ 500 €</Text>
              <View style={styles.mouvementImage}>
                <MaisonVert height={42} width={44} />
              </View>

            </Layout>

            <Layout style={styles.oneThirdBlock}>
              <Text appearance="hint" style={styles.text}>
                Dernier débit
              </Text>
              <Text category="h3" status="danger" style={{ marginTop: 14 }}>- 80 €</Text>
              <View style={styles.mouvementImage}>
                <Immeuble height={42} width={44} />
              </View>

            </Layout>

            <Layout style={styles.oneThirdBlock}>
              <Text appearance="hint" style={styles.text}>
                Prochain mouvement
              </Text>
              <Text category="h3" status="danger" style={{ marginTop: 14 }}>- 160 €</Text>
              <View style={styles.mouvementImage}>
                <MaisonVert height={42} width={44} />
              </View>

            </Layout>
          </Layout>
        </Layout>
        <Text
          category="h5"
          status="info"
          style={{ marginVertical: 10 }}
          onPress={allerTresorie}
        >
          Accéder à la trésorerie
        </Text>
      </Layout>

      {/**
      *  Mes Biens section
      */}
      <Layout style={styles.containerBiens}>
        <Text category="h1">
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
                <Icon
                  name="arrow-ios-forward"
                  fill="#b5b5b5"
                  style={{
                    height: 16, width: 16, marginRight: 5, marginTop: 8,
                  }}
                />
              </TouchableOpacity>

              <Layout style={{
                flexDirection: 'row', alignItems: 'center', marginTop: 8, marginBottom: 5,
              }}
              >

                <Layout style={{
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: 14,
                  marginRight: 8,
                }}
                >
                  <Icon
                    name="arrow-downward"
                    fill="#b5b5b5"
                    style={{ height: 16, width: 16 }}
                  />
                  <Icon
                    name="arrow-upward"
                    fill="#b5b5b5"
                    style={{
                      height: 16, width: 16, marginRight: 8,
                    }}
                  />

                  <Text category="h5" status="success">+ 10 800 €</Text>
                </Layout>

                <Layout style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginRight: 8,
                }}
                >
                  <Layout style={{ alignItems: 'center', flexDirection: 'row', marginTop: 13 }}>
                    <Icon
                      name="arrow-downward"
                      fill="#b5b5b5"
                      style={{ height: 16, width: 16, marginRight: 8 }}
                    />
                    <Text category="h4" status="danger">- 160 €</Text>
                  </Layout>
                </Layout>

                <Layout style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                >
                  <Layout style={{ marginTop: 14, alignItems: 'center', flexDirection: 'row' }}>
                    <Icon
                      name="trending-up"
                      fill="#b5b5b5"
                      style={{ height: 18, width: 18, marginRight: 8 }}
                    />
                    <Text category="h4" status="warning">60 %</Text>
                  </Layout>
                </Layout>
              </Layout>

            </Layout>
          )}
        />

        <Button
          size="large"
          onPress={() => { onAjoutBien(); }}
          style={{ marginVertical: 10 }}
        >
          Ajouter un nouveau bien
        </Button>
      </Layout>

      {/**
       *  Notifications
       */}
      <Layout style={styles.container}>
        <Text category="h1" style={{ marginTop: -5 }}>
          Notifications
        </Text>
        <Layout style={{
          flexDirection: 'column', marginTop: 27, padding: 15, paddingBottom: 20, borderRadius: 10,
        }}
        >

          <Layout style={{
            marginRight: 20,
            flexDirection: 'row',
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

              <View style={{ marginRight: 18 }}>
                <MaisonVert height={42} width={44} />
              </View>
              <Text
                category="h6"
                status="basic"
                style={{ flex: 1 }}
              >
                Un mouvement négatif a été détécté
              </Text>

            </View>

            <Icon
              name="arrow-ios-forward"
              fill="#b5b5b5"
              style={{
                height: 16, width: 16, marginRight: 5, alignItems: 'center',
              }}
            />

          </Layout>

        </Layout>
        <Text
          category="h5"
          status="info"
          style={{ marginTop: 21, marginBottom: 35 }}
          onPress={allerNotificaitons}
        >
          Consulter les notifications
        </Text>
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
    width: 94,
    justifyContent: 'center',
    textAlign: 'center',
  },
  mouvementImage: {
    marginRight: 3,
    marginTop: 15,
  },
});

export default TableauDeBord;
