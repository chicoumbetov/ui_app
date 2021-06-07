/**
 * Trésorerie et les comptes bancaires
 *
 * @author: Shynggys UMBETOV
 */

import React, { useState } from 'react';
import { Button, Text } from '@ui-kitten/components';
import {
  TouchableOpacity, View,
} from 'react-native';

import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
// import comptesData from '../../mockData/comptesData';
import API from '@aws-amplify/api';
import MaxWidthContainer from '../../components/MaxWidthContainer';

import { useGetRealEstate, useRealEstateList } from '../../src/API/RealEstate';
import CompteHeader from '../../components/CompteHeader/CompteHeader';
import OwnerCompte from './Components/OwnerCompte';
import ActivityIndicator from '../../components/ActivityIndicator';
import { TabMaTresorerieParamList } from '../../types';

import comptesData from '../../mockData/comptesData';
import ActionSheet from '../../components/ActionSheet/ActionSheet';
import EditMouvement from './Components/EditMouvement';
import WebView from '../../components/WebView';

const MaTresorerie2 = () => {
  const { loading, data } = useRealEstateList();
  const [compte] = useState(comptesData);

  const [toggle, setToggle] = useState(false);
  const [newAccountLink, setNewAccountLink] = useState<string | undefined>('https://omedom1-sandbox.biapi.pro/2.0/auth/webview/?client_id=45913022&code=ZeIjiP6qFz%2FAO6L22%2FC_Dt6dtZ9U_4CVOnsq6u7Kxoy9hf5t4H3zviRz7Px8_3B6k12jQX0JeRR5%2F2ewbw7jsBlELU90oHPyo5s48WxXHf4PJjADhG9xIMTn4sDC1JxC&redirect_url=https%3A%2F%2F0patt7mbe7.execute-api.eu-west-2.amazonaws.com%2Fdev%2Fwebhooks%2Fitem%2Ftea&state=93408e3c-a431-4a52-b909-0e6c9ab8bc8f');
  const [supprim, setSupprim] = useState(false);

  const route = useRoute<RouteProp<TabMaTresorerieParamList, 'ma-tresorerie-2'>>();
  // console.log('mon-budget data', route.params);
  const { bien } = useGetRealEstate(route.params.id);

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
          ? <Text category="p2" appearance="hint">Ajoutez un compte pour consulter votre trésorerie</Text>
          : <Text category="p2" appearance="hint">Sélectionner le compte pour consulter votre trésorerie</Text>}
        {loading
          ? <ActivityIndicator />
          : (
            <>
              {data?.listRealEstates?.items?.map(
                (item) => item && (
                <OwnerCompte
                  key={item.id}
                  compte={item}
                  supprimer={supprim}
                />
                ),
              )}
            </>
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
                const response = await API.get('omedomrest', '/budgetinsight/connect-url', {});
                setNewAccountLink(response.redirectUrl);
              }}
              style={{
                paddingVertical: 20, marginBottom: 30, borderTopWidth: 1, borderTopColor: '#b5b5b5',
              }}
            >
              {toggle
                ? 'Lier un compte bancaire'
                : 'Lier un autre compte bancaire'}
            </Button>
          )}

      </MaxWidthContainer>
      <ActionSheet title="test" before={<></>} noSafeArea scrollable={false} visible={newAccountLink !== undefined} onClose={() => setNewAccountLink(undefined)}>
        {newAccountLink && <WebView src={newAccountLink} />}
      </ActionSheet>
    </>
  );
};

export default MaTresorerie2;

// const styles = StyleSheet.create({ container: { } });
