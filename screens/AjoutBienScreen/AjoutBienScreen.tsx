/**
 * Creation of Biens
 *
 * @author: Amaury, Shynggys UMBETOV
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  StyleSheet, TouchableOpacity, View,
} from 'react-native';

import {
  Button, Icon, Layout, Text, useTheme,
} from '@ui-kitten/components';

import * as ImagePicker from 'expo-image-picker';
import { Auth } from 'aws-amplify';
import { View as MotiView } from 'moti';
import { colors } from '../../assets/styles';
import Form from '../../components/Form/Form';
import SelectComp from '../../components/Form/Select';

import {
  detention, statut, typeBien, typeDetention, typeImpot,
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
import TextInput from '../../components/Form/TextInput';
import { AvailableValidationRules } from '../../components/Form/validation';
import { createRealEstateMutation } from '../../src/API/RealEstate';
import { CompanyType, RealEstateType, TaxType } from '../../src/API';

type AjoutBienForm = {
  name: string,
  purchaseYear?: number | null,
  address: string,
  additionalAddress?: string | null,
  postalCode: string,
  city: string,
  country: string,
  type?: RealEstateType | null,
  ownName?: boolean | null,
  detentionPart?: number | null,
  company?: CompanyType | null,
  typeImpot?: TaxType | null,
};

function AjoutBienScreen() {
  const theme = useTheme();

  const createRealEstate = createRealEstateMutation();

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

  const onAjoutBien = async (data: AjoutBienForm) => {
    console.log(data);

    const {
      address, additionalAddress, city, postalCode, country, detentionPart, ...rest
    } = data;

    const user = await Auth.currentAuthenticatedUser();

    await createRealEstate({
      variables: {
        input: {
          ...rest,
          detentionPart: detentionParte,
          iconUri: 'default::mainHouse',
          admins: [
            user.id,
          ],
          address: {
            address,
            additionalAddress,
            city,
            postalCode,
            country,
          },
        },
      },
    });
  };

  /**
   *Variable pour gérer l'affichage des trois grandes partie
   * */
  const [etape, setEtape] = useState(0);

  /**
   *Variable pour gérer la date
   * */
  const [image, setImage] = useState('MaisonVerte');

  /**
   * For part III
   * Variable pour gérer l'affichage des données de modes de détention
   * */

  const CalendarIcon = (props) => (
    <Icon {...props} name="calendar-outline" />
  );
  const [detentionParte, setDetentionPart] = useState<number | null>(null);
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
      withScrollView="keyboardAware"
      outerViewProps={{
        style: {
          backgroundColor: '#f6f6f6',
        },
        showsVerticalScrollIndicator: false,
      }}
    >
      <Form<AjoutBienForm> {...ajoutBienForm}>
        <>
          <View>
            <Text style={styles.faq} category="h1">Création de votre bien</Text>
          </View>
          {/**
       *  Identité 1/3 title part
       */}
          <View
            style={[
              styles.item,
              {
                backgroundColor: ((etape === 0)
                  ? (theme['color-basic-100'])
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
          {/**
           Identité 1/3  ( etape1 )
           * */}
          <MotiView animate={{ height: (etape === 0 ? 540 : 0) }} style={{ overflow: 'hidden' }} transition={{ type: 'timing', duration: 2000 }}>

            <TextInput
              style={{ marginBottom: 30, marginLeft: 23, marginRight: 22 }}
              name="name"
              placeholder="Le nom du bien"

            />

            <Layout style={{
              alignItems: 'center', backgroundColor: 'transparent', marginVertical: 34,
            }}
            >
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

          </MotiView>
          {/**
          *  Identité 2/3 title
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
          {/**
           Identité 2/3  ( etape2 )
           * */}
          <MotiView
            animate={{ height: (etape === 1 ? 400 : 0) }}
            style={{
              overflow: 'hidden',
              flexDirection: 'column',
              marginLeft: 23,
              marginRight: 22,
              justifyContent: 'space-between',
            }}
            transition={{ type: 'timing', duration: 2000 }}
          >

            <TextInput
              name="address"
              placeholder="Adresse"
              validators={[
                AvailableValidationRules.required,
              ]}
            />
            <TextInput
              name="additionalAddress"
              placeholder="Complément d'adresse"
            />
            <TextInput
              name="postalCode"
              placeholder="Code Postal"
              maxLength={5}
              validators={[
                AvailableValidationRules.required,
              ]}
            />
            <TextInput
              name="city"
              placeholder="Ville"
              validators={[
                AvailableValidationRules.required,
              ]}
            />
            <TextInput
              name="country"
              placeholder="Pays"
              validators={[
                AvailableValidationRules.required,
              ]}
            />

          </MotiView>
          {/**
          *  Mode de détention
          *  Identité 3/3 (etape 3) title
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
          {/**
           *  Mode de détention
           *  Identité 3/3 (etape 3)
           */}
          <MotiView
            animate={{ maxHeight: (etape === 2 ? 500 : 0) }}
            style={{
              overflow: 'hidden',
              flexDirection: 'column',
              marginHorizontal: 23,
              justifyContent: 'space-between',
            }}
            transition={{ type: 'timing', duration: 500 }}
          >
            <View style={{
              flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8,
            }}
            >
              <Text category="h5" status="basic" style={{ flex: 1, marginRight: 20 }}>
                Année d'acquisition
              </Text>
              <TextInput
                name="purchaseYear"
                placeholder="yyyy"
                maxLength={4}
                icon="calendar-outline"
              />
            </View>

            <View style={{ height: 140 }}>
              <SelectComp
                name="type"
                data={typeBien}
                placeholder="Type De Bien"
                size="large"
                appearance="default"
                status="primary"
              />
              <SelectComp
                name="ownName"
                data={detention}
                placeholder="Détention"
                onChangeValue={(v) => {
                  if (v === true) {
                    setDetentionShow(true);
                    setStatutShow(false);
                    setPourcentageDetentionShow(false);
                  } else {
                    setDetentionShow(false); setStatutShow(true); setPourcentageDetentionShow(true);
                  }
                }}
                size="large"
                appearance="default"
                status="primary"
              />
            </View>

            {detentionShow
              && (
              <View style={{ height: 75 }}>
                <>
                  <SelectComp
                    name="detentionPart"
                    data={typeDetention}
                    placeholder="Type De Détention"
                    onChangeValue={(v) => {
                      if (v === 'Indivision') {
                        setPourcentageDetentionShow(true);
                      } else {
                        setDetentionPart(100);
                        setPourcentageDetentionShow(false);
                      }
                    }}
                    size="large"
                    appearance="default"
                    status="primary"
                  />
                </>

              </View>
              )}

            {statutShow
              && (
              <View style={{ height: 125 }}>
                <SelectComp name="company" data={statut} placeholder="Status" size="large" appearance="default" status="primary" />
                <SelectComp name="typeImpot" data={typeImpot} placeholder="Type d'imposition" size="large" appearance="default" status="primary" />
              </View>
              )}

            <MotiView
              animate={{ maxHeight: (pourcentageDetentionShow ? 500 : 0) }}
              style={{
                overflow: 'hidden',
                flexDirection: 'row',
                marginHorizontal: 23,
                justifyContent: 'space-between',
                height: 60,
                alignItems: 'center',
              }}
              transition={{ type: 'timing' }}
            >

              {/**
                  if Intégrale then 100%
                  else write number in text input
                  */}
              <Text category="h5" style={{ flex: 1 }}>Pourcentage de détention</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: 80 }}>
                <TextInput
                  name="detentionPart"
                  size="small"
                  min={0}
                  max={100}
                  maxLength={4}
                  keyboardType="numeric"
                  style={{ marginRight: 10 }}
                  defaultValue={detentionParte}
                />
                <Text category="h5">%</Text>
              </View>

            </MotiView>

            <View style={{ alignItems: 'flex-end', marginBottom: 10 }}>
              <Button
                onPress={ajoutBienForm.handleSubmit((data) => onAjoutBien(data))}
                size="large"
              >
                Enregistrer
              </Button>
            </View>
          </MotiView>

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
    lineHeight: 24,
    letterSpacing: 0,
    color: colors.noir,
  },
});

export default AjoutBienScreen;
