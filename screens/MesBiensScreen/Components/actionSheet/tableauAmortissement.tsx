import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from '@ui-kitten/components';
import React, { useState } from 'react';

import moment from 'moment';
import { AmortizationTable, TenantInfoInput } from '../../../../src/API';

import TextInputComp from '../../../../components/Form/TextInput';
import { AvailableValidationRules } from '../../../../components/Form/validation';
import { removeKeyArray } from '../../../../utils/ObjectHelper';
import DateUtils from '../../../../utils/DateUtils';

type MonBudgetProps = { tabAmo: AmortizationTable[], onSaved?: (item: AmortizationTable[]) => void, borrowedCapital: number };

const TableauAmortissement = (props: MonBudgetProps) => {
  const { tabAmo, onSaved, borrowedCapital } = props;
  const [thisTabAmor, setThisTabAmor] = useState<AmortizationTable[]>(tabAmo);
  let currentCapital = borrowedCapital;
  const saveTabAmorti = () => {
    if (onSaved) {
      const tabAmorti = removeKeyArray((thisTabAmor || []), '__typename');
      onSaved(tabAmorti);
    }
  };

  return (
    <View style={styles.container}>

      <View style={{
        marginVertical: 20, alignItems: 'center', paddingBottom: 20, borderBottomWidth: 2, borderBottomColor: '#d3d3d3',
      }}
      >
        <Text category="h5" status="basic" style={{ marginVertical: 10 }}>Tableau d'Amortissement</Text>
      </View>
      <ScrollView horizontal style={{ height: 400 }}>
        <View style={{ flexDirection: 'column' }}>

          <View style={{
            flexDirection: 'row', alignItems: 'center',
          }}
          >
            <Text style={{ maxWidth: 100, width: 100 }}>Date</Text>
            <Text style={{ maxWidth: 100, width: 100, paddingLeft: 5 }}>Capital Restant</Text>
            <View style={{
              flex: 1, maxWidth: 120, width: 120, justifyContent: 'center',
            }}
            >
              <Text style={{ marginLeft: 15 }}>
                Intérêts payés
              </Text>
            </View>

            <View style={{
              flex: 1, justifyContent: 'center',
            }}
            >
              <Text style={{ marginLeft: 15 }}>Assurance</Text>
            </View>

            <Text style={{ maxWidth: 120, width: 120, paddingLeft: 5 }}>Mensualité</Text>
            <View style={{
              flex: 1, maxWidth: 120, width: 120, marginLeft: 10, justifyContent: 'center',
            }}
            >
              <Text style={{ marginLeft: 15 }}>Capital remboursé</Text>
            </View>

          </View>
          <ScrollView style={{ paddingTop: 20, borderTopWidth: 1, borderTopColor: '#b5b5b5' }}>

            {thisTabAmor.map((tab, currentIndex) => {
              if (tab && tab.amortizedCapital && tab.interest && tab.assurance && tab.dueDate) {
                const amount = (tab.amortizedCapital + tab.interest + tab.assurance);
                currentCapital -= tab.amortizedCapital;
                return (
                  <View style={{
                    flexDirection: 'row', alignItems: 'center',
                  }}
                  >
                    <Text style={{ maxWidth: 100, width: 100 }}>{moment(DateUtils.parseToDateObj(tab.dueDate)).format('DD/MM/YYYY')}</Text>
                    <View style={{
                      maxWidth: 100, width: 100, paddingLeft: 5, justifyContent: 'center', alignItems: 'center',
                    }}
                    >
                      <Text>
                        {Math.round(currentCapital * 100) / 100}
                      </Text>
                    </View>

                    <TextInputComp
                      name="interest"
                      keyboardType="numeric"
                      validators={[
                        AvailableValidationRules.required,
                        AvailableValidationRules.float,
                      ]}
                      defaultValue={Math.round(tab.interest * 100) / 100}
                      onChangeValue={(v) => {
                        const newThisTabAmor = thisTabAmor.map((item, i) => {
                          if (i === currentIndex) {
                            return {
                              ...item,
                              interest: parseFloat(v),
                            };
                          }
                          return item;
                        });
                        setThisTabAmor(newThisTabAmor);
                      }}
                      style={{
                        maxWidth: 120, width: 120, justifyContent: 'center', marginHorizontal: 5,
                      }}
                    />
                    <TextInputComp
                      name="assurance"
                      defaultValue={Math.round(tab.assurance * 100) / 100}
                      style={{ maxWidth: 120, width: 120, marginHorizontal: 5 }}
                      onChangeValue={(v) => {
                        const newThisTabAmor = thisTabAmor.map((item, i) => {
                          if (i === currentIndex) {
                            return {
                              ...item,
                              assurance: parseFloat(v),
                            };
                          }
                          return item;
                        });
                        setThisTabAmor(newThisTabAmor);
                      }}
                    />
                    <View style={{
                      maxWidth: 120, width: 120, alignItems: 'center', justifyContent: 'center',
                    }}
                    >
                      <Text>{Math.round(amount * 100) / 100}</Text>
                    </View>

                    <TextInputComp
                      name="amortizedCapital"
                      defaultValue={Math.round((tab.amortizedCapital) * 100) / 100}
                      style={{
                        maxWidth: 120, width: 120, justifyContent: 'center', marginHorizontal: 5,
                      }}
                      onChangeValue={(v) => {
                        const newThisTabAmor = thisTabAmor.map((item, i) => {
                          if (i === currentIndex) {
                            return {
                              ...item,
                              amortizedCapital: parseFloat(v),
                            };
                          }
                          return item;
                        });
                        setThisTabAmor(newThisTabAmor);
                      }}
                    />
                  </View>
                );
              }
            })}
            <Button onPress={() => saveTabAmorti()}>Enregistrer les modifications</Button>
          </ScrollView>

        </View>
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

export default TableauAmortissement;
