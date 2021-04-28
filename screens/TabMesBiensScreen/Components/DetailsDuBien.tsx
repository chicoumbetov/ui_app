/**
 * Page 2 Mes Biens - DetailsBiens
 *
 * @author: Shynggys UMBETOV
 */

import React, { useEffect, useState } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import {
  Image, LogBox, ScrollView, StyleSheet, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Entypo, SimpleLineIcons,
} from '@expo/vector-icons';
import { colors } from '../../../assets/styles';

import comptesData from '../../../mockData/comptesData';
import clientData from '../../../mockData/clientDATA';
import Icon from '../../../components/Icon';

function DetailsBien() {
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
       *  I. Details du bien
       */}
      <Layout style={{ ...styles.container, marginTop: 0 }}>
        <Text style={{ fontSize: 25, fontFamily: 'HouschkaRoundedDemiBold' }}>
          Détails du bien
        </Text>
        <Layout style={{ alignItems: 'center', backgroundColor: 'transparent', marginVertical: 30 }}>
          <Image source={require('../../../assets/Icones_omedom/logements/icones_log1.png')} style={{ height: 100, width: 100, marginRight: 12 }} />
          <Text style={{ fontSize: 21, fontFamily: 'HouschkaRoundedDemiBold' }}>
            La Maison de JP
          </Text>
        </Layout>

      </Layout>

      {/**
       *  II. Compteurs
       */}
      <Layout style={styles.container}>
        <Text style={{ ...styles.mainTitle, letterSpacing: 0.5 }}>
          Compteurs
        </Text>

        <Layout style={{
          flexDirection: 'row', borderRadius: 10, paddingVertical: 20,
        }}
        >
          <Layout style={styles.oneThirdBlock}>
            <Text style={styles.text}>Dernier mouvement</Text>
            <Text style={styles.incomeMouvement}>+ 500 €</Text>
          </Layout>

          <Layout style={styles.oneThirdBlock}>
            <Text style={styles.text}>
              Prochaine dépense
            </Text>
            <Text style={{ ...styles.incomeMouvement, color: colors.rouge }}>- 160 €</Text>
          </Layout>

          <Layout style={styles.oneThirdBlock}>
            <Text style={styles.text}>
              Réntabilité du bien
            </Text>
            <Text style={{ ...styles.incomeMouvement, color: colors.jaune }}>60 %</Text>
          </Layout>
        </Layout>

      </Layout>

      {/**
       *  III. Budget
       */}
      <Layout style={styles.container}>

        <Text style={{ ...styles.mainTitle }}>
          Budget
        </Text>
        {/**   1   */}
        <Layout style={styles.docs}>
          <Layout style={{
            flexDirection: 'row', alignItems: 'center',
          }}
          >
            <Icon name="calculator" size={33} color={colors.green} style={{ marginRight: 10 }} />
            <Text style={{
              fontSize: 17, fontFamily: 'HouschkaRoundedDemiBold', letterSpacing: 0.2,
            }}
            >
              Mon Budget
            </Text>
          </Layout>
        </Layout>

      </Layout>

      {/**
       *  IV. Nos Service
       */}
      <Layout style={styles.container}>

        <Text style={{ ...styles.mainTitle }}>
          Nos Services
        </Text>
        {/**   1   */}
        <Layout style={{ ...styles.docs, marginBottom: 10 }}>

          <Layout style={{
            flexDirection: 'row', alignItems: 'center',
          }}
          >
            <Icon name="money" size={30} color={colors.green} style={{ marginRight: 10 }} />
            <Text style={{
              fontSize: 16, fontFamily: 'HouschkaRoundedDemiBold', letterSpacing: 0.2,
            }}
            >
              Ma Trésorerie (Lier un compte bancaire)
            </Text>

          </Layout>

        </Layout>

        {/**   2   */}
        <Layout style={{ ...styles.docs, marginBottom: 10 }}>

          <Layout style={{
            flexDirection: 'row', alignItems: 'center',
          }}
          >
            <Icon name="trending-up-outline" size={30} color={colors.green} style={{ marginRight: 10 }} />
            <Text style={{
              fontSize: 16, fontFamily: 'HouschkaRoundedDemiBold', letterSpacing: 0.2,
            }}
            >
              Mes Rapports
            </Text>
          </Layout>

        </Layout>

        {/**   3   */}
        <Layout style={styles.docs}>

          <Layout style={{
            flexDirection: 'row', alignItems: 'center',
          }}
          >
            <Icon name="file-text-outline1" size={30} color={colors.green} style={{ marginRight: 10 }} />
            <Text style={{
              fontSize: 16, fontFamily: 'HouschkaRoundedDemiBold', letterSpacing: 0.2,
            }}
            >
              Mon Assistant
            </Text>

          </Layout>
        </Layout>

      </Layout>

      {/**
       *  V. Characteristiques
       */}
      <Layout style={styles.container}>
        <Text style={{ ...styles.mainTitle, marginTop: -5 }}>
          Charactéristiques
        </Text>
        <Layout style={styles.compteSection}>
          {/* use SectionList to render several accounts with its types and details */}
          <Text style={{ fontSize: 17 }}>Localisation</Text>
          <Text style={{ color: '#b5b5b5', fontSize: 17, marginTop: 6 }}>{clientData.AdresseType.fields[0].adresse}</Text>
          <Layout style={{ borderBottomWidth: 0.5, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

          <Text style={{ fontSize: 17, marginTop: 7 }}>Date d'acquisition</Text>
          <Text style={{
            color: '#b5b5b5', fontSize: 17, marginTop: 5,
          }}
          >
            {clientData.Client.fields[0].email}
          </Text>
          <Layout style={{ borderBottomWidth: 0.3, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

          <Text style={{ fontSize: 17, marginTop: 8 }}>Type de bien</Text>
          <Text style={{ color: '#b5b5b5', fontSize: 17, marginTop: 5 }}>{clientData.AdresseType.fields[0].ville}</Text>
          <Layout style={{ borderBottomWidth: 0.5, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

          <Text style={{ fontSize: 17, marginTop: 10 }}>Mode de détention</Text>
          <Text style={{ color: '#b5b5b5', fontSize: 17, marginTop: 5 }}>{clientData.Client.fields[0].numeroTel}</Text>
          <Layout style={{ borderBottomWidth: 0.5, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

          <Text style={{ fontSize: 17, marginTop: 8 }}>Nombre de parts</Text>
          <Text style={{ color: '#b5b5b5', fontSize: 17, marginTop: 5 }}>{clientData.AdresseType.fields[0].ville}</Text>
        </Layout>

        <TouchableOpacity onPress={() => {}}>
          <Text style={{ ...styles.buttonText }}>Modifier le biens</Text>
        </TouchableOpacity>
      </Layout>

      {/**
       *  VI. Géstion des locataires
       */}
      <Layout style={styles.container}>
        <Text style={{ ...styles.mainTitle, marginTop: -5 }}>
          Géstion des locataires
        </Text>
        <Layout style={styles.compteSection}>
          {/* use SectionList to render several accounts with its types and details */}
          <Text style={{ fontSize: 17 }}>
            {clientData.Client.fields[0].prenom}
            {' '}
            {clientData.Client.fields[0].nom}
          </Text>
          <Text style={{ color: '#b5b5b5', fontSize: 17, marginTop: 6 }}>{clientData.AdresseType.fields[0].adresse}</Text>
          <Layout style={{ borderBottomWidth: 0.5, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

          <Text style={{ fontSize: 17, marginTop: 7 }}>Date de fin de bail</Text>
          <Text style={{
            color: '#b5b5b5', fontSize: 17, marginTop: 5,
          }}
          >
            {clientData.Client.fields[0].dateDeNaissance}
          </Text>
        </Layout>

        <Layout style={styles.button}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.buttonText}>Ajouter</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Text style={{ ...styles.buttonText, color: colors.noir }}>Supprimer</Text>
          </TouchableOpacity>
        </Layout>

      </Layout>

      {/**
       *  VII. Documents
       */}
      <Layout style={styles.container}>
        <Text style={{ ...styles.mainTitle, marginTop: -5 }}>
          Documents
        </Text>
        <Layout style={styles.docs}>
          <Text style={styles.aideText}>Aide_Déclaration_Impôts_2021</Text>

          <Layout style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => {}}>
              <SimpleLineIcons name="cloud-download" size={14} style={{ color: '#b5b5b5', paddingRight: 25 }} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}}>
              <Entypo name="eye" size={16.5} style={{ color: '#b5b5b5', paddingRight: 3.5 }} />
            </TouchableOpacity>
          </Layout>
        </Layout>

        <Layout style={styles.button}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.buttonText}>Ajouter</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Text style={{ ...styles.buttonText, color: colors.noir }}>Supprimer</Text>
          </TouchableOpacity>
        </Layout>
      </Layout>

      {/**
       *  VIII. Partager votre bien
       */}
      <Layout style={styles.container}>
        <Text style={{ ...styles.mainTitle }}>
          Partager votre bien
        </Text>
        <Layout style={styles.docs}>

          <Layout style={{
            flexDirection: 'row', backgroundColor: 'transparent', alignItems: 'center',
          }}
          >
            <Image
                /* eslint-disable-next-line global-require */
              source={require('../../../assets/Icones_omedom/avatars/avatar_2.png')}
              style={{
                height: 50, width: 50, marginRight: 18,
              }}
            />

            <Layout style={{ flexDirection: 'column' }}>
              <Text style={{
                fontSize: 17, letterSpacing: 0.2, color: colors.noir, fontFamily: 'HouschkaRoundedMedium',
              }}
              >
                Marie Dupont
              </Text>
              <Text style={{
                fontSize: 15, letterSpacing: 0.2, color: colors.gris, fontFamily: 'HouschkaRoundedMedium',
              }}
              >
                Lecture Seule
              </Text>
            </Layout>

          </Layout>

        </Layout>

        <Layout style={styles.button}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.buttonText}>Ajouter</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Text style={{ ...styles.buttonText, color: colors.noir }}>Supprimer</Text>
          </TouchableOpacity>
        </Layout>
      </Layout>

      {/**
       *  Supprimer le bien
       */}
      <Layout style={{ ...styles.container, alignItems: 'center' }}>
        <Text style={{ ...styles.buttonText, color: colors.rouge, marginVertical: 50 }}>
          Supprimer le bien
        </Text>

      </Layout>

    </ScrollView>

  );
}

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

  // Compteurs
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

  // Characteristiques
  compteSection: {
    paddingVertical: 24,
    paddingHorizontal: 26.5,
    borderRadius: 10,
  },

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
  aideText: {
    fontSize: 15,
    letterSpacing: 0.01,
    fontFamily: 'HouschkaRoundedMedium',
  },

  // Ajouter Supprimer buttons
  button: {
    flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', backgroundColor: 'transparent',
  },
  buttonText: {
    color: colors.bleu,
    fontSize: 17.5,
    marginLeft: 6,
    letterSpacing: 0.3,
    fontFamily: 'HouschkaRoundedMedium',
    marginTop: 20,
  },
});

export default DetailsBien;
