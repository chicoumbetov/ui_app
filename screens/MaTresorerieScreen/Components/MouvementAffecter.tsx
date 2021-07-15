import {
  Button, Text,
} from '@ui-kitten/components';
import {
  Alert, StyleSheet, View,
} from 'react-native';
import React from 'react';
import moment from 'moment';

import {
  BankMovement,
  BankMovementStatus,
} from '../../../src/API';
// import { useDeleteBudgetLineMutation } from '../../../src/API/BudgetLine';
import {
  useUpdateBudgetLineDeadlineMutation,
} from '../../../src/API/BudgetLineDeadLine';

import Amount from '../../../components/Amount';
import { useUpdateBankMovement } from '../../../src/API/BankMouvement';
import Separator from '../../../components/Separator';
import BudgetLineDeadLineCard from './BudgetLineDeadLineCard';

type MonBudgetProps = { movement: BankMovement, onSaved?: () => void };

const MouvementAffecter = (props: MonBudgetProps) => {
  const { movement, onSaved } = props;

  const updateBudgetLineDeadLine = useUpdateBudgetLineDeadlineMutation();

  const updateBankMouvement = useUpdateBankMovement();

  const frequence = (freq: string) => {
    switch (freq) {
      default:
        return 'Frequence';
        break;
      case 'monthly':
        return 'Mensuelle';
        break;
      case 'fortnightly':
        return 'Bimensuel';
        break;
      case 'quarterly':
        return 'Trimestrielle';
        break;
      case 'annual':
        return 'Annuelle';
        break;
    }
  };

  const annulerAffectation = async (ignored: boolean) => {
    Alert.alert(
      'Annuler l\'affectation',
      '',
      [{
        text: 'Annuler',
        style: 'cancel',
      },
      {
        text: 'Valider',
        onPress: async () => {
          if (ignored) {
            await updateBankMouvement.updateBankMovement({
              variables: {
                input: {
                  id: movement.id,
                  status: BankMovementStatus.Unkown,
                  date: movement.date,
                  // eslint-disable-next-line no-underscore-dangle
                  _version: movement._version,
                },
              },
            });
          } else {
            movement.budgetLineDeadlines?.items?.reduce(async (promise, current) => {
              await promise;
              await updateBudgetLineDeadLine.updateBudgetLineDeadline({
                variables: {
                  input: {
                    id: current.id,
                    bankMouvementId: null,
                    _version: current._version,
                  },
                },
              });
            }, Promise.resolve());
          }
          if (onSaved) {
            onSaved();
          }
        },
      }],
    );
  };

  return (
    <View style={styles.container}>

      <View style={{
        marginVertical: 20, alignItems: 'center', paddingBottom: 20, borderBottomWidth: 2, borderBottomColor: '#d3d3d3',
      }}
      >
        <Amount amount={movement.amount || 0} category="h1" />
        <Text category="h5" status="basic" style={{ marginVertical: 10 }}>{moment(movement.date).format('DD/MM/YYYY')}</Text>
        <Text category="p2" appearance="hint">{movement.description || ''}</Text>
      </View>

      {movement.status === BankMovementStatus.Ignored ? (
        <>
          <View style={{
            alignItems: 'center',
          }}
          >
            <Text category="h3" status="basic" style={{ marginVertical: 10 }}>Affectation</Text>
            <Text category="h6" status="basic" style={{ marginVertical: 10 }}>Mouvement ignoré</Text>
          </View>
          <Separator />
          <Button
            style={{ marginTop: 20 }}
            status="danger"
            appearance="outline"
            onPress={() => annulerAffectation(true)}
          >
            Annuler l'affectation
          </Button>
        </>

      ) : (
        <View>
          <Text category="h1" status="basic" style={{ marginVertical: 20 }}>Affectation</Text>
          {movement.budgetLineDeadlines?.items?.map((deadLine) => (
            deadLine && (<BudgetLineDeadLineCard item={deadLine} editable={false} />)
          ))}
          <Separator />
          <Button
            style={{ marginTop: 20 }}
            status="danger"
            appearance="outline"
            onPress={() => annulerAffectation(false)}
          >
            Annuler l'affectation
          </Button>
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    paddingVertical: 25,
    paddingHorizontal: 26,
    flex: 1,
    flexGrow: 1,
  },
  window: {
    flexDirection: 'column',
    marginTop: 30,
    // paddingTop: 31,
    // paddingBottom: 28,
    // paddingHorizontal: 37,
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

export default MouvementAffecter;
