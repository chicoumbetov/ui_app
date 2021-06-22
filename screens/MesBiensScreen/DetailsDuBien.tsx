/**
 * Page 2 Mes Biens -> DetailsBiens
 *
 * @author: Shynggys UMBETOV
 */

import React, { useEffect, useState } from 'react';
import {
  Text, Icon as IconUIKitten, useTheme, CheckBox,
} from '@ui-kitten/components';
import {
  Alert,
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

import { useDeleteRealEstateMutation, useGetRealEstate, useUpdateRealEstateMutation } from '../../src/API/RealEstate';
import { TabMesBiensParamList } from '../../types';

import Card from '../../components/Card';
import Separator from '../../components/Separator';

import DocumentComponent from '../../components/DocumentComponent';
import { useCreateDocumentMutation, useDeleteDocumentMutation } from '../../src/API/Document';

import { BudgetLineType } from '../../src/API';
import ReadOnly from '../../components/ReadOnly';
import { Upload } from '../../utils/S3FileStorage';
import Amount from '../../components/Amount';
import DateUtils from '../../utils/DateUtils';

import AutoAvatar from '../../components/AutoAvatar';
import ActivityIndicator from '../../components/ActivityIndicator';
import UserSharedCard from './Components/UserSharedCard';

function DetailsBien() {
  const navigation = useNavigation();
  const linkTo = useLinkTo();
  const theme = useTheme();
  const route = useRoute<RouteProp<TabMesBiensParamList, 'detail-bien'>>();
  const { bienget, loading } = useGetRealEstate(route.params.id);

  const createDocument = useCreateDocumentMutation();
  // console.log('detail bien document', documentList);
  const [supprim, setSupprim] = useState(false);

  const [typeRevenu, setTypeRevenu] = useState<string>();
  // console.log(route.params.id);

  const [checkedTenant, setCheckedTenant] = useState<string[]>([]);
  const [checkedDocument, setCheckedDocument] = useState<string[]>([]);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const readOnly = ReadOnly.readOnly(route.params.id);
  /**
  const users = useGetUserByIDList(Array.prototype.concat(
   bienCharger?.admins,
   bienCharger?.shared));
  const invitateUserId = pendingInvitations?.filter(
    (item) => item?.realEstateId === route.params.id,
  );
   */

  // console.log(users, invitateUserId);

  useEffect(() => {
    switch (bienget?.type) {
      default:
        setTypeRevenu('Type de bien');
        break;
      case 'mainHome':
        setTypeRevenu('Résidence Principal');
        break;
      case 'secondHome':
        setTypeRevenu('Résidence Secondaire');
        break;
      case 'professionnalRentalInvestment':
        setTypeRevenu('Investissement Locatif Professionnel ou Commercial');
        break;
      case 'privateRentalInvestment':
        setTypeRevenu('Investissement Locatif Particulier');
        break;
    }
  }, [bienget]);

  // const [compte, setCompte] = useState(comptesData);

  const allerMonBudget = () => {
    navigation.navigate('mon-budget', { id: route.params.id });
  };
  // console.log('pending invitation: ', bienget?.pendingInvitations?.items);
  const allerTresorerie = () => {
    linkTo(`/ma-tresorerie/ma-tresorerie-2/${route.params.id}`);
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
        },
      }],
    );
  };

  const [supprimTenant, setSupprimTenant] = useState(false);
  const deleteLocataire = useUpdateRealEstateMutation();
  const deleteTenant = async () => {
    return false;
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
          checkedTenant.reduce(async (promise, id) => {
            // console.log('id:', id);
            await promise;
            await deleteLocataire({
              variables: {
                input: {
                  id,
                },
              },
            });
          }, Promise.resolve());
        },
      }],
    );
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
            const promises = checkedDocument.map(async (docId) => {
              await deleteDoc({
                variables: {
                  input: {
                    id: docId,
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

  const allDataNextExpense = bienget?.budgetLineDeadlines?.items
      && bienget?.budgetLineDeadlines?.items?.map((item) => {
        // years for all existing Eau expenses in whole period
        // console.log('--------------------', item);
        const allYears = DateUtils.parseToDateObj(item?.date).getFullYear();
        const allMonths = DateUtils.parseToDateObj(item?.date).getMonth();

        if (item?.type === BudgetLineType.Expense
            // eslint-disable-next-line no-underscore-dangle
            && !item?._deleted
            && allYears === currentYear
            && allMonths === currentMonth + 1
        ) {
          // console.log('months: ', item?.amount, DateUtils.parseToDateObj(item?.date));

          return item;
        }
        return false;
      });

  const nextexpense = allDataNextExpense?.map((d) => d?.amount)
    .find((m) => m);

  const dernierMovement = bienget?.bankMovements?.items?.find(
    (item) => { if (item?.ignored) { return false; } return true; },
  );
  // console.log('last Movement', dernierMovement);

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
        ? <ActivityIndicator />
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
                    height: 100, width: 100, marginRight: 12, marginBottom: 10,
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
        ? <ActivityIndicator />
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
                    <Amount amount={dernierMovement?.amount || 0} category="h4" />
                  ) : (
                    <Amount amount={0} category="h4" />
                  )}
                </View>

                <View style={styles.oneThirdBlock}>
                  <Text category="h6" appearance="hint" style={styles.text}>
                    Prochaine dépense
                  </Text>
                  <Text category="h3" status="danger" style={{ marginTop: 14 }}>
                    {`${(nextexpense) || '0'} €`}
                  </Text>
                </View>

                <View style={styles.oneThirdBlock}>
                  <Text category="h6" appearance="hint" style={styles.text}>
                    Réntabilité du bien
                  </Text>
                  <Text category="h3" status="warning" style={{ marginTop: 14 }}>60 %</Text>
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
          onPress={() => allerMonBudget}
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
          onPress={() => allerTresorerie}
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
          onPress={() => allerMonAssistant}
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
        ? <ActivityIndicator />
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
                {`${typeRevenu}`}
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
        ? <ActivityIndicator />
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
                <Card
                  style={{
                    paddingVertical: 24,
                    paddingHorizontal: 26.5,
                    marginBottom: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                  key={tenant?.id}
                >
                  {supprimTenant && (
                    <View
                      style={{ justifyContent: 'center', paddingHorizontal: 14, width: 50 }}
                    >
                      <CheckBox
                        checked={checkedTenant.indexOf(tenant?.id) > -1}
                        onChange={(checked) => {
                          const nextCheckedTenants = checkedTenant
                            .filter((id) => id !== tenant?.id);
                          if (checked) {
                            nextCheckedTenants.push(tenant?.id);
                          }
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
              )) || undefined}
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
                <Text category="h5" status="basic" style={styles.buttonText}>Supprimer</Text>
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
        ? <ActivityIndicator />
        : (
          <>
            <View style={styles.container}>
              <Text category="s2" style={{ marginBottom: 30 }}>
                Documents
              </Text>
              {bienget?.documents?.items?.map(
                (item) => item && (
                <DocumentComponent
                  key={item?.id}
                  document={item}
                  checked={checkedDocument.indexOf(item.id) > -1}
                  supprimer={supprim}
                  onCheck={(checked) => {
                    const nextCheckedAccounts = checkedDocument.filter((id) => id !== item.id);
                    if (checked) {
                      nextCheckedAccounts.push(item.id);
                    }
                    // console.log('nextCheckedAccounts', nextCheckedAccounts);
                    setCheckedDocument(nextCheckedAccounts);
                  }}
                />
                ),
              )}

              <View style={styles.button}>
                <TouchableOpacity
                  onPress={
                          async () => {
                            // console.log('should');
                            const doc = await DocumentPicker.getDocumentAsync();
                            const name = doc.type === 'success' ? doc.name : '';
                            const s3file = await Upload(doc, `biens/${route.params.id}/documents/`);
                            if (s3file !== false && route.params.id) {
                              const doc = await createDocument.createDocument({
                                variables: {
                                  input: {
                                    s3file: s3file.key,
                                    realEstateId: route.params.id,
                                    name,
                                  },
                                },
                              });
                            }
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
                  <Text category="h5" status={supprim ? 'danger' : 'basic'} style={styles.buttonText}>Supprimer</Text>
                </TouchableOpacity>
                )}
              </View>
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
          <UserSharedCard idUser={idAdmin} admin key={idAdmin} />
        ))}
        {bienget?.shared?.map((idShare) => (
          <UserSharedCard idUser={idShare} admin={false} key={idShare} />
        ))}
        {bienget?.pendingInvitations?.items?.map((pending) => (
          pending?.type === 'Admin' ? (<UserSharedCard email={pending.email} admin />) : (
            <UserSharedCard email={pending?.email} admin={false} key={pending?.id} />
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
            // console.log(useGetInvitateUser.userList);
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
