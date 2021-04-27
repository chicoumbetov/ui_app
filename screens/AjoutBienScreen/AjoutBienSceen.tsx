import React, { useState } from 'react';
import {
  ScrollView, SectionList, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Layout } from '@ui-kitten/components';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../../assets/styles';

function AjoutBienScreen() {
  { /**
   *Variable pour gérer l'affichage des trois grandes partie
   * */ }
  const [etape1, setEtape1] = useState(1);
  const [etape2, setEtape2] = useState(0);
  const [etape3, setEtape3] = useState(0);

  const SetEtape1 = () => {
    if (etape3 === 1) {
      setEtape1(2);
    }
    if (etape2 === 1) {
      setEtape2(2);
    }
    setEtape1(1);
  };
  const SetEtape2 = () => {
    if (etape1 === 1) {
      setEtape1(2);
    }
    if (etape3 === 1) {
      setEtape3(2);
    }
    setEtape2(1);
  };

  const SetEtape3 = () => {
    if (etape1 === 1) {
      setEtape1(2);
    }
    if (etape2 === 1) {
      setEtape2(2);
    }
    setEtape3(1);
  };

  { /**
   *Variable pour gérer la date
   * */ }
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const showMode = () => {
    setShow(true);
  };
  { /**
   *Variable pour gérer l'affichage des données de modes de détention
   * */ }

  const [typeBien, setTypeBien] = useState('Type de Bien');
  const [typeBienShow, setTypeBienShow] = useState(false);

  const [detention, setDetention] = useState('Type de Bien');
  const [detentionShow, setDetentionShow] = useState(false);

  const [statut, setStatut] = useState('Statut');
  const [statutShow, setStatutShow] = useState(false);

  const [typeImpo, setTypeImpo] = useState('Type de Bien');
  const [typeImpoShow, setTypeImpoShow] = useState(false);

  const showModeDetention = (id: number) => {
    switch (id) {
      case 1:
        setTypeBienShow(true);
    }
  };

  const SetTypeBien = (tybeBientxt: string) => {
    setTypeBien(tybeBientxt);
    setTypeBienShow(false);
  };

  return (
    <ScrollView style={{ backgroundColor: colors.blanc }}>
      <View>
        <Text style={styles.faq}>Création de votre bien</Text>
      </View>
      {/**
       *  Identité
       */}
      <View style={{ ...styles.item, backgroundColor: ((etape1 === 0) ? colors.orange4 : ((etape1 === 1) ? colors.blanc : colors.green)) }}>
        <TouchableOpacity
          onPress={() => SetEtape1()}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              fontStyle: 'normal',
              lineHeight: 24,
              letterSpacing: 0,
              color: colors.noir,
              marginLeft: 27,
            }}

          >
            Identité (1/3)
          </Text>
        </TouchableOpacity>
        {etape1 === 1 && (
        <View>
          <Text>La maison de Matthieu</Text>
        </View>
        )}

      </View>

      {/**
       *  Localisation
       */}

      <View style={{ ...styles.item, backgroundColor: ((etape2 === 0) ? colors.orange4 : ((etape2 === 1) ? colors.blanc : colors.green)) }}>
        <TouchableOpacity
          onPress={() => SetEtape2()}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              fontStyle: 'normal',
              lineHeight: 24,
              letterSpacing: 0,
              color: colors.noir,
              marginLeft: 27,
            }}

          >
            Localisation (2/3)
          </Text>
        </TouchableOpacity>
        {etape2 === 1 && (
        <View>
          <Text>Text 2</Text>
        </View>
        )}
      </View>

      {/**
       *  Mode de détention
       */}

      <View style={{ ...styles.item, backgroundColor: ((etape3 === 0) ? colors.orange4 : ((etape3 === 1) ? colors.blanc : colors.green)) }}>
        <TouchableOpacity
          onPress={() => SetEtape3()}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              fontStyle: 'normal',
              lineHeight: 24,
              letterSpacing: 0,
              color: colors.noir,
              marginLeft: 27,
            }}

          >
            Mode de détention (3/3)
          </Text>
        </TouchableOpacity>
        {etape3 === 1 && (
        <View>
          <View style={{ flex: 2, flexDirection: 'row' }}>
            <Text>Date d'acquisition</Text>
            <TextInput
              placeholder="dd/mm/yyyy"
              value={date.toDateString()}
            />
          </View>
          {show
          && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour
            display="default"
            onChange={onChange}
          />
          )}
          <Layout>
            <TouchableOpacity
              onPress={() => showModeDetention(1)}
            >
              <Layout style={typeBienShow ? (styles.headerUp) : (styles.headerDown)}>
                <Text>{typeBien}</Text>
              </Layout>
            </TouchableOpacity>
            {typeBienShow && (
            <Layout>
              <TouchableOpacity
                onPress={() => SetTypeBien('Rèsidence Principale')}
              >
                <Layout>
                  <Text>Rèsidence Principale</Text>
                </Layout>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => SetTypeBien('Résidence Secondaire')}
              >
                <Layout>
                  <Text>Résidence Secondaire</Text>
                </Layout>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => SetTypeBien('Investissement Locatif Professionnel ou Commercial')}
              >
                <Layout>
                  <Text>Investissement Locatif Professionnel ou Commercial</Text>
                </Layout>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => SetTypeBien('Investissement Locatif Particulier')}
              >
                <Layout>
                  <Text>Investissement Locatif Particulier</Text>
                </Layout>
              </TouchableOpacity>
            </Layout>
            )}
          </Layout>
        </View>
        )}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    backgroundColor: colors.blanc,
  },
  faq: {
    marginTop: 12,
    marginBottom: 49,
    marginLeft: 22,
    fontSize: 24,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#000000',
  },
  item: {
    padding: 20,
    marginBottom: 30,
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0,
    color: colors.noir,
  },
  headerDown: {
    padding: 22,
    marginBottom: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 7,
    backgroundColor: '#37a3de',
    shadowColor: 'rgba(199, 199, 199, 0.5)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  headerUp: {
    padding: 22,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 7,
    backgroundColor: '#5fc4ee',
    shadowColor: 'rgba(199, 199, 199, 0.5)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  headerText: {
    fontSize: 16,
    color: '#fff',
  },
  title: {
    fontSize: 24,
  },
});

export default AjoutBienScreen;
