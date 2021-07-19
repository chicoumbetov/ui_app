import {
  Card, Text, useTheme,
} from '@ui-kitten/components';
import {
  Keyboard,
  ScrollView, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Icon from '../../../components/Icon';
import {
  BankMovement,
  BankMovementStatus,
  BudgetLineDeadline,
} from '../../../src/API';

import {
  useUpdateBudgetLineDeadlineMutation,
} from '../../../src/API/BudgetLineDeadLine';
import Amount from '../../../components/Amount';
import { useUpdateBankMovement } from '../../../src/API/BankMouvement';
import BudgetLineDeadLineCard from './BudgetLineDeadLineCard';
import Formatter from '../../../utils/Formatter';
import Button from '../../../components/Button';

type MonBudgetProps = {
  linkTo: (path:string) => void,
  budget?: (BudgetLineDeadline | null)[],
  movement: BankMovement,
  onSaved?: () => void,
  realEstateId: string
};

const EditMouvement = (props: MonBudgetProps) => {
  const {
    budget, movement, onSaved, realEstateId, linkTo,
  } = props;
  console.log('budget :', budget);
  // console.log('amount : ', amount);
  const theme = useTheme();

  const updateBudgetLineDeadLine = useUpdateBudgetLineDeadlineMutation();

  const [checked, setChecked] = React.useState<Array<{ id:string, _version:number }>>([]);

  const [amountMouvement, setAmountMouvement] = useState(movement.amount || 0);

  const useUpdateBankMouvement = useUpdateBankMovement();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const dsSub = Keyboard.addListener('keyboardWillShow', () => {
      setKeyboardVisible(true);
    });
    const dhSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });
    return () => {
      dsSub.remove();
      dhSub.remove();
    };
  }, []);

  const checkFunction = (nextChecked: boolean, id:string, thisAmount: number, _version:number) => {
    const newCheckedState = checked.filter((current) => current.id !== id);
    if (nextChecked) {
      newCheckedState.push({ id, _version });
      setAmountMouvement(amountMouvement - thisAmount);
    } else {
      setAmountMouvement(amountMouvement + thisAmount);
    }

    setChecked(newCheckedState);
    console.log(checked);
  };

  useEffect(() => {
    if (checked.length <= 0 && budget) {
      const possibleBudget = budget.find((item) => item && item.amount === movement.amount);
      if (possibleBudget) {
        // eslint-disable-next-line no-underscore-dangle
        checkFunction(true, possibleBudget.id, possibleBudget.amount, possibleBudget._version);
      }
    }
  }, [budget, movement.amount]);

  const allerMonBudget = () => {
    console.log(realEstateId);
    if (onSaved) {
      onSaved();
    }
    linkTo(`/mes-biens/${realEstateId}/budget`);
  };

  const affecteMovement = async () => {
    checked.reduce(async (promise, current) => {
      await promise;
      await updateBudgetLineDeadLine.updateBudgetLineDeadline({
        variables: {
          input: {
            id: current.id,
            bankMouvementId: movement.id,
            // eslint-disable-next-line no-underscore-dangle
            _version: current._version,
          },
        },
      });
    }, Promise.resolve());
    await useUpdateBankMouvement.updateBankMovement({
      variables: {
        input: {
          id: movement.id,
          status: BankMovementStatus.Affected,
          date: movement.date,
          // eslint-disable-next-line no-underscore-dangle
          _version: movement._version,
          realEstateId,
        },
      },
    });
    if (onSaved) {
      onSaved();
    }
  };

  return (
    <View style={styles.container}>

      {!keyboardVisible && (
      <View style={{ marginVertical: 20, alignItems: 'center' }}>
        <Amount amount={movement.amount || 0} category="h2" />
        <Text category="h6" status="basic" style={{ marginVertical: 10 }}>{moment(movement.date).format('DD/MM/YYYY')}</Text>
        <Text category="h6" appearance="hint">{movement.description || ''}</Text>
      </View>
      )}

      {budget && budget.length > 0 ? (
        <ScrollView
          style={{ paddingTop: 20, borderTopWidth: 1, borderTopColor: '#b5b5b5' }}
        >
          <Text
            category="h1"
            style={{ marginTop: 20 }}
          >
            Affectation
          </Text>
          <Text category="s2" style={{ marginVertical: 10 }}>
            {`${(movement.amount || 0) < 0
              ? ('Charges') : ('Revenus')} enregistés dans votre budget`}
          </Text>
          <Text category="p1" appearance="hint">
            Sélectionnez le revenu correspondant
          </Text>

          {budget.map((item) => (
            item && (
            <BudgetLineDeadLineCard
              key={item.id}
              checkedProps={checked.find((elem) => (elem && elem.id === item.id)) !== undefined}
              item={item}
              onChecked={(checkedItem, currentChecked) => {
                checkFunction(
                  currentChecked,
                  checkedItem.id,
                  checkedItem.amount,
                  // eslint-disable-next-line no-underscore-dangle
                  checkedItem._version,

                );
              }}
            />
            )
          ))}

        </ScrollView>
      ) : (
        <>
          <Card style={{
            justifyContent: 'center',
            marginBottom: 20,
          }}
          >
            <Text category="h2">
              Vous n'avez plus d'échéances à affecter, vous pouvez
              paramétrer le budget de votre bien.
            </Text>
          </Card>
          <Card
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                allerMonBudget();
              }}
              style={{
                flexDirection: 'row', alignItems: 'center',
              }}
            >
              <Icon name="calculator" size={33} color={theme['color-success-400']} style={{ marginRight: 10 }} />
              <Text category="h5">
                Mon Budget
              </Text>
            </TouchableOpacity>
          </Card>
        </>
      )}
      {!keyboardVisible
      && (budget && budget.length > 0 && (checked.length > 0 ? (amountMouvement === 0
        ? (
          <Button
            status="success"
            style={{ marginVertical: 20 }}
            onPress={() => affecteMovement()}
            loading={updateBudgetLineDeadLine.mutationLoading
            && useUpdateBankMouvement.mutationLoading}
          >
            Enregistrer
          </Button>
        )
        : (
          <>
            <Text category="p1" status="basic" style={{ marginVertical: 20, fontWeight: 'bold' }}>
              Vous devez encore affecter pour
              {' '}
              {Formatter.currencyFormatter.format(amountMouvement)}
            </Text>
            <Card
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  allerMonBudget();
                }}
                style={{
                  flexDirection: 'row', alignItems: 'center',
                }}
              >
                <Icon name="calculator" size={33} color={theme['color-success-400']} style={{ marginRight: 10 }} />
                <Text category="h5">
                  Mon Budget
                </Text>
              </TouchableOpacity>
            </Card>
          </>
        )
      ) : (
        <>
          <Text category="p1" status="basic" style={{ marginVertical: 20 }}>
            Parametrez et consulter vos charges et revenus dans votre budget.
          </Text>
          <Card
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                allerMonBudget();
              }}
              style={{
                flexDirection: 'row', alignItems: 'center',
              }}
            >
              <Icon name="calculator" size={33} color={theme['color-success-400']} style={{ marginRight: 10 }} />
              <Text category="h5">
                Mon Budget
              </Text>
            </TouchableOpacity>
          </Card>
        </>
      )))}

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
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditMouvement;
