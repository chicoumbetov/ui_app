/**
 * Trésorerie et les comptes bancaires
 *
 * @author: Shynggys UMBETOV
 */

import React, { useEffect, useState } from 'react';
import {
  Button, CheckBox, Layout, Text, useTheme,
} from '@ui-kitten/components';
import {
  SectionList, TouchableOpacity, View,
} from 'react-native';

import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
import { useLinkTo, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import moment from 'moment';
import CompteHeader from '../../components/CompteHeader/CompteHeader';
import MaxWidthContainer from '../../components/MaxWidthContainer';

import ActionSheet from '../../components/ActionSheet/ActionSheet';
import EditMouvement from './Components/EditMouvement';
import Card from '../../components/Card';
import { TabMaTresorerieParamList } from '../../types';
import { useGetRealEstate } from '../../src/API/RealEstate';
import {
  BankAccount,
  BankMovement,
  BankMovementStatus,
  BudgetLineDeadline,
} from '../../src/API';
import Separator from '../../components/Separator';
import Amount from '../../components/Amount';
import {
  useGetBankMovementsByBankAccountId,
  useUpdateBankMovement,
} from '../../src/API/BankMouvement';
import { useGetBankAccount } from '../../src/API/BankAccount';

const MouvBancaires = () => {
  const theme = useTheme();
  const linkTo = useLinkTo();
  const route = useRoute<RouteProp<TabMaTresorerieParamList, 'mouv-bancaires'>>();
  const { bienget } = useGetRealEstate(route.params.id);
  const {
    bankMouvement: movementPasAffect, fetchMoreBankMovements, nextToken,
  } = useGetBankMovementsByBankAccountId(route.params.idCompte, BankMovementStatus.Unkown, 'cache-and-network');
  const { bankAccount } = useGetBankAccount(route.params.idCompte);
  const useUpdateBankMouvement = useUpdateBankMovement();

  const [bankAccountCharger, setBankAccountCharger] = useState<BankAccount>();

  useEffect(() => {
    setBankAccountCharger(bankAccount);
  }, [bankAccount]);

  // console.log('movementPasAffect :', movementPasAffect);

  // const [compte] = useState(comptesData);
  const [currentMvt, setCurrentMvt] = useState<BankMovement>();

  // console.log('mmmm :', bien?.budgetLineDeadlines?.items?.map((item) => item?.amount));

  const [checked, setChecked] = React.useState<Array<BankMovement>>([]);

  const [ignoreClicked, setIgnoreClicked] = useState(false);

  const isChecked = (id:string): boolean => checked.find((item) => item.id === id) !== undefined;

  const checkFunction = (nextChecked: boolean, bankMovement: BankMovement) => {
    const newCheckedState = checked.filter((current) => current.id !== bankMovement.id);
    if (nextChecked) {
      newCheckedState.push(bankMovement);
    }

    setChecked(newCheckedState);
    // console.log('check ', checked.includes({ id, _version }));
  };
  const onIgnorerMouvement = (id?: string) => {
    linkTo(`/ma-tresorerie/${route.params.id}/mes-comptes/${id}/mouvements-bancaires/ignores/`);
  };

  const onAffecterMouvement = (id?: string) => {
    linkTo(`/ma-tresorerie/${route.params.id}/mes-comptes/${id}/mouvements-bancaires/affectes/`);
  };

  const onEditMouvement = (items: BankMovement) => {
    setCurrentMvt(items);
  };

  let budget: (BudgetLineDeadline | null)[] | undefined = [];
  if (currentMvt !== undefined && currentMvt.amount) {
    budget = bienget?.budgetLineDeadlines?.items?.filter((item) => {
      // eslint-disable-next-line no-underscore-dangle
      if (item && !item?._deleted && !item.bankMouvementId) {
        return item;
      }
      return false;
    });
    if (budget) {
      budget.sort((a, b) => {
        const absA = Math.abs((a?.amount || 0) - currentMvt.amount);
        const absB = Math.abs((b?.amount || 0) - currentMvt.amount);
        if (absA < absB) {
          return -1;
        }
        if (absA > absB) {
          return 1;
        }
        return 0;
      });
    }
  }

  const ignorerMovement = () => {
    checked.reduce(async (promise, current) => {
      // console.log('current :', current);
      await promise;
      await useUpdateBankMouvement.updateBankMovement({
        variables: {
          input: {
            id: current.id,
            status: BankMovementStatus.Ignored,
            date: current.date,
            // eslint-disable-next-line no-underscore-dangle
            _version: current._version,
          },
        },
      });
    }, Promise.resolve());
    setChecked([]);
  };

  return (
    <>
      <MaxWidthContainer
        withScrollView={false}
        outerViewProps={{
          style: {
            padding: 25,
          },
        }}
        innerViewProps={{
          style: { height: '100%' },
        }}
      >
        <SectionList
          sections={[{ title: 'mouvements', data: movementPasAffect }]}
          stickyHeaderIndices={[0]}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled
          renderItem={({ item }) => item && (
          <Card
            key={item.id}
            style={{
              marginVertical: 20,
              flexDirection: 'row',
              alignItems: 'center',
              // eslint-disable-next-line no-underscore-dangle
              borderWidth: 1,
              borderColor: isChecked(item.id) ? 'red' : 'transparent',
            }}
          >
            {ignoreClicked
              ? (
                <CheckBox
                  checked={isChecked(item.id)}
                  onChange={
                              // eslint-disable-next-line no-underscore-dangle
                              (nextChecked) => checkFunction(nextChecked, item)
                            }
                  status="danger"
                />
              )
              : <></>}

            <TouchableOpacity
              onPress={() => {
                if (ignoreClicked) {
                  checkFunction(!isChecked(item.id), item);
                } else {
                  onEditMouvement(item);
                }
              }}
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                  marginLeft: 20,
                }}
              >
                <Amount amount={item.amount} category="h5" />
                <Text
                  style={{ justifyContent: 'center' }}
                  category="h6"
                  status="warning"
                >
                  En attente
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  paddingLeft: 10,
                }}
              >
                <Text category="h6" status="basic">{`${moment(item.date).format('DD/MM/YYYY')}`}</Text>
                <Text category="p1" appearance="hint">{item?.description || ''}</Text>
              </View>

            </TouchableOpacity>
          </Card>
          )}
          renderSectionHeader={() => (
            <Layout>
              {ignoreClicked ? (
                <View style={{ flexDirection: 'column' }}>
                  <Button
                    size="large"
                    style={{ flex: 1 }}
                    onPress={() => {
                      ignorerMovement();
                      setIgnoreClicked(!ignoreClicked);
                    }}
                    appearance="filled"
                    status="danger"
                  >
                    Ignorer des mouvements
                  </Button>
                  <Button
                    onPress={() => {
                      setIgnoreClicked(!ignoreClicked);
                      setChecked([]);
                    }}
                    appearance="ghost"
                    status="danger"
                  >
                    Annuler
                  </Button>
                </View>
              ) : (
                <Button
                  size="large"
                  onPress={() => {
                    setIgnoreClicked(!ignoreClicked);
                  }}
                  appearance={ignoreClicked ? 'filled' : 'outline'}
                  status="danger"
                >
                  Ignorer des mouvements
                </Button>
              )}

            </Layout>
          )}
          ListHeaderComponent={(
            <>
              <CompteHeader title={bienget?.name} iconUri={bienget?.iconUri} />

              <View style={{
                marginTop: 20,
                alignItems: 'center',
                paddingBottom: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#b5b5b5',
              }}
              >
                <Text category="h6" status="basic">{bankAccountCharger?.name || ''}</Text>
                <Text category="h6" appearance="hint">{bankAccountCharger?.iban || ''}</Text>
                <Text category="h6" status="basic">{bankAccountCharger?.bank || ''}</Text>
              </View>

              <Text
                category="s2"
                style={{
                  marginBottom: 20, paddingTop: 30,
                }}
              >
                Mouvements bancaires
              </Text>
              <Text
                category="p2"
                appearance="hint"
                style={{ marginBottom: 20 }}
              >
                Vous pouvez affecter ou ignorer les mouvements bancaires liés à ce compte bancaire.
              </Text>
            </>
          )}
          ListFooterComponent={(
            <>
              {nextToken && (
              <Button appearance="ghost" onPress={() => fetchMoreBankMovements()}>
                Charger plus de mouvements
              </Button>
              )}
              {ignoreClicked
                ? (
                  <></>
                )
                : (
                  <>
                    <Separator />
                    <Card
                      onPress={() => { onAffecterMouvement(bankAccountCharger?.id); }}
                      style={{
                        marginVertical: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: theme['color-basic-100'],
                      }}
                    >
                      <Text category="h6" status="basic">Mouvements affectés</Text>
                      <IconUIKitten
                        name="arrow-ios-forward"
                        fill="#000"
                        style={{
                          height: 20, width: 20, alignItems: 'center',
                        }}
                      />
                    </Card>
                    <Card
                      style={{ marginVertical: 20, marginBottom: 60 }}
                    >
                      <TouchableOpacity
                        onPress={() => onIgnorerMouvement(bankAccountCharger?.id)}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: theme['color-basic-100'],
                        }}
                      >
                        <Text category="h6" status="basic">Mouvements ignorés</Text>
                        <IconUIKitten
                          name="arrow-ios-forward"
                          fill="#000"
                          style={{
                            height: 20, width: 20, alignItems: 'center',
                          }}
                        />
                      </TouchableOpacity>
                    </Card>
                  </>
                )}
            </>
)}
          ListEmptyComponent={(
            <View style={{ alignItems: 'center', marginVertical: 20 }}>
              <Text category="h4" style={{ marginBottom: 10 }}>Bon Travail!</Text>
              <Text category="p1">Vous avez affecté tous vos mouvements bancaires.</Text>
            </View>
        )}
        />
      </MaxWidthContainer>

      <ActionSheet
        title="test"
        before={<></>}
        noSafeArea
        scrollable={false}
        heightPercentage={0.92}
        visible={currentMvt !== undefined}
        onClose={() => setCurrentMvt(undefined)}
      >
        {currentMvt !== undefined && (
        <EditMouvement
          budget={budget}
          linkTo={linkTo}
          movement={currentMvt}
          onSaved={() => { setCurrentMvt(undefined); }}
          realEstateId={route.params.id}
        />
        )}
      </ActionSheet>
    </>
  );
};

// const styles = StyleSheet.create({ container: {} });

export default MouvBancaires;
