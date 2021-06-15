import React, { useState } from 'react';
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

const AffecterMouvement = () => {
  // const { compte } = props;
  // const theme = useTheme();
  // const [client] = useState(comptesData);
  const route = useRoute<RouteProp<TabMaTresorerieParamList, 'affecter-mouvement'>>();
  const { bien } = useGetRealEstate(route.params.id);
  const { bankMouvement } = useGetBankMovementByBankAccountId(route.params.idCompte);
  const { bankAccount } = useGetBankAccount(route.params.idCompte);

  console.log('affecté', bankMouvement);

  const movementAffecte = bankMouvement.filter((item) => {
    if (item.budgetLineDeadlineId) {
      return item;
    }
    return false;
  });

  const [currentMvt, setCurrentMvt] = useState<BankMovement>();

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
        style: {
          padding: 25,
        },
      }}
    >

      <CompteHeader title={bien?.name} />

      <View style={{
        marginTop: 20,
        alignItems: 'center',
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#b5b5b5',
      }}
      >
        <Text category="h6" status="basic">Monsieur Dupont Matthieu</Text>
        <Text category="h6" appearance="hint">FR76**************583</Text>
        <Text category="h6" status="basic">Société Générale</Text>
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
        {movementAffecte.map((item) => (
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
                <Text category="p1" appearance="hint">{item.description}</Text>
              </View>

            </TouchableOpacity>
          </Card>
        ))}
      </View>

    </MaxWidthContainer>
  );
};

export default AffecterMouvement;

// const styles = StyleSheet.create({ windowOut: {} });
