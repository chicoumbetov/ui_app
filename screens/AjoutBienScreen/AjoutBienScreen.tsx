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
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../assets/styles';
import Icon from '../../components/Icon';
import Form from '../../components/Form/Form';
import SelectComp from '../../components/Form/Select';

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

  const navigation = useNavigation();
  const onTakePicture = () => (console.log('photo'));

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

  const typeBien = [
    'Résidence Principale', 'Résidence Secondaire', 'Investissement Locatif Professionnel ou Commercial', 'Investissement Locatif Particulier',
  ];

  const [typeBienShow, setTypeBienShow] = useState(false);

  const [detentionShow, setDetentionShow] = useState(false);

  const [statutShow, setStatutShow] = useState(false);

  const [typeImpoShow, setTypeImpoShow] = useState(false);

  const [typeDetentionShow, setTypeDetentionShow] = useState(false);

  const showModeDetention = (id: number) => {
    switch (id) {
      case 1:
        setTypeBienShow(true);
        setDetentionShow(false);
        setStatutShow(false);
        setTypeImpoShow(false);
        setTypeDetentionShow(false);
        break;
      case 2:
        setTypeBienShow(false);
        setDetentionShow(true);
        setStatutShow(false);
        setTypeImpoShow(false);
        setTypeDetentionShow(false);
        break;
      case 3:
        setTypeBienShow(false);
        setDetentionShow(false);
        setStatutShow(true);
        setTypeImpoShow(false);
        setTypeDetentionShow(false);
        break;
      case 4:
        setTypeBienShow(false);
        setDetentionShow(false);
        setStatutShow(false);
        setTypeImpoShow(true);
        setTypeDetentionShow(false);
        break;
      case 5:
        setTypeBienShow(false);
        setDetentionShow(false);
        setStatutShow(false);
        setTypeImpoShow(false);
        setTypeDetentionShow(true);
        break;
    }
  };

  const SetTypeBien = (tybeBientxt: string) => {
    setTypeBien(tybeBientxt);
    setTypeBienShow(false);
    setDetentionShow(true);
  };

  const SetDetention = (detentiontxt: string) => {
    setDetention(detentiontxt);
    setDetentionShow(false);
    if (detentiontxt === 'Société') {
      setStatutShow(true);
    } else {
      setTypeDetentionShow(true);
    }
  };

  const SetStatut = (statuttxt: string) => {
    setStatut(statuttxt);
    setStatutShow(false);
    setTypeImpoShow(true);
  };

  const SetTypeImpo = (tybeImpotxt: string) => {
    setTypeImpo(tybeImpotxt);
    setTypeImpoShow(false);
  };

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
                <Image
                  source={require('../../assets/Icones_omedom/logements/icones_log1.png')}
                  style={{ height: 53, width: 52 }}
                />
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
              <TouchableOpacity
                onPress={() => showModeDetention(1)}
              >
                <Layout style={
                typeBienShow
                  ? ({
                    ...styles.headerUp, marginBottom: 0, marginTop: 0, paddingTop: 22,
                  })
                  : ({
                    ...styles.headerDown, marginTop: -11, paddingLeft: 24, paddingVertical: 23,
                  })
              }
                >
                  <Text style={{
                    fontSize: 16,
                    letterSpacing: 0.05,
                    color: colors.blanc,
                  }}
                  >
                    {formState.typeBien}
                  </Text>
                  {
                  typeBienShow
                    ? <Icon name="arrow-ios-upward-outline" color={colors.blanc} size={15} />
                    : <Icon name="arrow-ios-downward-outline" color={colors.blanc} size={15} />
                }

                </Layout>
              </TouchableOpacity>
              {typeBienShow && (
              <Layout style={{ marginHorizontal: 25, marginBottom: 30 }}>
                <SelectComp name="TypeBien" data={typeBien} label="test" />

              </Layout>
              )}
            </Layout>

            <Layout style={{ backgroundColor: 'transparent' }}>
              <TouchableOpacity
                onPress={() => showModeDetention(2)}
              >
                <Layout style={
                detentionShow
                  ? ({
                    ...styles.headerUp,
                  })
                  : ({
                    ...styles.headerDown, paddingLeft: 25, paddingVertical: 25,
                  })
              }
                >
                  <Text style={{ fontSize: 16, letterSpacing: 0.4, color: colors.blanc }}>
                    {formState.detention}
                  </Text>
                  {
                detentionShow
                  ? <Icon name="arrow-ios-upward-outline" color={colors.blanc} size={15} />
                  : <Icon name="arrow-ios-downward-outline" color={colors.blanc} size={15} />
                }
                </Layout>
              </TouchableOpacity>
              {detentionShow && (
              <Layout>
                <TouchableOpacity
                  onPress={() => SetDetention('Nom Propre')}
                >
                  <Layout style={{ margin: 20 }}>
                    <Text style={styles.text}>Nom Propre</Text>
                  </Layout>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => SetDetention('Société')}
                >
                  <Layout style={{ margin: 20 }}>
                    <Text style={styles.text}>Société</Text>
                  </Layout>
                </TouchableOpacity>
              </Layout>
              )}
            </Layout>
            {formState.detention === 'Société' && (
            <Layout>
              <TouchableOpacity
                onPress={() => showModeDetention(3)}
              >
                <Layout style={statutShow ? (styles.headerUp) : (styles.headerDown)}>
                  <Text>{formState.statut}</Text>
                </Layout>
              </TouchableOpacity>
              {statutShow && (
              <Layout>
                <TouchableOpacity
                  onPress={() => SetStatut('SCI')}
                >
                  <Layout style={{ margin: 20 }}>
                    <Text style={styles.text}>SCI</Text>
                  </Layout>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => SetStatut('SAS')}
                >
                  <Layout style={{ margin: 20 }}>
                    <Text style={styles.text}>SAS</Text>
                  </Layout>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => SetStatut('SARL Classique')}
                >
                  <Layout style={{ margin: 20 }}>
                    <Text style={styles.text}>SARL Classique</Text>
                  </Layout>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => SetStatut('SARL Famille')}
                >
                  <Layout style={{ margin: 20 }}>
                    <Text style={styles.text}>SARL Famille</Text>
                  </Layout>
                </TouchableOpacity>
              </Layout>
              )}

              <TouchableOpacity
                onPress={() => showModeDetention(4)}
              >
                <Layout style={statutShow ? (styles.headerUp) : (styles.headerDown)}>
                  <Text>{formState.typeImpo}</Text>
                </Layout>
              </TouchableOpacity>
              {typeImpoShow && (
              <Layout>
                <TouchableOpacity
                  onPress={() => SetTypeImpo('Impôt sur les revenus')}
                >
                  <Layout style={{ margin: 20 }}>
                    <Text style={styles.text}>Impôt sur les revenus</Text>
                  </Layout>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => SetTypeImpo('Impôt sur les sociétés')}
                >
                  <Layout style={{ margin: 20 }}>
                    <Text style={styles.text}>Impôt sur les sociétés</Text>
                  </Layout>
                </TouchableOpacity>

              </Layout>
              )}
              {formState.typeImpo !== 'Type d\'imposition' && (
              <Layout style={{
                flex: 1,
                margin: 30,
                backgroundColor: colors.blanc,
                flexDirection: 'row',
              }}
              >
                <Text>Pourcentage de détention</Text>
                <TextInput style={{ alignItems: 'flex-end' }} />
                <Text>%</Text>

              </Layout>
              )}
            </Layout>

            )}

          </View>

          )}
          {typeDetentionShow && (
          <Layout>
            <TouchableOpacity
              onPress={() => SetTypeImpo('Impôt sur les revenus')}
            >
              <Layout style={{ margin: 20 }}>
                <Text style={styles.text}>Impôt sur les revenus</Text>
              </Layout>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => SetTypeImpo('Impôt sur les sociétés')}
            >
              <Layout style={{ margin: 20 }}>
                <Text style={styles.text}>Impôt sur les sociétés</Text>
              </Layout>
            </TouchableOpacity>

          </Layout>
          )}
          {formState.typeDetention !== ''}
          <Layout style={{
            flex: 2,
            margin: 30,
            backgroundColor: colors.blanc,
            flexDirection: 'row',
          }}
          >
            <Text>Pourcentage de détention</Text>
            <TextInput />
            <Text>%</Text>
          </Layout>
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
