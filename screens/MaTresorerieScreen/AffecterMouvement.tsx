import React, { useEffect, useState } from 'react';
import {
  Text,
} from '@ui-kitten/components';
import {
  TouchableOpacity,
  View,
} from 'react-native';

import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import moment from 'moment';
import { useGetRealEstate } from '../../src/API/RealEstate';

import CompteHeader from '../../components/CompteHeader/CompteHeader';
import MaxWidthContainer from '../../components/MaxWidthContainer';

import { TabMaTresorerieParamList } from '../../types';
import { useGetBankMovementByBankAccountId } from '../../src/API/BankMouvement';
import { useGetBankAccount } from '../../src/API/BankAccount';
import { BankMovement } from '../../src/API';
import Card from '../../components/Card';
import Amount from '../../components/Amount';
import MouvementAffecter from './Components/MouvementAffecter';
import ActionSheet from '../../components/ActionSheet/ActionSheet';

const AffecterMouvement = () => {
  // const { compte } = props;
  // const theme = useTheme();
  // const [client] = useState(comptesData);
  const route = useRoute<RouteProp<TabMaTresorerieParamList, 'affecter-mouvement'>>();
  const { bienget } = useGetRealEstate(route.params.id);
  const { bankMouvement } = useGetBankMovementByBankAccountId(route.params.idCompte);
  const { bankAccount } = useGetBankAccount(route.params.idCompte);
  const [movementAffecte, setMovementAffecte] = useState<BankMovement[]>();

  console.log('affecté', bankMouvement);

  useEffect(() => {
    const currentMovementAffecte = bankMouvement.filter((item) => {
      if ((item.budgetLineDeadline?.items && item.budgetLineDeadline?.items?.length > 0)) {
        return item;
      }
      return false;
    });

    setMovementAffecte(currentMovementAffecte);
  }, [bankMouvement]);
  console.log(movementAffecte);

  const [currentMvt, setCurrentMvt] = useState<BankMovement>();

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

        <CompteHeader title={bienget?.name} />

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
          Mouvements bancaires
        </Text>
        <Text category="p2" appearance="hint">
          Vous pouvez modifier une affectation en sélectionnant le mouvement bancaire.
        </Text>

        <View
          style={{ marginBottom: 40 }}
        >
          {movementAffecte && movementAffecte.map((item) => (
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
                    <Amount amount={item.amount} category="h5" />
                  </Text>
                  <Text
                    style={{ justifyContent: 'center', maxWidth: 135 }}
                    category="h6"
                    appearance="basic"
                    numberOfLines={1}
                  >
                    {`${item.budgetLineDeadline?.items?.map((deadLine) => (
                      deadLine?.category
                    ))}`}

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
          ))}
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

export default AffecterMouvement;

// const styles = StyleSheet.create({ windowOut: {} });
