/**
 * Page d'acceuil
 *
 * @author: Shynggys UMBETOV, Amaury
 */

import React, { useEffect } from 'react';
import {
  Button, Icon as IconUIKitten, Layout, Text,
} from '@ui-kitten/components';
import {
  FlatList, StyleSheet, TouchableOpacity, View,
} from 'react-native';

import { useLinkTo } from '@react-navigation/native';

import comptesData from '../../mockData/comptesData';
import MaisonVert from '../../assets/Omedom_Icons_svg/Logement/maison_verte.svg';
import Immeuble from '../../assets/Omedom_Icons_svg/Logement/immeuble.svg';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import MonBienResume from '../../components/MonBienResume';

function TableauDeBord() {
  const linkTo = useLinkTo();

  // const [compte, setCompte] = useState(comptesData);

  const allerTresorie = () => {
    linkTo('/ma-tresorerie');
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

  const allerDetailsBien = () => {
    linkTo('/mes-biens/bien/:id');
  };

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        style: { backgroundColor: '#efefef' },
        showsVerticalScrollIndicator: false,
      }}
    >
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
              <Text category="h6" appearance="hint" style={styles.text}>Dernier crédit</Text>

              <View style={styles.mouvementImage}>
                <Text category="h3" status="success">+ 500 €</Text>
                <MaisonVert height={42} width={44} />
              </View>
            </Layout>

            <Layout style={styles.oneThirdBlock}>
              <Text category="h6" appearance="hint" style={styles.text}>Dernier débit</Text>

              <View style={styles.mouvementImage}>
                <Text category="h3" status="danger">- 80 €</Text>
                <Immeuble height={42} width={44} />
              </View>
            </Layout>

            <Layout style={styles.oneThirdBlock}>
              <Text category="h6" appearance="hint" style={styles.text}>
                Prochain mouvement
              </Text>

              <View style={styles.mouvementImage}>
                <Text category="h3" status="danger">- 160 €</Text>
                <MaisonVert height={42} width={44} />
              </View>
            </Layout>

          </Layout>
        </Layout>
        <Text
          category="h5"
          status="info"
          style={{ marginVertical: 20 }}
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
            <View>
              <MonBienResume title={item.title} id={item.id} />
            </View>
          )}
        />

        <Button
          size="large"
          onPress={() => { onAjoutBien(); }}
          style={{ marginVertical: 25 }}
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

          <TouchableOpacity
            onPress={() => {}}
            style={{
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
            <IconUIKitten
              name="arrow-ios-forward"
              fill="#b5b5b5"
              style={{
                height: 20, width: 20, marginRight: 5, alignItems: 'center',
              }}
            />

          </TouchableOpacity>

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
    </MaxWidthContainer>

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
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default TableauDeBord;
