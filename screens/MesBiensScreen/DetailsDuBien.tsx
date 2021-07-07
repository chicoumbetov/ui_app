/**
 * Page 2 Mes Biens -> DetailsBiens
 *
 * @author: Shynggys UMBETOV
 */

import React, { useMemo, useState } from 'react';
import {
  Text, Icon as IconUIKitten, useTheme, CheckBox, Modal,
} from '@ui-kitten/components';
import {
  Alert, Platform,
  StyleSheet, TouchableOpacity, View,
} from 'react-native';
import {
  useLinkTo, useNavigation, useRoute,
} from '@react-navigation/native';

import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import * as DocumentPicker from 'expo-document-picker';
import moment from 'moment';
import Icon from '../../components/Icon';
import MaxWidthContainer from '../../components/MaxWidthContainer';

import {
  useDeleteRealEstateMutation,
  useGetRealEstate, useRentability,
  useUpdateRealEstateMutation,
} from '../../src/API/RealEstate';
import { TabMesBiensParamList } from '../../types';

import Card from '../../components/Card';
import Separator from '../../components/Separator';

import DocumentComponent from '../../components/DocumentComponent';
import { useCreateDocumentMutation, useDeleteDocumentMutation } from '../../src/API/Document';

import ReadOnly from '../../components/ReadOnly';
import { Upload } from '../../utils/S3FileStorage';
import Amount from '../../components/Amount';

import AutoAvatar from '../../components/AutoAvatar';
import ActivityIndicator from '../../components/ActivityIndicator';
import UserSharedCard from './Components/UserSharedCard';
import { useDeleteTenantMutation } from '../../src/API/Tenant';
import Camera from '../../components/Camera';
import { BudgetLineType, PendingInvitation } from '../../src/API';
import { useDeletePendingInvitationMutation } from '../../src/API/PendingInvitation';
import { typeBien } from '../../mockData/ajoutBienData';
import Percentage from '../../components/Percentage';

