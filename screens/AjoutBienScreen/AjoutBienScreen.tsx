/**
 * Creation of Biens
 *
 * @author: Amaury, Shynggys UMBETOV
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Image,
  ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';

import { Button, Layout } from '@ui-kitten/components';

import * as ImagePicker from 'expo-image-picker';
import { colors } from '../../assets/styles';
import Form from '../../components/Form/Form';
import SelectComp from '../../components/Form/Select';
import {
  detention, statut, typeBien, typeDetention, typeImpo,
} from '../../mockData/ajoutBienData';

import MaisonVerte from '../../assets/Omedom_Icons_svg/Logement/maison_verte.svg';

type AjoutBienForm = {
  typeBien: string;
  detention: string;
  statut: string;
  typeImpo: string;
  typeDetention: string;
};

const initialFormState = {
  typeBien: 'Type de bien',
  detention: 'Détention',
  statut: 'Statut',
  typeImpo: 'Type d\'imposition',
  typeDetention: 'Type de détention',
};

function AjoutBienScreen() {
  const [formState, updateFormState] = useState(initialFormState);

  const ajoutBienForm = useForm<AjoutBienForm>();

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
    } catch (e) {
      console.log('pickImage error: ', e);
    }
  };

  /**
   *Variable pour gérer l'affichage des trois grandes partie
   * */
  const [etape, setEtape] = useState(0);

  /**
   *Variable pour gérer la date
   * */
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const showMode = () => {
    setShow(true);
  };
  /**
   * For part III
   * Variable pour gérer l'affichage des données de modes de détention
   * */

  const [detentionShow, setDetentionShow] = useState(false);

  const [statutShow, setStatutShow] = useState(false);

  return (
    <ScrollView style={{ backgroundColor: '#f6f6f6' }}>
      <Form<AjoutBienForm> {...ajoutBienForm}>
        <>
          <View>
            <Text style={styles.faq}>Création de votre bien</Text>
          </View>
          {/**
       *  Identité
       */}
          <View
            style={{
              ...styles.item,
              backgroundColor: ((etape === 0)
                ? colors.blanc
                : (colors.vert4)),
            }}
          >
            <TouchableOpacity
              onPress={() => setEtape(0)}
            >
              <Text
                style={{
                  fontSize: 15.5,
                  fontFamily: 'HouschkaRoundedDemiBold',
                  fontStyle: 'normal',
                  lineHeight: 23,
                  letterSpacing: 0.9,
                  color: colors.noir,
                  marginLeft: 7,
                }}
              >
                Identité (1/3)
              </Text>
            </TouchableOpacity>
          </View>
          {etape === 0 && (
          <View>
            <Layout style={{
              backgroundColor: colors.blanc,
              paddingHorizontal: 16,
              marginHorizontal: 23,
              marginTop: 7,
              paddingVertical: 11.5,
              borderRadius: 7,
            }}
            >
              <Text style={{ fontSize: 17, fontFamily: 'HouschkaRoundedMedium' }}>La Maison de Matthieu</Text>
            </Layout>

            <Layout style={{ marginLeft: 124, backgroundColor: 'transparent', marginVertical: 34 }}>
              {/* <Icon name="vert_batiment" size={140} style={{ marginRight: 10 }} /> */}
              <Image
                source={require('../../assets/Icones_omedom/logements/icones_log1.png')}
                style={{ height: 149, width: 149 }}
              />
            </Layout>

            <Text style={{
              fontSize: 16.5, color: '#b5b5b5', marginLeft: 23, marginTop: 2,
            }}
            >
              Choisir une icone
            </Text>

            <Layout style={{
              flexDirection: 'row', marginTop: 21, justifyContent: 'space-evenly', marginLeft: -6, backgroundColor: 'transparent',
            }}
            >
              <TouchableOpacity onPress={() => {}}>
                <MaisonVerte height={53} width={53} />
              </TouchableOpacity>
              <Image
                source={require('../../assets/Icones_omedom/logements/icones_log4.png')}
                style={{ height: 53, width: 52 }}
              />
              <Image
                source={require('../../assets/Icones_omedom/logements/icones_log3.png')}
                style={{ height: 53, width: 52 }}
              />
              <Image
                source={require('../../assets/Icones_omedom/logements/icones_log2.png')}
                style={{ height: 53, width: 52 }}
              />
              <Image
                source={require('../../assets/Icones_omedom/logements/icones_log10.png')}
                style={{ height: 53, width: 52 }}
              />

            </Layout>
            <Layout style={{
              flexDirection: 'row', marginTop: 34, justifyContent: 'space-evenly', marginLeft: -6, backgroundColor: 'transparent',
            }}
            >
              <Image
                source={require('../../assets/Icones_omedom/logements/icones_log5.png')}
                style={{ height: 53, width: 52 }}
              />
              <Image
                source={require('../../assets/Icones_omedom/logements/icones_log6.png')}
                style={{ height: 53, width: 52 }}
              />
              <Image
                source={require('../../assets/Icones_omedom/logements/icones_log7.png')}
                style={{ height: 53, width: 52 }}
              />
              <Image
                source={require('../../assets/Icones_omedom/logements/icones_log8.png')}
                style={{ height: 53, width: 52 }}
              />
              <Image
                source={require('../../assets/Icones_omedom/logements/icones_log9.png')}
                style={{ height: 53, width: 52 }}
              />

            </Layout>

            <Layout style={{ paddingHorizontal: 23, backgroundColor: 'transparent' }}>
              <TouchableOpacity onPress={() => { onTakePicture(); }} style={{ marginVertical: 30.5 }}>
                <Text style={styles.button}>Prendre une photo</Text>
              </TouchableOpacity>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 7 }}>
                <TouchableOpacity onPress={() => { pickImage(); }}>
                  <Text style={styles.button}>Ajouter une photo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={{
                    fontSize: 17, color: '#000', letterSpacing: 0, marginRight: 6,
                  }}
                  >
                    Supprimer la photo
                  </Text>
                </TouchableOpacity>
              </View>
            </Layout>

          </View>
          )}

          {/**
       *  Localisation
       */}

          <View style={{
            ...styles.item,
            backgroundColor: ((etape === 1)
              ? colors.blanc : ((etape === 0) ? colors.orange4 : colors.vert4)),
            marginTop: 29,
          }}
          >
            <TouchableOpacity
              onPress={() => setEtape(1)}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'HouschkaRoundedDemiBold',
                  fontStyle: 'normal',
                  lineHeight: 28,
                  letterSpacing: 0.5,
                  color: colors.noir,
                  marginLeft: 8,
                }}
              >
                Localisation (2/3)
              </Text>
            </TouchableOpacity>
          </View>
          {etape === 1 && (
          <View>
            <TextInput style={styles.inputStyle} placeholder="Adresse" />
            <TextInput style={{ ...styles.inputStyle, marginTop: -6, paddingLeft: 22.5 }} placeholder="Complément d'adresse" />
            <TextInput style={{ ...styles.inputStyle, marginTop: -4, paddingLeft: 22.5 }} placeholder="Code Postal" />
            <TextInput style={{ ...styles.inputStyle, marginTop: -4, paddingLeft: 22.5 }} placeholder="Ville" />
            <TextInput style={{ ...styles.inputStyle, marginTop: -4, paddingLeft: 22.5 }} placeholder="Pays" />
          </View>
          )}

          {/**
       *  Mode de détention
       */}

          <View style={{
            ...styles.item,
            backgroundColor: ((etape === 2)
              ? colors.blanc : (colors.orange4)),
          }}
          >
            <TouchableOpacity
              onPress={() => setEtape(2)}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'HouschkaRoundedDemiBold',
                  fontStyle: 'normal',
                  lineHeight: 33,
                  letterSpacing: 0.5,
                  color: colors.noir,
                  marginLeft: 8,
                }}
              >
                Mode de détention (3/3)
              </Text>
            </TouchableOpacity>
          </View>
          {etape === 2 && (
          <View>
            <View style={{ flexDirection: 'row', marginLeft: 27, marginRight: 10 }}>
              <Text style={{
                flex: 1, fontSize: 15.4, marginTop: 12, letterSpacing: 0.01,
              }}
              >
                Date d'acquisition
              </Text>
              <TextInput
                style={{
                  ...styles.inputStyle, marginTop: 0, fontSize: 14, flex: 1, width: 50,
                }}
                placeholder="dd/mm/yyyy"
                value={date.toDateString()}
              />
            </View>
            <Layout style={{ backgroundColor: 'transparent' }}>

              <Layout>
                <SelectComp name="typeBien" data={typeBien} placeholder="Type De Bien" size="large" appearance="default" status="primary" />

              </Layout>

              <Layout>
                <SelectComp name="Detention" data={detention} placeholder="Détention" onChangeValue={(v) => { console.log(v); if (v === 'Nom Prope') { setDetentionShow(true); } else { setStatutShow(true); } }} size="large" appearance="default" status="primary" />

              </Layout>
              {detentionShow
              && (
              <Layout>
                <SelectComp name="typeDetention" data={typeDetention} placeholder="Type De Détention" size="large" appearance="default" status="primary" />

              </Layout>
              )}
              {statutShow
              && (
              <>
                <Layout>
                  <SelectComp name="typeBien" data={statut} placeholder="Status" size="large" appearance="default" status="primary" />

                </Layout>

                <Layout>
                  <SelectComp name="typeBien" data={typeImpo} placeholder="Type d'imposition" size="large" appearance="default" status="primary" />

                </Layout>
              </>
              )}

            </Layout>

          </View>

          )}

          <Layout style={{ marginBottom: 10 }}>
            <Button
              style={{ width: 130 }}
              onPress={ajoutBienForm.handleSubmit((e) => {
                console.log(e);
              })}
            >
              Valider
            </Button>
          </Layout>
        </>
      </Form>
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
    marginTop: 53,
    marginBottom: 45,
    marginLeft: 22,
    fontSize: 24,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0.84,
    color: '#000000',
    fontFamily: 'HouschkaRoundedDemiBold',
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

  // Mode de detention part
  headerDown: {
    padding: 22,
    marginHorizontal: 24,
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
    paddingHorizontal: 23,
    paddingTop: 24,
    paddingBottom: 23.5,
    marginHorizontal: 24,
    marginBottom: 15,
    flexDirection: 'row',
    // alignItems: 'center',
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
  inputText: {
    marginLeft: 39,
    marginTop: 30,
    marginRight: 22,
  },
  text: {
    fontSize: 16,
    fontFamily: 'HouschkaRoundedDemiBold',
    lineHeight: 24,
    letterSpacing: 0,
    color: colors.noir,
  },

  // Localisation input style
  inputStyle: {
    fontSize: 16,
    marginTop: 6,
    borderRadius: 7,
    paddingVertical: 14,
    paddingHorizontal: 21,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    fontWeight: 'normal',
    borderColor: 'transparent',
    marginBottom: 32,
    shadowColor: '#dedede',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },

  // bouton ajouter supprimer
  button: {
    fontSize: 17,
    color: '#0076c8',
  },
});

export default AjoutBienScreen;
