import { Alert, TouchableOpacity, View } from 'react-native';
import {
  Button, Card, CheckBox, Text, useTheme,
} from '@ui-kitten/components';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
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
import TextInput from '../../../components/Form/TextInput';

type BudgetLineDeadLineCardProps = {
  item: BudgetLineDeadline;
  onChecked?: (item: BudgetLineDeadline, checked: boolean) => void;
  editable?: boolean;
  checkedProps?: boolean;
};

const allPossibleTypes = {
  ...typeCharge,
  ...typeImpots,
  ...typeRevenu,
  ...typeAssurance,
  ...typeDivers,
  ...typeBanque,
};

const BudgetLineDeadLineCard = (props: BudgetLineDeadLineCardProps) => {
  const {
    item, onChecked, editable = true, checkedProps = false,
  } = props;
  const [checked, setChecked] = useState(false);
  const [edit, setEdit] = useState(false);
  const [amount, setAmount] = useState(item.amount);
  const [rentalCharges, setRentalCharges] = useState(item.rentalCharges);
  const [managementFees, setManagementFees] = useState(item.managementFees);
  const [interest, setInterest] = useState(item.infoCredit?.interest);
  const [assurance, setAssurance] = useState(item.infoCredit?.assurance);
  const [householdWaste, setHouseholdWaste] = useState(item.householdWaste);

  useEffect(() => {
    setChecked(checkedProps);
  }, [checkedProps]);

  const { updateBudgetLineDeadline, mutationLoading } = useUpdateBudgetLineDeadlineMutation();
  const deleteBudgetLineDeadLine = useDeleteBudgetLineDeadlineMutation();

  const saveBudgetLineDeadLine = async (
    data:BudgetLineDeadline,
    newAmount:number,
    neawManagementFees?: number,
    newRentalCharges?: number,
  ) => {
    if (isLoyer) {
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
    } else if (isMensualité) {
      await updateBudgetLineDeadline({
        variables: {
          input: {
            id: data.id,
            amount: newAmount,
            infoCredit: {
              amount: newAmount,
              assurance,
              interest,
            },
            // eslint-disable-next-line no-underscore-dangle
            _version: data._version,
          },
        },
      });
    } else if (isTaxFonciere) {
      await updateBudgetLineDeadline({
        variables: {
          input: {
            id: data.id,
            amount: newAmount,
            householdWaste,
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
      'Suppression de revenu',
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

  let isMensualité = false;
  if (item.category === 'mensualite_credit') {
    isMensualité = true;
  }
  let isTaxFonciere = false;
  if (item.category === 'taxes_foncieres') {
    isTaxFonciere = true;
  }

  const theme = useTheme();
  return (
    <Card
      key={item.id}
      style={{
        marginVertical: 15,
        borderWidth: checked ? (1) : (0),
        borderColor: theme['color-success-400'],
      }}
    >
      <View
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        {editable && !edit && (
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
          borderRightWidth: edit ? 0 : 1,
          borderRightColor: '#b5b5b5',
        }}
        >

          <Text
            style={{ marginBottom: edit ? 0 : 15 }}
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
                  maskOptions={item.amount > 0 ? ({
                    type: 'money',
                    options: {
                      precision: 2,
                      separator: ',',
                      delimiter: ' ',
                      unit: '',
                      suffixUnit: ' €',
                    },
                  }) : ({
                    type: 'money',
                    options: {
                      precision: 2,
                      separator: ',',
                      delimiter: ' ',
                      unit: '-',
                      suffixUnit: ' €',
                    },
                  })}
                  onChangeValue={(v) => {
                    if (v) {
                      setAmount(parseFloat(v.toString()));
                    }
                  }}
                />
              </View>
              {isLoyer && (
              <>
                <Text
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
                    maskOptions={{
                      type: 'money',
                      options: {
                        precision: 2,
                        separator: ',',
                        delimiter: ' ',
                        unit: '',
                        suffixUnit: ' €',
                      },
                    }}
                    onChangeValue={(v) => {
                      if (v) {
                        setRentalCharges(parseFloat(v.toString()));
                      }
                    }}
                  />
                </View>
                <Text
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
                    maskOptions={item.amount > 0 ? ({
                      type: 'money',
                      options: {
                        precision: 2,
                        separator: ',',
                        delimiter: ' ',
                        unit: '',
                        suffixUnit: ' €',
                      },
                    }) : ({
                      type: 'money',
                      options: {
                        precision: 2,
                        separator: ',',
                        delimiter: ' ',
                        unit: '-',
                        suffixUnit: ' €',
                      },
                    })}
                    onChangeValue={(v) => {
                      if (v) {
                        v = -Math.abs(v);
                        setManagementFees(parseFloat(v.toString()));
                      }
                    }}
                  />
                </View>
              </>
              )}
              {isMensualité && (
              <>
                <Text
                  category="h5"
                  status="basic"
                >
                  Charges
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TextInputComp
                    name="infoCredit.interest"
                    defaultValue={item.infoCredit?.interest.toString()}
                    keyboardType="numeric"
                    maskOptions={{
                      type: 'money',
                      options: {
                        precision: 2,
                        separator: ',',
                        delimiter: ' ',
                        unit: '',
                        suffixUnit: ' €',
                      },
                    }}
                    onChangeValue={(v) => {
                      if (v) {
                        v = -Math.abs(v);
                        setInterest(parseFloat(v.toString()));
                      }
                    }}
                  />
                </View>
                <Text
                  category="h5"
                  status="basic"
                >
                  Frais d'assurance
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TextInputComp
                    name="infoCredit.assurance"
                    defaultValue={item.infoCredit?.assurance.toString()}
                    keyboardType="numeric"
                    maskOptions={{
                      type: 'money',
                      options: {
                        precision: 2,
                        separator: ',',
                        delimiter: ' ',
                        unit: '',
                        suffixUnit: ' €',
                      },
                    }}
                    onChangeValue={(v) => {
                      if (v) {
                        v = -Math.abs(v);
                        setAssurance(parseFloat(v.toString()));
                      }
                    }}
                  />
                </View>
              </>
              )}
              {isTaxFonciere && (
              <>
                <Text
                  category="h5"
                  status="basic"
                >
                  Dont Ordures ménagères
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TextInputComp
                    name="householdWaste"
                    defaultValue={item.householdWaste.toString()}
                    keyboardType="numeric"
                    maskOptions={{
                      type: 'money',
                      options: {
                        precision: 2,
                        separator: ',',
                        delimiter: ' ',
                        unit: '',
                        suffixUnit: ' €',
                      },
                    }}
                    onChangeValue={(v) => {
                      if (v) {
                        v = -Math.abs(v);
                        setHouseholdWaste(parseFloat(v.toString()));
                      }
                    }}
                  />
                </View>

              </>
              )}
            </>
          ) : (
            <Amount amount={item.amount} category="c1" />
          )}

        </View>

        {!edit && (
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
        ) }
      </View>
      {editable && (
      <View style={{
        backgroundColor: '#f6f6f6',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 25,
        paddingVertical: edit ? 16.5 : 25,
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        alignItems: 'center',
        marginTop: edit ? -5 : 15,
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
