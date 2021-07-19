import React, { useMemo } from 'react';
import {
  Icon, Text,
  // useTheme,
} from '@ui-kitten/components';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
import { useLinkTo } from '@react-navigation/native';
import CompteHeader from './CompteHeader/CompteHeader';

import { MonBienProps } from '../types';
import Card from './Card';
import { useRentability } from '../src/API/RealEstate';
import { BankMovementStatus } from '../src/API';
import Amount from './Amount';
import Percentage from './Percentage';
import {
  typeAssurance, typeBanque,
  typeCharge,
  typeDivers,
  typeImpots,
  typeRevenu,
} from '../mockData/ajoutRevenuData';

// make common list of all possible
// revenues, expeneses categories, types
// with their keys, labels
const allPossibleTypes = {
  ...typeCharge,
  ...typeImpots,
  ...typeRevenu,
  ...typeAssurance,
  ...typeDivers,
  ...typeBanque,
};

const MonBienResume = (props: MonBienProps) => {
  const { bien } = props;
  // const theme = useTheme();
  const linkTo = useLinkTo();

  const allerDetailsBien = (id?: string) => {
    if (id) {
      linkTo(`/mes-biens/${id}`);
    }
  };

  const { budgetLineDeadlines, bankMovements, budgetLines } = bien || {};

  /*
    *   Rentabilité
    *
    */
  const rentability = useRentability(
    budgetLineDeadlines?.items,
    (bien?.purchasePrice || 0) + (bien?.notaryFee || 0),
  );

  // budgetLines are already sorted in schema.graphql
  // sortDirection: ASC
  const nextexpense = budgetLines?.items
      && budgetLines?.items.length > 0
      && (budgetLines.items.find((item) => (item && item.amount < 0)));

  // useMemo used if big O notation is expensive. higher than n to the power 2
  const dernierMovement = useMemo(() => bankMovements?.items?.find(
    (item) => (item && item.status === BankMovementStatus.Affected),
  ), [bankMovements]);

  return (
    <Card style={{ marginTop: 27 }}>
      <TouchableOpacity
        onPress={() => allerDetailsBien(bien?.id)}
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <CompteHeader title={bien?.name} iconUri={bien?.iconUri} />
        <IconUIKitten
          name="arrow-ios-forward"
          fill="#b5b5b5"
          style={{
            height: 16, width: 16, marginRight: 5, marginTop: 8,
          }}
        />
      </TouchableOpacity>

      <View style={{
        flexDirection: 'row',
        marginTop: 22,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      >
        {/**
             *
             */}
        <View style={styles.oneThirdBlock}>
          <Text category="h6" appearance="hint" style={styles.text}>Dernier mouvement</Text>
          <View style={{
            flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
          }}
          >
            <View style={{ width: 7 }}>
              <IconUIKitten
                name="arrow-downward"
                fill="#b5b5b5"
                style={{ height: 16, width: 16 }}
              />
            </View>
            <View style={{ width: 17 }}>
              <IconUIKitten
                name="arrow-upward"
                fill="#b5b5b5"
                style={{
                  height: 16, width: 16, marginRight: 8,
                }}
              />
            </View>
            <Amount amount={dernierMovement?.amount || 0} category="h6" />
          </View>
        </View>

        {/**
             *
             */}

        <View style={styles.oneThirdBlock}>
          <Text category="h6" appearance="hint" style={styles.text}>
            Prochaine dépense
          </Text>
          <View style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
          >
            <Icon
              name="arrow-downward"
              fill="#b5b5b5"
              style={{ height: 16, width: 16 }}
            />
            <Amount amount={(nextexpense || { amount: 0 }).amount} category="h6" />
          </View>
          {nextexpense
          && (
          <Text category="h6" appearance="hint" style={styles.text}>
            {allPossibleTypes[nextexpense.category as keyof typeof allPossibleTypes].label}
          </Text>
          )}
        </View>
        {/**
             *
             */}
        <View style={styles.oneThirdBlock}>
          <Text category="h6" appearance="hint" style={styles.text}>
            Rentabilité du bien
          </Text>
          <View style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
          >
            <Icon
              name="trending-up"
              fill="#b5b5b5"
              style={{ height: 18, width: 18, marginRight: 2 }}
            />
            <Percentage amount={rentability} category="h6" status="warning" />
          </View>
        </View>

      </View>

    </Card>
  );
};

export default MonBienResume;

const styles = StyleSheet.create({

  oneThirdBlock: {
    flex: 1,
    marginTop: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    justifyContent: 'center',
    textAlign: 'center',
  },
});
