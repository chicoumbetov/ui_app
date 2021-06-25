import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { CheckBox, Text, useTheme } from '@ui-kitten/components';

import { useLinkTo, useRoute } from '@react-navigation/native';
import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';

import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import Card from '../../../components/Card';
import { BankAccount } from '../../../src/API';
import { TabMaTresorerieParamList } from '../../../types';
import { useGetBankMovementsByBankAccountId } from '../../../src/API/BankMouvement';

type MonBienProps = { compte: BankAccount,
  supprimer?: boolean,
  add?: boolean,
  onCheck?: (checked: boolean) => void,
  checked?: boolean };

const OwnerCompte = (props: MonBienProps) => {
  const {
    compte, supprimer = false, add = false, checked = false, onCheck,
  } = props;
  // console.log(compte);
  const route = useRoute<RouteProp<TabMaTresorerieParamList, 'ma-tresorerie-2'>>();
  const linkTo = useLinkTo();

  const { bankMouvement } = useGetBankMovementsByBankAccountId(compte.id);

  const movementPasAffect = bankMouvement?.filter((item) => {
    if (item.ignored
        || (item.budgetLineDeadlines?.items && item.budgetLineDeadlines?.items?.length > 0)) {
      return false;
    }
    return item;
  });
  // console.log('Ownner Compte : ', movementPasAffect.length);

  // const linkTo = useLinkTo();
  const theme = useTheme();
  const onTresoMouvement = (id: string) => {
    linkTo(`/ma-tresorerie/${route.params.id}/mes-comptes/${id}/mouvements-bancaires/`);
  };

  return (
    <Card
        // key={item.id}
      style={{ marginTop: 28 }}
    >
      <TouchableOpacity
        onPress={supprimer ? () => {} : () => onTresoMouvement(compte.id)}
        style={styles.container}
      >

        {supprimer && (
          <View style={{ justifyContent: 'center', paddingHorizontal: 14, width: 50 }}>
            <CheckBox
              checked={checked}
              status="danger"
              onChange={(nextChecked) => {
                if (onCheck) {
                  onCheck(nextChecked);
                }
              }}
            />
          </View>
        )}
        {add && !supprimer && (
          <View style={{ justifyContent: 'center', paddingHorizontal: 14, width: 50 }}>
            <CheckBox
              checked={checked}
              status="success"
              onChange={(nextChecked) => {
                if (onCheck) {
                  onCheck(nextChecked);
                }
              }}
            />
          </View>
        )}

        <View style={{ justifyContent: 'center', paddingHorizontal: 14, flex: 1 }}>
          <Text category="h6">
            {compte.name || ''}
          </Text>
          <Text category="p2" appearance="hint">
            {compte.iban || ''}
          </Text>
          <Text category="p2" status="basic">
            {compte.bank || ''}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{
            backgroundColor: theme['color-warning-500'],
            marginRight: 5,
            height: 30,
            width: 30,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5,
            borderRadius: 30,
          }}
          >
            <Text status="control">{movementPasAffect.length}</Text>
          </View>

          <IconUIKitten
            name="arrow-ios-forward"
            fill="#000"
            style={{ height: 20, width: 20 }}
          />

        </View>

      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  window: {
    flexDirection: 'row',
    margin: 24,
    marginTop: 39,
    paddingTop: 31,
    paddingBottom: 28,
    paddingHorizontal: 37,
    borderRadius: 10,
    borderColor: 'transparent',
    shadowColor: '#dedede',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 0.5,
    shadowOpacity: 1,
  },
});

export default OwnerCompte;