function DetailsBien() {
  const navigation = useNavigation();
  const linkTo = useLinkTo();
  const theme = useTheme();
  const route = useRoute<RouteProp<TabMesBiensParamList, 'detail-bien'>>();
  const { bienget, loading } = useGetRealEstate(route.params.id, 'cache-and-network');
  // console.log('Details Bien: ', bienget, loading);

  const createDocument = useCreateDocumentMutation();
  // console.log('detail bien document', documentList);
  const [supprim, setSupprim] = useState(false);
  const [supprimInvitation, setSupprimInvitation] = useState(false);

  const [checkedTenant, setCheckedTenant] = useState<string[]>([]);
  const [checkedAdmins, setCheckedAdmins] = useState<string[]>([]);
  const [checkedShare, setCheckedShare] = useState<string[]>([]);
  const [checkedDocument, setCheckedDocument] = useState<
  Array<{ id: string, _version: number }
  >>([]);
  const [checkedPending, setCheckedPending] = useState<
  Array<{ id: string, _version: number }
  >>([]);

  const readOnly = ReadOnly.readOnly(route.params.id);
  /**
  const users = useGetUserByIDList(Array.prototype.concat(
   bienCharger?.admins,
   bienCharger?.shared));
  const invitateUserId = pendingInvitations?.filter(
    (item) => item?.realEstateId === route.params.id,
  );
  */

  const [camera, setCamera] = useState(false);
  const [uploading, setUploading] = useState(false);
  const onTakePicture = () => {
    setCamera(true);
  };

  // const [compte, setCompte] = useState(comptesData);

  const allerMonBudget = () => {
    // console.log(route.params.id);
    navigation.navigate('mon-budget', { id: route.params.id });
  };
  // console.log('pending invitation: ', bienget?.pendingInvitations?.items);
  const allerTresorerie = () => {
    linkTo(`/ma-tresorerie/${route.params.id}/mes-comptes/`);
  };

  const allerMesRapports = () => {
    linkTo(`/mes-biens/mes-rapports-biens1/${bienget.id}`);
  };

  const allerMonAssistant = () => {
    linkTo('/mon-assistant');
  };
  const allerPartagerBien = () => {
    navigation.navigate('partager-bien', { id: route.params.id });
  };
  const allerModifierCharacteristics = () => {
    navigation.navigate('modifier-characteristique', { id: route.params.id });
  };

  const deleteRealEstate = useDeleteRealEstateMutation;
  const supprimerLeBien = async () => {
    return false;
    Alert.alert(
      'Suppression de revenue',
      '',
      [{
        text: 'Annuler',
        style: 'cancel',
      },
      {
        text: 'Valider',
        onPress: async () => {
          await deleteRealEstate();
          // delete tenants
          // BudgetLines, budgetLineDeadlines
        },
      }],
    );
  };

  const [supprimTenant, setSupprimTenant] = useState(false);
  const useDeleteTenant = useDeleteTenantMutation();
  const deleteTenant = async () => {
    if (supprimTenant && checkedTenant.length > 0) {
      Alert.alert(
        'Suppression de locataire',
        '',
        [{
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Valider',
          onPress: async () => {
          // reduce needed to do async
            await useDeleteTenant(bienget, checkedTenant);
          },
        }],
      );
    }
  };

  const deleteDoc = useDeleteDocumentMutation();
  const supprimerDocument = async () => {
    if (checkedDocument.length > 0) {
      Alert.alert(
        'Suppression de document',
        '',
        [{
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Valider',
          onPress: async () => {
            const promises = checkedDocument.map(async (doc) => {
              await deleteDoc({
                variables: {
                  input: {
                    id: doc.id,
                    // eslint-disable-next-line no-underscore-dangle
                    _version: doc._version,
                  },
                },
              });
            });
            await Promise.all(promises);
          },
        }],
      );
    } else {
      setSupprim(false);
    }
  };

  const updateRealEstate = useUpdateRealEstateMutation();

  const deletePendingInvitation = useDeletePendingInvitationMutation();
  const supprimerAdminShare = async () => {
    if (checkedAdmins.length > 0 || checkedShare.length > 0 || checkedPending.length > 0) {
      Alert.alert(
        'Suppression de partage de bien',
        '',
        [{
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Valider',
          onPress: async () => {
            if (checkedAdmins.length > 0) {
              const promises = checkedAdmins.map(async (idAdmins) => {
                const admins = bienget.admins.filter((admin) => admin !== idAdmins);
                await updateRealEstate.updateRealEstate({
                  variables: {
                    input: {
                      id: bienget.id,
                      admins,
                      // eslint-disable-next-line no-underscore-dangle
                      _version: bienget._version,
                    },
                  },
                });
              });
              await Promise.all(promises);
            }
            if (checkedShare.length > 0) {
              const promises = checkedShare.map(async (idShare) => {
                const shared = bienget?.shared?.filter((share) => share !== idShare);
                await updateRealEstate.updateRealEstate({
                  variables: {
                    input: {
                      id: bienget.id,
                      shared,
                      // eslint-disable-next-line no-underscore-dangle
                      _version: bienget._version,
                    },
                  },
                });
              });
              await Promise.all(promises);
            }
            if (checkedPending.length > 0) {
              const promises = checkedPending.map(async (current) => {
                await deletePendingInvitation.deletePendingInvitation({
                  variables: {
                    input: {
                      id: current.id,
                      // eslint-disable-next-line no-underscore-dangle
                      _version: current._version,
                    },
                  },
                });
              });
              await Promise.all(promises);
            }
          },
        }],
      );
    } else {
      setSupprim(false);
    }
  };

  // budgetLines are already sorted in schema.graphql
  // sortDirection: ASC
  const nextexpense = bienget?.budgetLines?.items
        && bienget?.budgetLines?.items.length > 0
        && Math.round((bienget?.budgetLines?.items[0]?.amount) * 100) / 100;

  const { bankMovements, budgetLineDeadlines } = bienget || {};

  // useMemo used if big O notation is expensive. higher than n to the power 2
  const dernierMovement = useMemo(() => bankMovements?.items?.find(
    (item) => (!item?.ignored),
  ), [bankMovements]);

  // console.log('last Movement', dernierMovement);
  let invitationAttente : (PendingInvitation | null)[];
  if (bienget?.pendingInvitations?.items) {
    // eslint-disable-next-line no-underscore-dangle
    invitationAttente = bienget?.pendingInvitations?.items.filter((item) => !item?._deleted);
  }
  // console.log('pending : ', invitationAttente);

  const rentability = useRentability(
    budgetLineDeadlines?.items,
    (bienget.purchasePrice || 0) + (bienget.notaryFee || 0),
  );
  // console.log('renta', rentability);

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
      }}
    >

      {/**
       *  I. Details du bien
       */}
      {loading
        ? <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}><ActivityIndicator /></View>
        : (
          <>
            <View style={styles.container}>
              <Text category="h1" status="basic">
                Détails du bien
                {/**
                     {route.params.id}
                     */}
              </Text>
              <View style={{ alignItems: 'center', marginTop: 30 }}>
                {/** <MaisonVert
                     height={100}
                     width={100}
                     style={{ marginRight: 12, marginBottom: 10 }}
                     /> */}
                <AutoAvatar
                  avatarInfo={bienget?.iconUri}
                  style={{
                    height: 100,
                    width: 100,
                    marginRight: 12,
                    marginBottom: 10,
                    borderRadius: 50,
                    overflow: 'hidden',
                  }}
                />
                <Text category="h2" status="basic">
                  {bienget?.name}
                </Text>
              </View>

            </View>
          </>
        )}

      {/**
       *  II. Compteurs
       */}
      <Separator />
      {loading
        ? <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}><ActivityIndicator /></View>
        : (
          <>
            <View style={styles.container}>
              <Text category="s2" style={{ marginBottom: 30 }}>
                Compteurs
              </Text>

              <Card style={{ flexDirection: 'row' }}>
                <View style={styles.oneThirdBlock}>
                  <Text category="h6" appearance="hint" style={styles.text}>Dernier mouvement</Text>
                  {dernierMovement ? (
                    <Amount amount={dernierMovement?.amount || 0} category="h3" />
                  ) : (
                    <Amount amount={0} category="h3" />
                  )}
                </View>

                <View style={styles.oneThirdBlock}>
                  <Text category="h6" appearance="hint" style={styles.text}>
                    Prochaine dépense
                  </Text>
                  <Amount amount={nextexpense || 0} category="h3" />
                </View>

                <View style={styles.oneThirdBlock}>
                  <Text category="h6" appearance="hint" style={styles.text}>
                    Rentabilité du bien
                  </Text>
                  <Percentage amount={rentability} category="h3" status="warning" style={{ marginTop: 14 }} />
                </View>
              </Card>

            </View>
          </>
        )}

      {/**
       *  III. Budget
       */}
      <Separator />
      <View style={styles.container}>

        <Text category="s2" style={{ marginBottom: 30 }}>
          Budget
        </Text>
        {/**   1   */}
        <Card
          onPress={() => allerMonBudget()}
          style={[styles.docs, {
            alignItems: 'center',
            justifyContent: 'center',
          }]}
        >
          <Icon name="calculator" size={33} color={theme['color-success-400']} style={{ marginRight: 10 }} />
          <Text category="h5">
            Mon Budget
          </Text>
        </Card>

      </View>

      {/**
       *  IV. Nos Services
       */}
      <Separator />
      <View style={styles.container}>

        <Text category="s2" style={{ marginBottom: 30 }}>
          Nos Services
        </Text>
        {/**   1   */}
        <Card
          onPress={() => allerTresorerie()}
          style={[styles.docs, {
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }]}
        >
          <Icon name="money" size={30} color={theme['color-success-400']} style={{ marginRight: 10 }} />
          <Text category="h5">
            Ma Trésorerie
          </Text>
        </Card>

        {/**   2   */}
        <Card
          onPress={() => allerMesRapports()}
          style={[styles.docs, {
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }]}
        >
          <IconUIKitten
            name="trending-up-outline"
            fill={theme['color-primary-400']}
            style={{
              height: 30, width: 30, marginRight: 10,
            }}
          />
          <Text category="h5">
            Mes Rapports
          </Text>
        </Card>

        {/**   3   */}
        <Card
          onPress={() => allerMonAssistant()}
          style={[styles.docs, {
            alignItems: 'center',
            justifyContent: 'center',
          }]}
        >
          <IconUIKitten
            name="file-text-outline"
            fill={theme['color-primary-400']}
            style={{
              height: 30, width: 30, marginRight: 10,
            }}
          />
          <Text category="h5">
            Mon Assistant
          </Text>
        </Card>

      </View>

      {/**
       *  V. Characteristiques
       */}
      <Separator />
      {loading
        ? <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}><ActivityIndicator /></View>
        : (
          <View style={styles.container}>
            <Text category="s2" style={{ marginBottom: 30 }}>
              Caractéristiques
            </Text>
            <Card style={styles.compteSection}>
              {/* use SectionList to render several accounts with its types and details */}
              <Text category="h6" status="basic">Localisation</Text>
              <Text category="h6" appearance="hint" style={{ marginTop: 6 }}>
                {`${bienget?.address?.address} ${bienget?.address?.postalCode} ${bienget?.address?.city}`}
              </Text>
              <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

              <Text category="h6" status="basic" style={{ marginTop: 8 }}>Date d'acquisition</Text>
              <Text category="h6" appearance="hint" style={{ marginTop: 5 }}>
                {bienget?.purchaseYear || undefined}
              </Text>
              <View style={{ borderBottomWidth: 0.3, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

              <Text category="h6" status="basic" style={{ marginTop: 8 }}>Type de bien</Text>
              <Text category="h6" appearance="hint" style={{ marginTop: 5 }}>
                {`${bienget.type ? typeBien[bienget.type].label : ''}`}
              </Text>
              <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

              <Text category="h6" status="basic" style={{ marginTop: 10 }}>Mode de détention</Text>
              <Text category="h6" appearance="hint" style={{ marginTop: 5 }}>
                {bienget?.ownName ? 'Nom propre' : 'Société'}
              </Text>
              <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

              <Text category="h6" status="basic" style={{ marginTop: 8 }}>Nombre de parts</Text>
              <Text category="h6" appearance="hint" style={{ marginTop: 5 }}>
                {`${bienget?.detentionPart || undefined} %`}
              </Text>
            </Card>
            {!readOnly && (
            <TouchableOpacity onPress={() => {
              allerModifierCharacteristics();
            }}
            >
              <Text category="h5" status="info" style={styles.buttonText}>Modifier le bien</Text>
            </TouchableOpacity>
            )}

          </View>
        )}

      {/**
       *  VI. Gestion des locataires
       */}
      <Separator />
      {loading
        ? <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}><ActivityIndicator /></View>
        : (
          <>
            <View style={styles.container}>
              <Text category="s2">
                Mes locataires
              </Text>
              <Text category="p2" appearance="hint" style={{ marginBottom: 30 }}>
                Vous pouvez ajouter ou modifier vos locataires
                en paramétrant vos revenus de type "Loyer" dans votre espace "Mon Budget".
              </Text>

              {/* use SectionList to render several accounts with its types and details */}
              {/**
                   <Text category="h6" status="basic">
                   {clientData.prenom}
                   </Text>
                   */}
              {bienget?.tenants?.map((tenant) => (
                tenant && (
                <Card
                  style={{
                    paddingVertical: 24,
                    paddingHorizontal: 26.5,
                    marginBottom: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderWidth: checkedTenant.indexOf(tenant?.id) > -1 ? (1) : (0),
                    borderColor: 'red',
                  }}
                  key={tenant?.id}
                >
                  {supprimTenant && (
                  <View
                    style={{ justifyContent: 'center', paddingHorizontal: 14, width: 50 }}
                  >
                    <CheckBox
                          // 1 -> 3
                      checked={checkedTenant.indexOf(tenant?.id) > -1}
                      onChange={(newChecked) => {
                        // 2
                        // 4
                        const nextCheckedTenants = checkedTenant
                          .filter((id) => id !== tenant?.id);
                        // 2
                        if (newChecked) {
                          nextCheckedTenants.push(tenant?.id);
                        }
                        // 2
                        // 4
                        // console.log('nextCheckedAccounts', nextCheckedAccounts);
                        setCheckedTenant(nextCheckedTenants);
                      }}
                      status="danger"
                    />
                  </View>
                  )}
                  <View style={{ flex: 1 }}>
                    <Text category="h6" status="basic">{`${tenant?.firstname} ${tenant?.lastname}`}</Text>
                    <Text category="h6" appearance="hint">{`${tenant?.amount} €`}</Text>
                    <Text category="h6" appearance="hint" style={{ marginTop: 6 }} />
                    <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#b5b5b5', marginVertical: 15 }} />

                    <Text category="h6" status="basic" style={{ marginTop: 7 }}>Date de fin de bail</Text>
                    <Text
                      category="h6"
                      appearance="hint"
                      style={{
                        marginTop: 5,
                      }}
                    >
                      {`${moment(tenant?.endDate).format('DD/MM/YYYY')}`}
                    </Text>
                  </View>
                </Card>
                )
              ))}
              {!readOnly && (
              <TouchableOpacity
                onPress={() => {
                  deleteTenant(); setSupprimTenant(!supprimTenant);
                }}
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'flex-end',
                }}
              >
                <Text category="h5" status={checkedTenant.length > 0 ? ('danger') : ('basic')} style={styles.buttonText}>{checkedTenant.length > 0 || !supprimTenant ? ('Supprimer') : ('Annuler')}</Text>
              </TouchableOpacity>
              )}
            </View>
          </>
        )}

      {/**
       *  VII. Documents
       */}
      <Separator />
      {loading
        ? <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}><ActivityIndicator /></View>
        : (
          <>
            <View style={styles.container}>
              <Text category="s2" style={{ marginBottom: 30 }}>
                Documents
              </Text>
              {bienget?.documents?.items?.map(
                // eslint-disable-next-line no-underscore-dangle
                (item) => item && !item._deleted && (
                <DocumentComponent
                  key={item?.id}
                  document={item}
                  checked={checkedDocument.find(({ id }) => (id === item.id)) !== undefined}
                  supprimer={supprim}
                  onCheck={(checked) => {
                    const nextCheckedAccounts = checkedDocument.filter((id) => id !== item.id);
                    if (checked) {
                      // eslint-disable-next-line no-underscore-dangle
                      nextCheckedAccounts.push({ id: item.id, _version: item._version });
                    }
                    // console.log('nextCheckedAccounts', nextCheckedAccounts);
                    setCheckedDocument(nextCheckedAccounts);
                  }}
                />
                ),
              )}

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              >

                <TouchableOpacity
                  onPress={
                          async () => {
                            // console.log('should');
                            // get document from gallery of phone
                            const doc = await DocumentPicker.getDocumentAsync();
                            // doc has 4 attributes : name, size, type: 'success', uri
                            // console.log('doc ajouter:', doc);
                            const name = doc.type === 'success' ? doc.name : '';
                            // console.log('name ajouter: ', name);
                            if (doc.type === 'success') {
                              setUploading(true);
                              // upload chosen document from gallery to s3
                              const s3file = await Upload(doc, `biens/${route.params.id}/documents/`);
                              if (s3file !== false && route.params.id) {
                                // console.log('s3file ajouter: ', s3file);
                                // const doc =
                                await createDocument.createDocument({
                                  variables: {
                                    input: {
                                      s3file: s3file.key,
                                      realEstateId: route.params.id,
                                      name,
                                    },
                                  },
                                });
                              }
                            }
                            setUploading(false);
                            // console.log(key);
                          }
                        }
                >
                  <Text category="h5" status="info" style={styles.buttonText}>Ajouter</Text>
                </TouchableOpacity>

                {!readOnly && (
                <TouchableOpacity onPress={() => {
                  supprimerDocument(); setSupprim(!supprim);
                }}
                >
                  <Text category="h5" status={checkedDocument.length > 0 ? ('danger') : ('basic')} style={styles.buttonText}>{checkedDocument.length > 0 || !supprim ? ('Supprimer') : ('Annuler')}</Text>
                </TouchableOpacity>
                )}
              </View>
              {/**
               Taking picture of document
               */}
              {Platform.OS !== 'web' && (
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              >
                <TouchableOpacity
                  onPress={() => onTakePicture()}
                >
                  <Text category="h5" status="info" style={styles.buttonText}>Prendre une photo</Text>
                </TouchableOpacity>
              </View>
              )}
              {Platform.OS !== 'web' && (
              <Modal
                visible={camera}
                style={{
                  overflow: 'hidden', alignItems: 'center', margin: 0, height: '100%',
                }}
              >
                {camera && (
                <Camera
                  onClose={() => {
                    setCamera(false);
                  }}
                  onChoose={async (result) => {
                    if (result) {
                      setCamera(false);
                      setUploading(true);
                      // setImage(result.uri);
                      // console.log('result:', result);
                      const s3file = await Upload(result, `biens/${route.params.id}/documents/`);
                      // console.log('s3file :', s3file);
                      // s3fil has 4 attributes: key, name, originalFilename: undefined, uri
                      if (s3file !== false && route.params.id) {
                        // const doc =
                        await createDocument.createDocument({
                          variables: {
                            input: {
                              s3file: s3file.key,
                              realEstateId: route.params.id,
                              name: s3file.name,
                            },
                          },
                        });
                      }
                    }
                    setUploading(false);
                  }}
                  withPreview
                  ratio={[1, 1.41]}
                />
                )}
              </Modal>
              )}
              {uploading && (
              <View style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(255,255,255,0.8)',
              }}
              >
                <View style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                >
                  <Text category="h4" status="primary">Chargement du document</Text>
                  <ActivityIndicator />
                </View>
              </View>
              )}
            </View>
          </>
        )}
      {/**
       *  VIII. Partager votre bien
       */}
      <Separator />
      <View style={styles.container}>
        <Text category="s2" style={{ marginBottom: 30 }}>
          Partager votre bien
        </Text>
        {bienget?.admins.map((idAdmin) => (
          <UserSharedCard
            idUser={idAdmin}
            admin
            key={idAdmin}
            supprimer={supprimInvitation}
            onCheck={(checked) => {
              const nextCheckedAccounts = checkedAdmins.filter((thisId) => thisId !== idAdmin);
              if (checked) {
                nextCheckedAccounts.push(idAdmin);
              }
              //   console.log('nextCheckedAccounts', nextCheckedAccounts);
              setCheckedAdmins(nextCheckedAccounts);
            }}
          />
        ))}
        {bienget?.shared?.map((idShare) => (
          <UserSharedCard
            idUser={idShare}
            admin={false}
            key={idShare}
            supprimer={supprimInvitation}
            onCheck={(checked) => {
              const nextCheckedAccounts = checkedAdmins.filter((thisId) => thisId !== idShare);
              if (checked) {
                nextCheckedAccounts.push(idShare);
              }
              // console.log('nextCheckedAccounts', nextCheckedAccounts);
              setCheckedShare(nextCheckedAccounts);
            }}
          />
        ))}
        {invitationAttente?.map((pending) => (
          pending?.type === 'Admin' ? (
            <UserSharedCard
              email={pending.email}
              admin
              supprimer={supprimInvitation}
              onCheck={(checked) => {
                const nextCheckedAccounts = checkedPending.filter(
                  (thisId) => thisId.id !== pending.id,
                );
                if (checked) {
                  // eslint-disable-next-line no-underscore-dangle
                  nextCheckedAccounts.push({ id: pending.id, _version: pending._version });
                }
                // console.log('nextCheckedAccounts', nextCheckedAccounts);
                setCheckedPending(nextCheckedAccounts);
              }}
            />
          ) : (
            <UserSharedCard
              email={pending?.email}
              admin={false}
              key={pending?.id}
              supprimer={supprimInvitation}
              onCheck={(checked) => {
                const nextCheckedAccounts = checkedPending.filter(
                  (thisId) => thisId.id !== pending?.id,
                );
                if (checked) {
                  // eslint-disable-next-line no-underscore-dangle
                  nextCheckedAccounts.push({ id: pending?.id, _version: pending?._version });
                }
                // console.log('nextCheckedAccounts', nextCheckedAccounts);
                setCheckedPending(nextCheckedAccounts);
              }}
            />
          )
        ))}
        {!readOnly && (
        <View style={styles.button}>
          <TouchableOpacity onPress={() => {
            allerPartagerBien();
          }}
          >
            <Text category="h5" status="info" style={styles.buttonText}>Ajouter</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            supprimerAdminShare();
            setSupprimInvitation(!supprimInvitation);
          }}
          >
            <Text category="h5" status="basic" style={styles.buttonText}>Supprimer</Text>
          </TouchableOpacity>
        </View>
        )}
      </View>

      {/**
       *  Supprimer le bien
       */}
      <Separator />
      {!readOnly && (
      <TouchableOpacity onPress={() => {
        supprimerLeBien();
      }}
      >
        <View style={[styles.container, { alignItems: 'center' }]}>
          <Text category="h5" status="danger" style={{ marginVertical: 20 }}>
            Supprimer le bien
          </Text>

        </View>
      </TouchableOpacity>
      )}

    </MaxWidthContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    paddingHorizontal: 26,
  },

  // Compteurs
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

  // Characteristiques
  compteSection: {
    paddingVertical: 24,
    paddingHorizontal: 26.5,
    marginBottom: 10,
  },

  // Aide Declaration Impots
  docs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: 28,
  },

  // Ajouter Supprimer buttons
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    marginLeft: 6,
    marginTop: 20,
  },
});

export default DetailsBien;
