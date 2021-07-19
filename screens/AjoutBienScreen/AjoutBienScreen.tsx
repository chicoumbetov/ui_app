/**
 * Creation of Biens
 *
 * @author: Amaury, Shynggys UMBETOV
 */

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Alert, Platform, StyleSheet, TouchableOpacity, View,
} from 'react-native';

import {
  Modal, Text, useTheme,
} from '@ui-kitten/components';

import * as ImagePicker from 'expo-image-picker';
import { ImagePickerResult } from 'expo-image-picker';
import { MotiView } from 'moti';
import { useLinkTo, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import API from '@aws-amplify/api';
import { colors } from '../../assets/styles';
import Form from '../../components/Form/Form';
import SelectComp from '../../components/Form/Select';

import {
  detention,
  typeBien,
  typeDetention,
  typeImpot,
  typeStatut,
} from '../../mockData/ajoutBienData';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import AutoAvatar from '../../components/AutoAvatar';
import TextInput from '../../components/Form/TextInput';
import { AvailableValidationRules } from '../../components/Form/validation';
import {
  useCreateRealEstateMutation,
  useGetRealEstate,
  useRealEstateList,
  useUpdateRealEstateMutation,
} from '../../src/API/RealEstate';
import {
  CompanyType, RealEstate, RealEstateType, TaxType,
} from '../../src/API';
import { useUser } from '../../src/API/UserContext';
import { TabMesBiensParamList } from '../../types';
import Camera, { CameraOutput } from '../../components/Camera/Camera';
import { Delete, Upload } from '../../utils/S3FileStorage';
import Button from '../../components/Button';

type AjoutBienForm = {
  name: string,
  purchaseYear?: number | null,
  address: {
    address: string,
    additionalAddress?: string | null,
    postalCode: string,
    city: string,
    country: string,
  }
  type?: RealEstateType | null,
  ownName?: boolean | null,
  detentionPart?: number | null,
  company?: CompanyType | null,
  typeImpot?: TaxType | null,
  purchasePrice?: number | null,
  notaryFee?: number | null,
};

// pour utiliser la Key plutôt que le label depuis data reference
const typeBienArray = Object.values(typeBien);
const typeDetentionArray = Object.values(typeDetention);
const typeStatutArray = Object.values(typeStatut);
const typeImpotArray = Object.values(typeImpot);

function AjoutBienScreen() {
  const theme = useTheme();
  const { user } = useUser();
  const updateRealEstate = useUpdateRealEstateMutation();
  const createRealEstate = useCreateRealEstateMutation();
  const { data: realEstateList } = useRealEstateList();
  const linkTo = useLinkTo();

  const [selectedNewImage, setSelectedNewImage] = useState<
  ImagePickerResult |
  CameraOutput |
  undefined
  >();

  const ajoutBienForm = useForm<AjoutBienForm>();

  const onAjoutBien = async (data: AjoutBienForm) => {
    if (user) {
      if (route.params && currentRealEstate) {
        let iconUri = image;
        if (image !== currentRealEstate.iconUri) {
          const toDelete = currentRealEstate.iconUri && currentRealEstate.iconUri.indexOf('default::') > -1
            ? undefined
            : currentRealEstate.iconUri;
          if (toDelete) {
            await Delete(toDelete);
          }
          if (selectedNewImage) {
            const upload = await Upload(selectedNewImage, `realEstate/${currentRealEstate.id}/`);
            if (upload !== false) {
              iconUri = upload.key;
            }
          }
        }

        await updateRealEstate.updateRealEstate({
          variables: {
            input: {
              id: route.params.id,
              ...data,
              iconUri,
              // eslint-disable-next-line no-underscore-dangle
              _version: currentRealEstate._version,
            },
          },
        });
      } else {
        let iconUri = image;
        const showPopup = !(realEstateList?.listRealEstates?.items
            && realEstateList?.listRealEstates?.items?.length > 0);
        const { data: mutationData } = await createRealEstate.createRealEstate({
          variables: {
            input: {
              ...data,
              iconUri,
              admins: [
                user.id,
              ],
            },
          },
        });

        await API.post('omedomrest', '/budgetinsight/create-trial', {});

        if (mutationData?.createRealEstate && selectedNewImage) {
          const upload = await Upload(selectedNewImage, `realEstate/${mutationData.createRealEstate.id}/`);
          if (upload !== false) {
            iconUri = upload.key;
          }

          await updateRealEstate.updateRealEstate({
            variables: {
              input: {
                id: mutationData.createRealEstate.id,
                iconUri,
                // eslint-disable-next-line no-underscore-dangle
                _version: mutationData.createRealEstate._version,
              },
            },
          });
        }
        if (showPopup && mutationData?.createRealEstate) {
          Alert.alert(
            '\u2705 BRAVO !',
            `Le bien "${data.name}" a été créé ! \n`
              + 'Pour commencer paramétrez son budget.',
            [
              { text: 'Ignorer', style: 'cancel', onPress: () => linkTo('/mes-biens') },
              { text: 'Mon budget', onPress: () => linkTo(`/mes-biens/${mutationData?.createRealEstate?.id}/budget`) },
            ],
            { cancelable: true },
          );
          return;
        }
      }
      linkTo('/mes-biens');
    }
  };

  /**
   *Variable pour gérer l'affichage des trois grandes partie
   * */
  const [etape, setEtape] = useState(0);
  /**
   *
   * */
  const [image, setImage] = useState('default::MaisonVerte');

  /**
   * For part III
   * Variable pour gérer l'affichage des données de modes de détention
   * */

  const [camera, setCamera] = React.useState(false);
  const [detentionShow, setDetentionShow] = useState(false);
  const [statutShow, setStatutShow] = useState(false);
  const [pourcentageDetentionShow, setPourcentageDetentionShow] = useState(false);

  const [socialTaxShow, setSocialTaxShow] = React.useState(false);

  const route = useRoute<RouteProp<TabMesBiensParamList, 'ajout-bien-screen'> | RouteProp<TabMesBiensParamList, 'modifier-characteristique'>>();
  let currentRealEstate: RealEstate | undefined;
  let detentionPartDefault : string = 'indivision';
  if (route.params) {
    const { bienget } = useGetRealEstate(route.params.id);
    currentRealEstate = bienget;

    // console.log('Ajout bien screen modifier : ', currentRealEstate);
    useEffect(() => {
      setImage(bienget.iconUri);
      if (bienget.ownName) {
        setDetentionShow(true);
        setStatutShow(false);

        setPourcentageDetentionShow(false);
        if (bienget.detentionPart !== 100) {
          setPourcentageDetentionShow(true);
        }
      } else {
        setDetentionShow(false);
        setStatutShow(true);
        setPourcentageDetentionShow(true);
      }
    }, []);
    if (bienget.ownName) {
      if (bienget.detentionPart === 100) {
        detentionPartDefault = 'proprietaire_integral';
        setPourcentageDetentionShow(false);
      } else {
        detentionPartDefault = 'indivision';
      }
    }
  }

  const onTakePicture = () => {
    setCamera(true);
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      if (!result.cancelled) {
        setImage(result.uri);
        setSelectedNewImage(result);
      }
    } catch (e) {
      console.log('pickImage error: ', e);
    }
  };

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
      }}
    >
      <Form
        {...ajoutBienForm}
        defaultValues={currentRealEstate}
      >
        <>
          <View>
            <Text style={styles.faq} category="h1">

              Création de votre bien
            </Text>
          </View>
          {/**
       *  Identité 1/3 title part
       */}
          <TouchableOpacity
            style={[
              styles.item,
              {
                backgroundColor: ((etape === 0)
                  ? (theme['color-basic-100'])
                  : (theme['color-success-100'])),
              },
            ]}
            onPress={() => setEtape(0)}
          >
            <Text
              category="h6"
            >
              Identité (1/3)
            </Text>
          </TouchableOpacity>
          {/**
           Identité 1/3  ( etape1 )
           * */}
          <MotiView
            animate={{ height: (etape === 0 ? 580 : 0) }}
            style={{
              overflow: 'hidden',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            transition={{ type: 'timing', duration: 500 }}
          >
            <View style={{ height: 55 }}>
              <TextInput
                containerStyle={{ marginLeft: 23, marginRight: 22 }}
                name="name"
                placeholder="Le nom du bien"
                validators={[
                  AvailableValidationRules.required,
                ]}
              />
            </View>

            <View style={{
              alignItems: 'center',
              marginTop: 10,
              marginBottom: 34,
            }}
            >
              <AutoAvatar
                avatarInfo={image}
                style={{
                  height: 146, width: 146, borderRadius: 73, overflow: 'hidden',
                }}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text category="h5" appearance="hint">Choisissez une des icones par défaut</Text>
            </View>
            <View style={{
              flexDirection: 'row', marginTop: 21, justifyContent: 'space-evenly', marginLeft: -6,
            }}
            >
              {['MaisonVerte', 'Immeuble', 'Cabane', 'Bateau', 'Boutique'].map((icon) => (
                <TouchableOpacity key={icon} onPress={() => { setImage(`default::${icon}`); }}>
                  <AutoAvatar
                    avatarInfo={`default::${icon}`}
                    style={{
                      height: 53,
                      width: 53,
                    }}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View style={{
              flexDirection: 'row', marginTop: 34, justifyContent: 'space-evenly', marginLeft: -6,
            }}
            >
              {['Chateau', 'Manoir', 'MaisonBleu', 'Riad', 'Voiture'].map((icon) => (
                <TouchableOpacity key={icon} onPress={() => { setImage(`default::${icon}`); }}>
                  <AutoAvatar
                    avatarInfo={`default::${icon}`}
                    style={{
                      height: 53,
                      width: 53,
                    }}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <View style={{ marginLeft: 10, marginVertical: 21 }}>
              <Text category="h5" appearance="hint">Ou personnalisez l'icone de votre bien</Text>
            </View>
            <View style={{ paddingHorizontal: 23 }}>
              {Platform.OS !== 'web' && (
              <TouchableOpacity onPress={() => onTakePicture()} style={{ marginVertical: 30.5 }}>
                <Text category="h5" status="info">Prendre une photo</Text>
              </TouchableOpacity>
              )}

              {Platform.OS !== 'web' && (
              <Modal
                visible={camera}
                style={{
                  overflow: 'hidden',
                  alignItems: 'center',
                  backgroundColor: 'black',
                }}
              >
                {camera && (
                <Camera
                  onClose={() => {
                    setCamera(false);
                  }}
                  onChoose={(result) => {
                    if (result) {
                      setImage(result.uri);
                      setSelectedNewImage(result);
                    }
                    setCamera(false);
                  }}
                  withPreview
                  ratio={[1, 1]}
                  maxWidth={300}
                />
                )}
              </Modal>
              )}

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 7 }}>
                <TouchableOpacity onPress={() => { pickImage(); }}>
                  <Text category="h5" status="info">Choisir une photo</Text>
                </TouchableOpacity>
                {image.indexOf('default::') <= -1 && (
                <TouchableOpacity onPress={() => {
                  setImage('default::MaisonVerte');
                  setSelectedNewImage(undefined);
                }}
                >
                  <Text
                    category="h5"
                    style={{
                      marginRight: 6,
                    }}
                  >
                    Supprimer la photo
                  </Text>
                </TouchableOpacity>
                )}
              </View>
            </View>

          </MotiView>
          {/**
          *  Identité 2/3 title
          */}
          <TouchableOpacity
            style={[
              styles.item,
              {
                backgroundColor: (
                // eslint-disable-next-line no-nested-ternary
                  (etape === 1)
                    ? colors.blanc
                    : ((etape === 0) ? theme['color-warning-100'] : theme['color-success-100'])
                ),
                marginTop: 29,
              },
            ]}
            onPress={() => setEtape(1)}
          >
            <Text
              category="h6"
            >
              Localisation (2/3)
            </Text>
          </TouchableOpacity>
          {/**
           Identité 2/3  ( etape2 )
           * */}
          <MotiView
            animate={{ height: (etape === 1 ? 340 : 0) }}
            style={{
              overflow: 'hidden',
              flexDirection: 'column',
              marginLeft: 23,
              marginRight: 22,
              justifyContent: 'space-between',
            }}
            transition={{ type: 'timing', duration: 500 }}
          >

            <TextInput
              name="address.address"
              placeholder="Adresse"
              validators={[
                AvailableValidationRules.required,
              ]}
            />
            <TextInput
              name="address.additionalAddress"
              placeholder="Complément d'adresse"
            />
            <TextInput
              name="address.postalCode"
              placeholder="Code Postal"
              maxLength={5}
              validators={[
                AvailableValidationRules.required,
              ]}
            />
            <TextInput
              name="address.city"
              placeholder="Ville"
              validators={[
                AvailableValidationRules.required,
              ]}
            />
            <TextInput
              name="address.country"
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
          <TouchableOpacity
            onPress={() => setEtape(2)}
            style={[
              styles.item,
              {
                backgroundColor: ((etape === 2)
                  ? colors.blanc : (theme['color-warning-100'])),
                marginTop: 29,
              },
            ]}
          >
            <Text
              category="h6"
            >
              Mode de détention (3/3)
            </Text>
          </TouchableOpacity>
          {/**
           *  Mode de détention
           *  Identité 3/3 (etape 3)
           */}
          <MotiView
            animate={{ maxHeight: (etape === 2 ? 600 : 0) }}
            style={{
              overflow: 'hidden',
              flex: 1,
              flexDirection: 'column',
              marginHorizontal: 23,
              // justifyContent: 'space-between',
            }}
            transition={{ type: 'timing', duration: 500 }}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 15,
              height: 70,
            }}
            >
              <Text category="h5" status="basic" style={{ marginRight: 20 }}>
                Année d'acquisition *
              </Text>
              <TextInput
                name="purchaseYear"
                keyboardType="numeric"
                placeholder="yyyy"
                maxLength={4}
                icon="calendar-outline"
                validators={[
                  {
                    rule: AvailableValidationRules.required,
                    errorMessage: 'L\'année d\'acquisition est requise',
                  }]}
              />
            </View>

            <View style={{ flexDirection: 'row', height: 70 }}>
              <SelectComp
                name="type"
                data={typeBienArray}
                placeholder="Type de Bien"
                size="large"
                appearance="default"
                status="primary"
                validators={[AvailableValidationRules.required]}
              />
            </View>
            <View style={{ flexDirection: 'row', height: 70, marginTop: 5 }}>
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
              <View style={{ height: 70 }}>
                <SelectComp
                  name=""
                  data={typeDetentionArray}
                  placeholder="Type De Détention"
                  onChangeValue={(v) => {
                    if (v === 'indivision') {
                      setPourcentageDetentionShow(true);
                    } else {
                      ajoutBienForm.setValue('detentionPart', '100');
                      setPourcentageDetentionShow(false);
                    }
                  }}
                  size="large"
                  appearance="default"
                  validators={[AvailableValidationRules.required]}
                  status="primary"
                  defaultValue={detentionPartDefault}
                />
              </View>
              )}

            {statutShow
              && (
              <>
                <View style={{ height: 70 }}>
                  <SelectComp
                    name="company"
                    data={typeStatutArray}
                    placeholder="Status"
                    size="large"
                    appearance="default"
                    status="primary"
                    onChangeValue={(value) => {
                    // value doit se référer a l'enum "CompanyType" dans API.ts
                      if (value === 'SAS' || value === 'SARLclassique') {
                        ajoutBienForm.setValue('typeImpot', 'SocialTax');
                        ajoutBienForm.setValue('typeImpot', 'SocialTax');
                        setSocialTaxShow(true);
                      } else {
                        setSocialTaxShow(false);
                      }
                    }}
                    validators={[AvailableValidationRules.required]}
                  />
                </View>
                <View style={{ height: 70 }}>
                  <SelectComp
                    name="typeImpot"
                    data={typeImpotArray}
                    placeholder="Type d'imposition"
                    disabled={socialTaxShow}
                    size="large"
                    appearance="default"
                    status="primary"
                    validators={[AvailableValidationRules.required]}
                  />
                </View>
              </>
              )}

            {
              pourcentageDetentionShow
              && (
              <View
                      // animate={{ maxHeight: ( ? 58 : 0) }}
                style={{
                  height: 60,
                  marginTop: 5,
                  overflow: 'hidden',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
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
                    maxLength={4}
                    keyboardType="numeric"
                    style={{ marginRight: 10 }}
                  />
                  <Text category="h5">%</Text>
                </View>

              </View>
              )
            }

            <View style={{
              flexDirection: 'row', alignItems: 'center', height: 70, marginTop: 5,
            }}
            >
              <Text category="h5">Prix d'acquisition *</Text>
              <TextInput
                name="purchasePrice"
                size="small"
                keyboardType="numeric"
                maskOptions={{
                  type: 'money',
                  options: {
                    precision: 2,
                    separator: ',',
                    delimiter: ' ',
                    unit: '',
                    suffixUnit: ' €',
                  },
                }}
                validators={[
                  {
                    rule: AvailableValidationRules.required,
                    errorMessage: 'Le prix d\'acquisition est requis',
                  },
                  AvailableValidationRules.float,
                ]}
                style={{ flex: 1, marginRight: 10, marginHorizontal: 10 }}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 70 }}>
              <Text category="h5">Frais de notaire *</Text>
              <TextInput
                name="notaryFee"
                size="small"
                keyboardType="numeric"
                maskOptions={{
                  type: 'money',
                  options: {
                    precision: 2,
                    separator: ',',
                    delimiter: ' ',
                    unit: '',
                    suffixUnit: ' €',
                  },
                }}
                validators={[
                  {
                    rule: AvailableValidationRules.required,
                    errorMessage: 'Les frais de notaire sont requis',
                  }, AvailableValidationRules.float]}
                style={{ flex: 1, marginRight: 10, marginHorizontal: 10 }}
              />
            </View>
            <View style={{ marginTop: 10, marginBottom: 20 }}>

              <Button
                loading={createRealEstate.mutationLoading || updateRealEstate.mutationLoading}
                loadingText="Chargement"
                onPress={ajoutBienForm.handleSubmit((data) => onAjoutBien(data),
                  (data) => {
                    if (data.name) {
                      setEtape(0);
                    } else if (data.address) {
                      setEtape(1);
                    }
                  })}
                size="large"
              >
                Enregistrer
              </Button>

            </View>
          </MotiView>

          <Text category="c1" appearance="hint" style={{ margin: 23 }}>
            * champs obligatoires
          </Text>
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
