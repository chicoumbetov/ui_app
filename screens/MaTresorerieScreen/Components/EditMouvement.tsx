import {
  Button,
  Card, CheckBox, Text, useTheme,
} from '@ui-kitten/components';
import {
  Alert,
  ScrollView, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import React, { useState } from 'react';
import moment from 'moment';
import Icon from '../../../components/Icon';
import { BankMovement, BudgetLineDeadline, BudgetLineType } from '../../../src/API';

import {
  useDeleteBudgetLineDeadlineMutation,
  useUpdateBudgetLineDeadlineMutation,
} from '../../../src/API/BudgetLineDeadLine';
import TextInputComp from '../../../components/Form/TextInput';
import Amount from '../../../components/Amount';
import { useUpdateBankMovement } from '../../../src/API/BankMouvement';

type MonBudgetProps = { budget?: (BudgetLineDeadline | null)[], movement: BankMovement, onSaved?: () => void };

const EditMouvement = (props: MonBudgetProps) => {
  const { budget, movement, onSaved } = props;
  // console.log('budget :', budget);
  // console.log('amount : ', amount);
  const theme = useTheme();

  const updateBudgetLineDeadLine = useUpdateBudgetLineDeadlineMutation();

  const [checked, setChecked] = React.useState<Array<{ id:string, _version:number }>>([]);
  const [edit, setedit] = React.useState<string[]>([]);

  const [amountMouvement, setAmountMouvement] = useState(movement.amount || 0);
  const [newAmount, setNewAmount] = useState();

  const deleteBudgetLine = useDeleteBudgetLineDeadlineMutation();
  const useUpdateBankMouvement = useUpdateBankMovement();

  const isEdited = (id:string): boolean => edit.indexOf(id) > -1;

  const editFunction = async (isEdit: boolean, data:BudgetLineDeadline, modifier?: boolean) => {
    const neweditState = edit.filter((currentId) => currentId !== data.id);
    if (isEdit) {
      neweditState.push(data.id);
    }
    if (modifier) {
      await updateBudgetLineDeadLine.updateBudgetLineDeadline({
        variables: {
          input: {
            id: data.id,
            amount: newAmount,
            _version: data._version,
          },
        },
      });
    }

    setedit(neweditState);
    console.log('edit :', edit);
  };

  const isChecked = (id:string): boolean => checked.filter((item) => item.id === id).length > 0;

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

  const affecteMovement = async () => {
    checked.reduce(async (promise, current) => {
      await promise;
      await updateBudgetLineDeadLine.updateBudgetLineDeadline({
        variables: {
          input: {
            id: current.id,
            bankMouvementId: movement.id,
            _version: current._version,
          },
        },
      });
    }, Promise.resolve());
    if (onSaved) {
      onSaved();
    }
  };

  const supprimerLeRevenue = async (item) => {
    Alert.alert(
      'Suppression de revenue',
      '',
      [{
        text: 'Annuler',
        style: 'cancel',
      },
      {
        text: 'Valider',
        onPress: async () => {
          await deleteBudgetLine({
            variables: {
              input: {
                id: item.id,
                // eslint-disable-next-line no-underscore-dangle
                _version: item._version,
              },
            },
          });
        },
      }],
    );
  };

  return (
    <View style={styles.container}>

      <View style={{ marginVertical: 20, alignItems: 'center' }}>
        <Amount amount={movement.amount || 0} category="h2" />
        <Text category="h6" status="basic" style={{ marginVertical: 10 }}>{moment(movement.date).format('DD/MM/YYYY')}</Text>
        <Text category="h6" appearance="hint">{movement.description || ''}</Text>
      </View>
      <ScrollView
        style={{ paddingTop: 20, borderTopWidth: 1, borderTopColor: '#b5b5b5' }}
      >
        {budget.length > 0 ? (
          <>
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
              Sélectionner le revenu correspondant
            </Text>

            {budget.map((item) => (
              <Card
                key={item.id}
                style={{ marginVertical: 15 }}
              >
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}
                >
                  <CheckBox
                    checked={isChecked(item.id)}
                    onChange={
                      (nextChecked) => checkFunction(nextChecked, item.id, item.amount, item._version)
                    }
                    style={{ marginRight: 20 }}
                  />
                  <View style={{
                    flex: 1,
                    borderRightWidth: 1,
                    borderRightColor: '#b5b5b5',
                  }}
                  >

                    <Text
                      style={{ marginBottom: 15 }}
                      category="h4"
                      status="basic"
                    >
                      {item.category}
                    </Text>
                    {isEdited(item.id) ? (
                      <TextInputComp
                        name="amount"
                        defaultValue={item.amount}
                        keyboardType="numeric"
                        onChangeValue={(v) => setNewAmount(v)}
                      />
                    ) : (
                      <Text
                        category="c1"
                        status={item.type === BudgetLineType.Expense
                          ? ('danger') : ('success')}
                      >
                        {item.type === BudgetLineType.Expense ? ('') : ('+')}
                        {item.amount}
                      </Text>

                    )}

                  </View>

                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      flexDirection: 'column',
                      // justifyContent: 'space-evenly',
                      paddingLeft: 10,
                    }}
                  >
                    <Text category="p1" status="basic">Mensuel</Text>
                    <Text category="p1" appearance="hint">Echéance</Text>
                    <Text category="h6" status="basic">{`${moment(item.date).format('DD/MM/YYYY')}`}</Text>

                  </View>
                </View>
                <View style={{
                  backgroundColor: '#f6f6f6',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 25,
                  borderBottomStartRadius: 10,
                  borderBottomEndRadius: 10,
                  alignItems: 'center',
                }}
                >
                  <Text category="h6" status="warning">En attente</Text>
                  {isEdited(item.id) ? (
                    <>
                      <TouchableOpacity onPress={() => editFunction(!isEdited(item.id), item)}>
                        <Text category="h6">Annuler</Text>
                      </TouchableOpacity>
                      <Button
                        size="small"
                        onPress={() => { editFunction(!isEdited(item.id), item, true); }}
                          // style={{ marginTop: 25 }}
                      >
                        Enregister
                      </Button>
                    </>
                  ) : (
                    <>
                      <TouchableOpacity onPress={() => editFunction(!isEdited(item.id), item)}>
                        <Text category="h6" status="info">Editer</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => supprimerLeRevenue(item)}>
                        <Text category="h6" status="danger">Supprimer</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>

              </Card>
            ))}
            {checked.length > 0 ? (amountMouvement === 0
              ? (<Button status="success" style={{ marginVertical: 20 }} onPress={() => affecteMovement()}>Enregistrer</Button>)
              : (
                <>
                  <Text category="p1" status="basic" style={{ marginVertical: 20 }}>
                    Il vous manque
                    {' '}
                    {amountMouvement}
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
          </>
        ) : (
          <>
            <Card style={{
              justifyContent: 'center',
              marginBottom: 20,
            }}
            >
              <Text category="h2">
                Vous n'avez pas de charges affecté a votre loyé merci de les affécter depuis votre Budget
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

      </ScrollView>

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

export default EditMouvement;
