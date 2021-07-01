import { Alert, TouchableOpacity, View } from 'react-native';
import {
  Button, Card, CheckBox, Text,
} from '@ui-kitten/components';
import moment from 'moment';
import React, { useState } from 'react';
import _ from 'lodash';
import TextInputComp from '../../../components/Form/TextInput';
import { BudgetLineDeadline } from '../../../src/API';
import Amount from '../../../components/Amount';
import {
  useDeleteBudgetLineDeadlineMutation,
  useUpdateBudgetLineDeadlineMutation,
} from '../../../src/API/BudgetLineDeadLine';
import {
  typeAssurance, typeBanque,
  typeCharge,
  typeDivers,
  typeImpots,
  typeRevenu,
} from '../../../mockData/ajoutRevenuData';

type BudgetLineDeadLineCardProps = {
  item: BudgetLineDeadline;
  onChecked?: (item: BudgetLineDeadline, checked: boolean) => void;
  editable?: boolean
};

const BudgetLineDeadLineCard = (props: BudgetLineDeadLineCardProps) => {
  const { item, onChecked, editable = true } = props;
  const [checked, setChecked] = useState(false);
  const [edit, setEdit] = useState(false);
  const [amount, setAmount] = useState(item.amount);
  const [rentalCharges, setRentalCharges] = useState(item.rentalCharges);
  const [managementFees, setManagementFees] = useState(item.managementFees);
  const { updateBudgetLineDeadline, mutationLoading } = useUpdateBudgetLineDeadlineMutation();
  const deleteBudgetLineDeadLine = useDeleteBudgetLineDeadlineMutation();

  const allPossibleTypes = {};
  _.merge(allPossibleTypes, typeCharge,
    typeImpots,
    typeRevenu,
    typeAssurance, typeDivers, typeBanque);
  console.log('item :', item);
  const saveBudgetLineDeadLine = async (
    data:BudgetLineDeadline,
    newAmount:number,
    neawManagementFees?: number,
    newRentalCharges?: number,
  ) => {
    if (item.category === 'loyer') {
      await updateBudgetLineDeadline({
        variables: {
          input: {
            id: data.id,
            amount: newAmount,
            rentalCharges: newRentalCharges,
            managementFees: neawManagementFees,
            // eslint-disable-next-line no-underscore-dangle
            _version: data._version,
          },
        },
      });
    } else {
      await updateBudgetLineDeadline({
        variables: {
          input: {
            id: data.id,
            amount: newAmount,
            // eslint-disable-next-line no-underscore-dangle
            _version: data._version,
          },
        },
      });
    }

    if (checked) {
      data.amount = newAmount - data.amount;
      if (onChecked) {
        onChecked(data, true);
      }
    }
    setEdit(false);
  };

  const removeBudgetLineDeadLine = async (thisItem: BudgetLineDeadline) => {
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
          await deleteBudgetLineDeadLine({
            variables: {
              input: {
                id: thisItem.id,
                // eslint-disable-next-line no-underscore-dangle
                _version: thisItem._version,
              },
            },
          });
        },
      }],
    );
  };

  let isLoyer = false;
  if (item.category === 'loyer') {
    isLoyer = true;
  }

  return (
    <Card
      key={item.id}
      style={{ marginVertical: 15 }}
    >
      <View
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        {editable && (
        <CheckBox
          checked={checked}
          onChange={
                    (nextChecked) => {
                      setChecked(nextChecked);
                      if (onChecked) {
                        onChecked(item, nextChecked);
                      }
                    }
                }
          style={{ marginRight: 20 }}
        />
        )}
        <View style={{
          flex: 1,
          borderRightWidth: 1,
          borderRightColor: '#b5b5b5',
        }}
        >

          <Text
            style={{ marginBottom: 15 }}
            category="h5"
            status="basic"
          >
            {allPossibleTypes[item.category].label}
          </Text>
          {edit ? (
            <>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInputComp
                  name="amount"
                  defaultValue={item.amount.toString()}
                  keyboardType="numeric"
                  onChangeValue={(v) => {
                    if (v) {
                      setAmount(parseFloat(v.toString()));
                    }
                  }}
                />
                <Text category="c1" style={{ marginHorizontal: 10 }}>
                  €
                </Text>
              </View>
              {isLoyer && (
              <>
                <Text
                  style={{ marginBottom: 15 }}
                  category="h5"
                  status="basic"
                >
                  Charges
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TextInputComp
                    name="rentalCharges"
                    defaultValue={item.rentalCharges.toString()}
                    keyboardType="numeric"
                    onChangeValue={(v) => {
                      if (v) {
                        setRentalCharges(parseFloat(v.toString()));
                      }
                    }}
                  />
                  <Text category="c1" style={{ marginHorizontal: 10 }}>
                    €
                  </Text>
                </View>
                <Text
                  style={{ marginBottom: 15 }}
                  category="h5"
                  status="basic"
                >
                  Frais de gestion
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TextInputComp
                    name="managementFees"
                    defaultValue={item.managementFees.toString()}
                    keyboardType="numeric"
                    onChangeValue={(v) => {
                      if (v) {
                        setManagementFees(parseFloat(v.toString()));
                      }
                    }}
                  />
                  <Text category="c1" style={{ marginHorizontal: 10 }}>
                    €
                  </Text>
                </View>
              </>
              )}
            </>
          ) : (
            <Amount amount={item.amount} category="c1" />
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
      {editable && (
      <View style={{
        backgroundColor: '#f6f6f6',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 25,
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        alignItems: 'center',
        marginTop: 15,
      }}
      >
        <Text category="h6" status="warning">En attente</Text>
        {edit ? (
          <>
            <TouchableOpacity onPress={() => { setEdit(false); setAmount(item.amount); }}>
              <Text category="h6">Annuler</Text>
            </TouchableOpacity>
            <Button
              size="small"
              onPress={() => {
                saveBudgetLineDeadLine(item, amount, managementFees, rentalCharges);
              }}
              disabled={mutationLoading}
            >
              Enregister
            </Button>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={() => setEdit(true)}>
              <Text category="h6" status="info">Editer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeBudgetLineDeadLine(item)}>
              <Text category="h6" status="danger">Supprimer</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      )}

    </Card>
  );
};

export default BudgetLineDeadLineCard;
