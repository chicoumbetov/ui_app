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
// import { useDeleteBudgetLineMutation } from '../../../src/API/BudgetLine';
import {
  useDeleteBudgetLineDeadlineMutation,
  useUpdateBudgetLineDeadlineMutation,
} from '../../../src/API/BudgetLineDeadLine';
import TextInputComp from '../../../components/Form/TextInput';
import Amount from '../../../components/Amount';
import { useUpdateBankMovement } from '../../../src/API/BankMouvement';

type MonBudgetProps = { budget?: (BudgetLineDeadline | null)[], movement: BankMovement, onSaved?: () => void };

const MouvementAffecter = (props: MonBudgetProps) => {
  const { budget, movement, onSaved } = props;

  const theme = useTheme();

  const updateBudgetLineDeadLine = useUpdateBudgetLineDeadlineMutation();

  const updateBankMouvement = useUpdateBankMovement();

  const annulerAffectation = async () => {
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
          await updateBankMouvement.updateBankMovement({
            variables: {
              input: {
                id: movement.id,
                ignored: false,
                // eslint-disable-next-line no-underscore-dangle
                _version: movement._version,
              },
            },
          });
          if (onSaved) {
            onSaved();
          }
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
      />
      {movement.ignored ? (
        <View>
          <Text category="h3" status="basic" style={{ marginVertical: 10 }}>Affectation</Text>
          <Text category="h6" status="basic" style={{ marginVertical: 10 }}>Mouvement ignoré</Text>
          <Button onPress={() => annulerAffectation()}>Annuler l'affectation</Button>
        </View>

      ) : (
        <>
        </>
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
