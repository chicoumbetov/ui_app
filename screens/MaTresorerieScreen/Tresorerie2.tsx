/**
 * Trésorerie et les comptes bancaires
 *
 * @author: Shynggys UMBETOV
 */

import React, { useState } from 'react';
import { Button, Text } from '@ui-kitten/components';
import {
  Alert,
  TouchableOpacity, View,
} from 'react-native';

import { useLinkTo, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import API from '@aws-amplify/api';
import MaxWidthContainer from '../../components/MaxWidthContainer';

import { useGetRealEstate } from '../../src/API/RealEstate';
import CompteHeader from '../../components/CompteHeader/CompteHeader';
import OwnerCompte from './Components/OwnerCompte';
import ActivityIndicator from '../../components/ActivityIndicator';
import { TabMaTresorerieParamList } from '../../types';

// import comptesData from '../../mockData/comptesData';
import ActionSheet from '../../components/ActionSheet/ActionSheet';

import WebView from '../../components/WebView';
import { useBankAccountList, useDeleteBankAccount } from '../../src/API/BankAccount';
import {
  useCreateRealEstateBankAccount,
  useDeleteRealEstateBankAccount,
} from '../../src/API/RealEstateBankAccount';

const MaTresorerie2 = () => {
  // const [compte] = useState(comptesData);
  const linkTo = useLinkTo();
  const [newAccountLink, setNewAccountLink] = useState<string | undefined>();
  const [supprim, setSupprim] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [addingAccounts, setAddingAccounts] = useState(false);
  const [checkedAccounts, setCheckedAccounts] = React.useState<Array<
  { id: string, _version: number }
  >>([]);
  // eslint-disable-next-line max-len
  const [checkedRealEstateAccounts, setCheckedRealEstateAccounts] = React.useState<Array<{ id:string, _version:number }>>([]);

  const route = useRoute<RouteProp<TabMaTresorerieParamList, 'ma-tresorerie-2'>>();
  const deleteBankAccount = useDeleteBankAccount();
  // console.log('mon-budget data', route.params);

  const createRealEstateBankAccount = useCreateRealEstateBankAccount();
  const deleteRealEstateBankAccount = useDeleteRealEstateBankAccount();
  const { bienget, refetch: refetchBien, loading: loadingBien } = useGetRealEstate(route.params.id);
  const { data, refetch: refetchBankAccount } = useBankAccountList();

  // console.log('------------------------', bienget.bankAccounts?.items);
  console.log('checkedAccounts', checkedAccounts);

  const realEstateBankAccount = bienget.bankAccounts?.items?.filter((item) => {
    // eslint-disable-next-line no-underscore-dangle
    if (!item?._deleted) { return item; }
    return false;
  });

  const BankAccount = data?.listBankAccounts?.items?.filter((item) => {
    // eslint-disable-next-line no-underscore-dangle
    if (!item?._deleted) { return item; } return false;
  });

  let buttonText = '';
  if (toggle) {
    if (checkedAccounts.length <= 0) {
      buttonText = '+ Ajouter un autre compte bancaire';
    } else if (checkedAccounts.length === 1) {
      buttonText = 'Lier le compte bancaire';
    } else {
      buttonText = 'Lier les comptes bancaires';
    }
  } else if (BankAccount
      && BankAccount.length <= 0) {
    buttonText = 'Lier un compte bancaire';
  } else {
    buttonText = 'Lier un autre compte bancaire';
  }
  function supprimerCompte() {
    if (checkedRealEstateAccounts.length > 0) {
      console.log('test 2');
      checkedRealEstateAccounts.reduce(async (promise, current) => {
        // console.log('supprimerCompte id1:', current.id);
        await promise;
        await deleteRealEstateBankAccount({
          variables: {
            input: {
              id: current.id,
              // eslint-disable-next-line no-underscore-dangle
              _version: current._version,
            },
          },
        });
      }, Promise.resolve());
      refetchBien();
      setToggle(true);
    } else if (checkedAccounts.length > 0) {
      checkedAccounts.reduce(async (promise, current) => {
        await promise;
        await deleteBankAccount({
          variables: {
            input: {
              id: current.id,
              // eslint-disable-next-line no-underscore-dangle
              _version: current._version,
            },
          },
        });
      }, Promise.resolve());
      refetchBien();
      setToggle(true);
    }
  }

  return (
    <>
      <MaxWidthContainer
        withScrollView="keyboardAware"
        outerViewProps={{
          showsVerticalScrollIndicator: false,
          style: {
            paddingHorizontal: 26,
          },
        }}
      >

        <Text
          category="h1"
          status="basic"
          style={{ marginVertical: 20 }}
        >
          Ma Trésorerie
        </Text>
        <CompteHeader
          title={bienget?.name}
          iconUri={bienget?.iconUri}
        />
        <Text category="s2" status="basic" style={{ marginVertical: 20 }}>
          Comptes bancaires
        </Text>
        {toggle
          ? (<Text category="p2" appearance="hint">Ajoutez un compte pour consulter votre trésorerie</Text>)
          : (<Text category="p2" appearance="hint">Sélectionner le compte pour consulter votre trésorerie</Text>)}
        {loadingBien
          ? <View style={{ justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator /></View>
          : (!toggle ? (
            <>
              {realEstateBankAccount?.map(
                (item) => item && (
                <OwnerCompte
                  key={item.id}
                  compte={item.bankAccount}
                  supprimer={supprim}
                  onCheck={(checked) => {
                    const nextCheckedRealEstateAccounts = checkedRealEstateAccounts
                      .filter((id) => id.id !== item.id);
                    if (checked) {
                      nextCheckedRealEstateAccounts.push({ id: item.id, _version: item._version });
                    }
                    setCheckedRealEstateAccounts(nextCheckedRealEstateAccounts);
                  }}
                />
                ),
              )}
            </>
          ) : (
            <>
              {BankAccount?.map(
                (item) => item && (
                <OwnerCompte
                  key={item.id}
                  compte={item}
                  supprimer={supprim}
                  add
                  onCheck={(checked) => {
                    const nextCheckedAccounts = checkedAccounts.filter((id) => id.id !== item.id);
                    if (checked) {
                      // eslint-disable-next-line no-underscore-dangle
                      nextCheckedAccounts.push({ id: item.id, _version: item._version });
                    }
                    // console.log('nextCheckedAccounts', nextCheckedAccounts);
                    setCheckedAccounts(nextCheckedAccounts);
                  }}
                />
                ),
              )}
            </>
          )

          )}
        {supprim && (
        <TouchableOpacity
          onPress={() => setSupprim(!supprim)}
          style={{
            flexDirection: 'row', marginTop: 30, justifyContent: 'flex-end', backgroundColor: 'transparent',
          }}
        >
          <Text
            category="h5"
            status="basic"
          >
            Annuler
          </Text>
        </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => { supprimerCompte(); setSupprim(!supprim); }}
          style={{
            flexDirection: 'row', marginTop: 30, justifyContent: 'flex-end', backgroundColor: 'transparent',
          }}
        >
          <Text
            category="h5"
            status={supprim ? 'danger' : 'basic'}
          >
            Supprimer un compte
          </Text>
        </TouchableOpacity>

        <View style={{ marginVertical: 30, borderTopWidth: 1, borderColor: '#b5b5b5' }} />
        {supprim
          ? <></>
          : (
            <Button
              size="large"
              onPress={async () => {
                if (toggle) {
                  if (
                    checkedAccounts.length > 0
                      && BankAccount
                  ) {
                    BankAccount.map(async (item) => {
                      if (checkedAccounts.find(({ id }) => (id === item.id)) !== undefined) {
                        await createRealEstateBankAccount({
                          variables: {
                            input: {
                              realEstateId: route.params.id,
                              bankAccountId: item.id,
                            },
                          },
                        });
                      }
                    });
                    await setCheckedAccounts([]);
                    await setCheckedRealEstateAccounts([]);
                    setToggle(false);
                  } else {
                    setAddingAccounts(true);
                    const response = await API.get('omedomrest', '/budgetinsight/connect-url', {});
                    setAddingAccounts(false);
                    setNewAccountLink(response.connectUrl);
                  }
                } else {
                  setToggle(true);
                }
                console.log(toggle);
                await refetchBien();
              }}
              style={{
                paddingVertical: 20, marginBottom: 30, borderTopWidth: 1, borderTopColor: '#b5b5b5',
              }}
            >
              {buttonText}
            </Button>
          )}

      </MaxWidthContainer>
      <ActionSheet
        title="test"
        before={<></>}
        noSafeArea
        scrollable={false}
        visible={newAccountLink !== undefined || addingAccounts}
        onClose={() => {
          Alert.alert('Ajout de compte bancaire',
            'Vous êtes sur de vouloir quitter l\'ajout du compte bancaire ? Il ne sera pas ajouté.',
            [{
              text: 'Annuler',
              style: 'cancel',
            },
            {
              text: 'Valider',
              onPress: async () => {
                setNewAccountLink(undefined);
                setAddingAccounts(false);
                refetchBankAccount();
                refetchBien();
                setToggle(false);
              },
            }]);
        }}
      >
        {newAccountLink && (
        <WebView
          src={newAccountLink}
          onMessage={async (e) => {
            if (e !== undefined && typeof e === 'string') {
              setAddingAccounts(true);
              setNewAccountLink(undefined);
              const obj = JSON.parse(e);
              if (!obj.error) {
                const result = await API.get('omedomrest', `/budgetinsight/create-accounts?CONNECTION_ID=${obj.id_connection}&REAL_ESTATE_ID=${route.params.id}`, {});

                await refetchBankAccount();
                await refetchBien();

                if (result.success && result.lastId !== '') {
                  Alert.alert(
                    '\u2705 BRAVO !',
                    'Compte ajouté avec succès. Vous pouvez maintenant cliquer sur le compte pour affecter '
                      + 'les mouvements aux revenus et charges que vous avez paramétrés',
                    [
                      { text: 'Ignorer', style: 'cancel' },
                      {
                        text: 'Affecter les mouvements',
                        onPress: () => linkTo(`/ma-tresorerie/${route.params.id}/mes-comptes/${result.lastId}/mouvements-bancaires`),
                      },
                    ],
                    { cancelable: true },
                  );
                }
              }
              setAddingAccounts(false);
            }
          }}
        />
        )}
        {addingAccounts && (
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        >
          <ActivityIndicator />
        </View>
        )}
      </ActionSheet>
    </>
  );
};

export default MaTresorerie2;
