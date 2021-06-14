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

import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import API from '@aws-amplify/api';
import MaxWidthContainer from '../../components/MaxWidthContainer';

import { useGetRealEstate, useRealEstateList } from '../../src/API/RealEstate';
import CompteHeader from '../../components/CompteHeader/CompteHeader';
import OwnerCompte from './Components/OwnerCompte';
import ActivityIndicator from '../../components/ActivityIndicator';
import { TabMaTresorerieParamList } from '../../types';

// import comptesData from '../../mockData/comptesData';
import ActionSheet from '../../components/ActionSheet/ActionSheet';
import EditMouvement from './Components/EditMouvement';
import WebView from '../../components/WebView';
import { useBankAccountList } from '../../src/API/BankAccount';

const MaTresorerie2 = () => {
  const { loading } = useRealEstateList();
  // const [compte] = useState(comptesData);

  const [toggle, setToggle] = useState(false);
  const [newAccountLink, setNewAccountLink] = useState<string | undefined>();
  const [supprim, setSupprim] = useState(false);
  const [addingAccounts, setAddingAccounts] = useState(false);
  const [checkedAccounts, setCheckedAccounts] = useState<string[]>([]);

  const route = useRoute<RouteProp<TabMaTresorerieParamList, 'ma-tresorerie-2'>>();
  // console.log('mon-budget data', route.params);
  const { bien, refetch: refetchBien, loading: loadingBien } = useGetRealEstate(route.params.id);
  const { data } = useBankAccountList();
  console.log('oui', bien.bankAccounts?.items?.length);
  if (bien.bankAccounts?.items?.length === 0 && !toggle) {
    setToggle(true);
  }

  let buttonText = '';
  if (toggle) {
    if (checkedAccounts.length <= 0) {
      buttonText = '+ Ajouter un autre compte bancaire';
    } else if (checkedAccounts.length === 1) {
      buttonText = 'Lier le compte bancaire';
    } else {
      buttonText = 'Lier les comptes bancaires';
    }
  } else if (data?.listBankAccounts?.items && data?.listBankAccounts?.items?.length <= 0) {
    buttonText = 'Lier un compte bancaire';
  } else {
    buttonText = 'Lier un autre compte bancaire';
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
          title={
            bien?.name
          }
        />
        <Text category="s2" status="basic" style={{ marginVertical: 20 }}>
          Comptes bancaires
        </Text>
        {toggle
          ? (<Text category="p2" appearance="hint">Ajoutez un compte pour consulter votre trésorerie</Text>)
          : (<Text category="p2" appearance="hint">Sélectionner le compte pour consulter votre trésorerie</Text>)}
        {loading
          ? <ActivityIndicator />
          : (!toggle ? (
            <>
              {bien.bankAccounts?.items?.map(
                (item) => item && (
                <OwnerCompte
                  key={item.id}
                  compte={item}
                  supprimer={supprim}
                />
                ),
              )}
            </>
          ) : (
            <>
              {data?.listBankAccounts?.items?.map(
                (item) => item && (
                <OwnerCompte
                  key={item.id}
                  compte={item}
                  supprimer={supprim}
                  add
                  checked={checkedAccounts.indexOf(item.id) > -1}
                  onCheck={(checked) => {
                    const nextCheckedAccounts = checkedAccounts.filter((id) => id !== item.id);
                    if (checked) {
                      nextCheckedAccounts.push(item.id);
                    }
                    setCheckedAccounts(nextCheckedAccounts);
                  }}
                />
                ),
              )}
            </>
          )

          )}

        <TouchableOpacity
          onPress={() => setSupprim(!supprim)}
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
                  if (checkedAccounts.length > 0) {
                    console.log(checkedAccounts);
                  } else {
                    setAddingAccounts(true);
                    const response = await API.get('omedomrest', '/budgetinsight/connect-url', {});
                    setAddingAccounts(false);
                    setNewAccountLink(response.connectUrl);
                  }
                } else {
                  setToggle(true);
                  await refetchBien();
                }
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
                await API.get('omedomrest', `/budgetinsight/create-accounts?CONNECTION_ID=${obj.id_connection}&REAL_ESTATE_ID=${route.params.id}`, {});
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

// const styles = StyleSheet.create({ container: { } });
