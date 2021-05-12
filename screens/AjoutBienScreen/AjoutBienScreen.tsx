/**
 * Creation of Biens
 *
 * @author: Amaury, Shynggys UMBETOV
 */

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  StyleSheet, TouchableOpacity, View,
} from 'react-native';

import {
  Button, Datepicker, Icon, Layout, Text, useTheme,
} from '@ui-kitten/components';

import * as ImagePicker from 'expo-image-picker';
import { colors } from '../../assets/styles';
import Form from '../../components/Form/Form';
import SelectComp from '../../components/Form/Select';

import TextInputComp from '../../components/Form/TextInput';
import {
  detention, statut, typeBien, typeDetention, typeImpo,
} from '../../mockData/ajoutBienData';

import MaisonVerte from '../../assets/Omedom_Icons_svg/Logement/maison_verte.svg';
import Bateau from '../../assets/Omedom_Icons_svg/Logement/bateau.svg';
import Boutique from '../../assets/Omedom_Icons_svg/Logement/boutique.svg';
import Cabane from '../../assets/Omedom_Icons_svg/Logement/cabane.svg';
import Chateau from '../../assets/Omedom_Icons_svg/Logement/chateau.svg';
import Immeuble from '../../assets/Omedom_Icons_svg/Logement/immeuble.svg';
import MaisonBleu from '../../assets/Omedom_Icons_svg/Logement/maison_bleu.svg';
import Manoir from '../../assets/Omedom_Icons_svg/Logement/manoir.svg';
import Riad from '../../assets/Omedom_Icons_svg/Logement/riad.svg';
import Voiture from '../../assets/Omedom_Icons_svg/Logement/voiture.svg';
import MaxWidthContainer from '../../components/MaxWidthContainer';

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
  const theme = useTheme();
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
  const [date, setDate] = useState(null);
  const [image, setImage] = useState('MaisonVerte');

  /**
   * For part III
   * Variable pour gérer l'affichage des données de modes de détention
   * */

  const CalendarIcon = (props) => (
    <Icon {...props} name="calendar-outline" />
  );

  const [detentionShow, setDetentionShow] = useState(false);

  const [statutShow, setStatutShow] = useState(false);

  const [pourcentageDetentionShow, setPourcentageDetentionShow] = useState(false);

  let SelectedIcon = MaisonVerte;
  switch (image) {
    case 'Immeuble':
      SelectedIcon = Immeuble;
      break;
    case 'MaisonVerte':
      SelectedIcon = MaisonVerte;
      break;
    case 'Cabane':
      SelectedIcon = Cabane;
      break;
    case 'Bateau':
      SelectedIcon = Bateau;
      break;
    case 'Boutique':
      SelectedIcon = Boutique;
      break;
    case 'Chateau':
      SelectedIcon = Chateau;
      break;
    case 'Manoir':
      SelectedIcon = Manoir;
      break;
    case 'MaisonBleu':
      SelectedIcon = MaisonBleu;
      break;
    case 'Riad':
      SelectedIcon = Riad;
      break;
    case 'Voiture':
      SelectedIcon = Voiture;
      break;
  }

  return (
    <MaxWidthContainer
      outerViewProps={{
        style: {
          backgroundColor: '#f6f6f6',
        },
      }}
    >
      <Form<AjoutBienForm> {...ajoutBienForm}>
        <>
          <View>
            <Text style={styles.faq} category="h1">Création de votre bien</Text>
          </View>
          {/**
       *  Identité
       */}
          <View
            style={[
              styles.item,
              {
                backgroundColor: ((etape === 0)
                  ? colors.blanc
                  : (theme['color-success-100'])),
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => setEtape(0)}
            >
              <Text
                category="h6"
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

                <TextInputComp style={{ marginBottom: 30, marginLeft: 23, marginRight: 22 }} name="nomDuBien" placeholder="Le nom du bien" />
              </Layout>

              <Layout style={{ alignItems: 'center', backgroundColor: 'transparent', marginVertical: 34 }}>
                <SelectedIcon height={146} width={146} />
              </Layout>
              <Layout style={{ marginLeft: 10, backgroundColor: 'transparent' }}>
                <Text category="h5" appearance="hint">
                  Choisir une icone
                </Text>
              </Layout>
              <Layout style={{
                flexDirection: 'row', marginTop: 21, justifyContent: 'space-evenly', marginLeft: -6, backgroundColor: 'transparent',
              }}
              >
                <TouchableOpacity onPress={() => { setImage('MaisonVerte'); }}>
                  <MaisonVerte height={53} width={53} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setImage('Immeuble'); }}>
                  <Immeuble height={53} width={53} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setImage('Cabane'); }}>
                  <Cabane height={53} width={53} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setImage('Bateau'); }}>
                  <Bateau height={53} width={53} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setImage('Boutique'); }}>
                  <Boutique height={53} width={53} />
                </TouchableOpacity>

              </Layout>
              <Layout style={{
                flexDirection: 'row', marginTop: 34, justifyContent: 'space-evenly', marginLeft: -6, backgroundColor: 'transparent',
              }}
              >
                <TouchableOpacity onPress={() => { setImage('Chateau'); }}>
                  <Chateau height={53} width={53} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setImage('Manoir'); }}>
                  <Manoir height={53} width={53} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setImage('MaisonBleu'); }}>
                  <MaisonBleu height={53} width={53} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setImage('Riad'); }}>
                  <Riad height={53} width={53} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setImage('Voiture'); }}>
                  <Voiture height={53} width={53} />
                </TouchableOpacity>

              </Layout>

              <Layout style={{ paddingHorizontal: 23, backgroundColor: 'transparent' }}>
                <TouchableOpacity onPress={() => {}} style={{ marginVertical: 30.5 }}>
                  <Text category="h5" status="info">Prendre une photo</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 7 }}>
                  <TouchableOpacity onPress={() => { pickImage(); }}>
                    <Text category="h5" status="info">Ajouter une photo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {}}>
                    <Text
                      category="h5"
                      style={{
                        marginRight: 6,
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

          <View style={[
            styles.item,
            {
              backgroundColor: ((etape === 1)
                ? colors.blanc : ((etape === 0) ? theme['color-warning-100'] : theme['color-success-100'])),
              marginTop: 29,
            },
          ]}
          >
            <TouchableOpacity
              onPress={() => setEtape(1)}
            >
              <Text
                category="h6"
              >
                Localisation (2/3)
              </Text>
            </TouchableOpacity>
          </View>

          {etape === 1 && (
            <View style={{
              marginBottom: 30,
              marginLeft: 23,
              marginRight: 22,
            }}
            >
              <TextInputComp style={{ marginBottom: 30 }} name="adresse" placeholder="Adresse" />
              <TextInputComp style={{ marginBottom: 30 }} name="complement" placeholder="Complément d'adresse" />
              <TextInputComp style={{ marginBottom: 30 }} name="codePostal" placeholder="Code Postal" />
              <TextInputComp style={{ marginBottom: 30 }} name="ville" placeholder="Ville" />
              <TextInputComp name="pays" placeholder="Pays" />
            </View>
          )}

          {/**
       *  Mode de détention
       */}

          <View style={[
            styles.item,
            {
              backgroundColor: ((etape === 2)
                ? colors.blanc : (theme['color-warning-100'])),
              marginTop: 29,
            },
          ]}
          >
            <TouchableOpacity
              onPress={() => setEtape(2)}
            >
              <Text
                category="h6"
              >
                Mode de détention (3/3)
              </Text>
            </TouchableOpacity>
          </View>
          {etape === 2 && (
            <View style={{ marginHorizontal: 27, marginBottom: 20 }}>
              <View style={{
                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
              }}
              >
                <Layout style={{ backgroundColor: 'transparent', marginRight: 20 }}>
                  <Text category="h5" status="basic">
                    Date d'acquisition
                  </Text>
                </Layout>
                <Datepicker
                  name="dateAcquisition"
                  placeholder="dd/mm/yyyy"
                  date={date}
                  onSelect={(nextDate) => setDate(nextDate)}
                  accessoryRight={CalendarIcon}
                />

              </View>
              <Layout style={{ backgroundColor: 'transparent' }}>

                <SelectComp name="typeBien" data={typeBien} placeholder="Type De Bien" size="large" appearance="default" status="primary" />
                <SelectComp name="Detention" data={detention} placeholder="Détention" onChangeValue={(v) => { if (v === 'b1') { setDetentionShow(true); setStatutShow(false); setPourcentageDetentionShow(false); } else { setDetentionShow(false); setStatutShow(true); setPourcentageDetentionShow(true); } }} size="large" appearance="default" status="primary" />

                {detentionShow
              && (
              <Layout>
                <SelectComp name="typeDetention" data={typeDetention} placeholder="Type De Détention" onChangeValue={(v) => { if (v === 'b2') { setPourcentageDetentionShow(true); } else { setPourcentageDetentionShow(false); } }} size="large" appearance="default" status="primary" />

              </Layout>
              )}
                {statutShow
              && (
              <>

                <SelectComp name="typeBien" data={statut} placeholder="Status" size="large" appearance="default" status="primary" />
                <SelectComp name="typeBien" data={typeImpo} placeholder="Type d'imposition" size="large" appearance="default" status="primary" />

              </>
              )}

                {pourcentageDetentionShow && (
                <Layout style={{
                  flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent',
                }}
                >
                  <Text category="h5" style={{ flex: 1 }}>Pourcentage de détention</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInputComp name="detention" size="small" style={{ width: 55, marginRight: 10 }} />
                    <Text category="h5">%</Text>
                  </View>
                </Layout>
                )}

              </Layout>
              <View style={{ alignItems: 'flex-end', marginBottom: 10 }}>
                <Button
                  onPress={ajoutBienForm.handleSubmit((e) => {
                    console.log(e);
                  })}
                  size="large"
                >
                  Enregistrer
                </Button>
              </View>
            </View>

          )}

        </>
      </Form>
    </MaxWidthContainer>
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
