import React, { useState } from 'react';
import { Text } from '@ui-kitten/components';
import { TouchableOpacity, View } from 'react-native';

import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import moment from 'moment';
import { useGetRealEstate } from '../../src/API/RealEstate';

import CompteHeader from '../../components/CompteHeader/CompteHeader';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import Card from '../../components/Card';

import { TabMaTresorerieParamList } from '../../types';

import { useGetBankMovementsByBankAccountId } from '../../src/API/BankMouvement';
import { useGetBankAccount } from '../../src/API/BankAccount';

import ActionSheet from '../../components/ActionSheet/ActionSheet';
import { BankMovement, BankMovementStatus } from '../../src/API';
import MouvementAffecter from './Components/MouvementAffecter';

const IgnorerMouvement = () => {
  // const { compte } = props;
  // const theme = useTheme();
  // const [client] = useState(comptesData);
  const route = useRoute<RouteProp<TabMaTresorerieParamList, 'ignorer-mouvement'>>();
  const { bienget } = useGetRealEstate(route.params.id);
  const { bankMouvement: movementIgnore } = useGetBankMovementsByBankAccountId(route.params.idCompte, BankMovementStatus.Ignored);
  const { bankAccount } = useGetBankAccount(route.params.idCompte);
  const [currentMvt, setCurrentMvt] = useState<BankMovement>();
  console.log(movementIgnore);

  return (
    <>
      <MaxWidthContainer
        withScrollView="keyboardAware"
        outerViewProps={{
          showsVerticalScrollIndicator: false,
          style: {
            padding: 25,
          },
        }}
      >
        <CompteHeader title={bienget.name} iconUri={bienget.iconUri} />

        <View style={{
          marginVertical: 20, paddingBottom: 20, alignItems: 'center', borderBottomWidth: 2.5, borderBottomColor: '#f4f4f4',
        }}
        >
          <Text category="h6" status="basic">{bankAccount?.name || ''}</Text>
          <Text category="h6" appearance="hint">{bankAccount?.iban || ''}</Text>
          <Text category="h6" status="basic">{bankAccount?.bank || ''}</Text>
        </View>

        <Text
          category="s2"
          style={{
            marginBottom: 20, paddingTop: 30,
          }}
        >
          Mouvements ignorés
        </Text>
        <View
          style={{ marginBottom: 40 }}
        >
          {movementIgnore && movementIgnore.length > 0 ? (
            movementIgnore.map((item) => (
              <Card
                key={item.id}
                style={{
                  marginVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'f4f4f4',
                }}
              >

                <TouchableOpacity
                  onPress={() => { setCurrentMvt(item); }}
                  style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-start',
                      marginLeft: 20,
                    }}
                  >
                    <Text
                      style={{ justifyContent: 'center' }}
                      category="h5"
                      status="basic"
                    >
                      {item.amount}
                    </Text>
                    <Text
                      style={{ justifyContent: 'center' }}
                      category="h6"
                      appearance="hint"
                    >
                      Ignoré
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
                    <Text category="p1" appearance="hint">{item.description || ''}</Text>
                  </View>

                </TouchableOpacity>
              </Card>
            ))
          ) : (

            <Text category="p1" appearance="hint">
              Aucun mouvement ignoré.
            </Text>
          )}

        </View>
      </MaxWidthContainer>
      <ActionSheet
        title="test"
        before={<></>}
        noSafeArea
        scrollable={false}
        visible={currentMvt !== undefined}
        onClose={() => setCurrentMvt(undefined)}
      >
        {currentMvt !== undefined && (
          <MouvementAffecter
            movement={currentMvt}
            onSaved={() => setCurrentMvt(undefined)}
          />
        )}
      </ActionSheet>
    </>
  );
};

export default IgnorerMouvement;

// const styles = StyleSheet.create({ windowOut: {} });
