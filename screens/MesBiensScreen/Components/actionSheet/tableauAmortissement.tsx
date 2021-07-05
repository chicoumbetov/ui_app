import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from '@ui-kitten/components';
import moment from 'moment';
import React from 'react';
import { AmortizationTable, BankMovement } from '../../../../src/API';
import Amount from '../../../../components/Amount';
import Separator from '../../../../components/Separator';
import BudgetLineDeadLineCard from '../../../MaTresorerieScreen/Components/BudgetLineDeadLineCard';
import TextInputComp from '../../../../components/Form/TextInput';
import { AvailableValidationRules } from '../../../../components/Form/validation';
import TextInput from '../../../../components/Form/TextInput';

type MonBudgetProps = { tabAmo: AmortizationTable[], onSaved?: () => void, borrowedCapital: number };

const TableauAmortissement = (props: MonBudgetProps) => {
  const { tabAmo, onSaved, borrowedCapital } = props;
  let currentCapital = borrowedCapital;
  return (
    <View style={styles.container}>

      <View style={{
        marginVertical: 20, alignItems: 'center', paddingBottom: 20, borderBottomWidth: 2, borderBottomColor: '#d3d3d3',
      }}
      >
        <Text category="h5" status="basic" style={{ marginVertical: 10 }}>Tableau d'Amortissement</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text>Date</Text>
        <Text>Capital Restant</Text>
        <Text>Intérêts payés</Text>
        <Text>Assurance</Text>
        <Text>Mensualité</Text>
        <Text>oui</Text>
      </View>
      <ScrollView style={{ paddingTop: 20, borderTopWidth: 1, borderTopColor: '#b5b5b5' }}>

        {tabAmo.map((tab) => {
          if (tab && tab.amount && tab.interest && tab.assurance && tab.dueDate) {
            currentCapital -= (tab.amount - tab.interest - tab.assurance);
            return (
              <View style={{ flexDirection: 'row' }}>
                <Text>{tab.dueDate}</Text>
                <Text>{Math.round(currentCapital * 100) / 100}</Text>
                <TextInputComp
                  name="interest"
                  keyboardType="numeric"
                  validators={[AvailableValidationRules.required, AvailableValidationRules.float]}
                  defaultValue={Math.round(tab.interest * 100) / 100}
                  onChangeValue={(v) => { tab.interest = v; currentCapital -= (tab.amount - tab.interest - tab.assurance); }}
                />
                <TextInputComp name="assurance" defaultValue={Math.round(tab.assurance * 100) / 100} />
                <Text>{Math.round(tab.amount * 100) / 100}</Text>
                <TextInputComp name="amount" defaultValue={Math.round((tab.amount - tab.interest - tab.assurance) * 100) / 100} />
              </View>
            );
          }
        })}
        <Button>Enregistrer les modifications</Button>
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
