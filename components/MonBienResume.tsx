import React, { useEffect, useState } from 'react';
import {
  Icon, Text,
  // useTheme,
} from '@ui-kitten/components';
import { TouchableOpacity, View } from 'react-native';
import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
import { useLinkTo } from '@react-navigation/native';
import CompteHeader from './CompteHeader/CompteHeader';

import { MonBienProps } from '../types';
import Card from './Card';
import { useGetRealEstate, useRentability } from '../src/API/RealEstate';
import { BankMovementStatus, BudgetLineType, RealEstate } from '../src/API';
import DateUtils from '../utils/DateUtils';
import Amount from './Amount';
import Percentage from './Percentage';

const MonBienResume = (props: MonBienProps) => {
  const { biens } = props;
  // const theme = useTheme();
  const linkTo = useLinkTo();

  const { bienget } = useGetRealEstate(biens?.id);
  const [bienCharger, setBienCharger] = useState<RealEstate>();
  useEffect(() => {
    setBienCharger(bienget);
  }, [bienget]);

  const allerDetailsBien = (id: string) => {
    linkTo(`/mes-biens/${id}`);
  };

  const { budgetLineDeadlines } = bienget || {};

  /*
    *   Rentabilité
    *
    */
  const rentability = useRentability(
    budgetLineDeadlines?.items,
    (bienget?.purchasePrice || 0) + (bienget?.notaryFee || 0),
  );

  /**
     *   Summarizing of each expenses and incomes
     */
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const allDataNextExpense = bienCharger?.budgetLineDeadlines?.items
        && bienCharger?.budgetLineDeadlines?.items?.map((item) => {
          // years for all existing Eau expenses in whole period
          const allYears = DateUtils.parseToDateObj(item?.date).getFullYear();
          const allMonths = DateUtils.parseToDateObj(item?.date).getMonth();

          if (item?.type === BudgetLineType.Expense
                // eslint-disable-next-line no-underscore-dangle
                && !item?._deleted
                && allYears === currentYear
                && allMonths === currentMonth + 1
          ) {
            return item;
          }
          return false;
        });

  const nextexpense = allDataNextExpense?.map((d) => d?.amount)
    .find((m) => m);

  const dernierMovement = bienCharger?.bankMovements?.items?.find(
    (item) => { if (item?.status === BankMovementStatus.Ignored) { return false; } return true; },
  );

  return (
    <Card style={{ marginTop: 27 }}>
      <TouchableOpacity
        onPress={() => allerDetailsBien(biens.id)}
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <CompteHeader title={bienCharger?.name} iconUri={bienCharger?.iconUri} />
        <IconUIKitten
          name="arrow-ios-forward"
          fill="#b5b5b5"
          style={{
            height: 16, width: 16, marginRight: 5, marginTop: 8,
          }}
        />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 22,
          justifyContent: 'space-between',
        }}
      >
        {/**
           *
           */}
        <View>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <View style={{ width: 22, flexDirection: 'row' }}>
              <View style={{ width: 7 }}>
                <IconUIKitten
                  name="arrow-downward"
                  fill="#b5b5b5"
                  style={{ height: 16, width: 16 }}
                />
              </View>
              <IconUIKitten
                name="arrow-upward"
                fill="#b5b5b5"
                style={{
                  height: 16, width: 16, marginRight: 8,
                }}
              />
            </View>

            <Text category="h5" status="success">
              <Amount amount={dernierMovement?.amount || 0} category="h4" />
            </Text>
          </View>
        </View>

        {/**
           *
           */}

        <View
          style={{
            alignItems: 'center',
            marginRight: 20,
            flexDirection: 'row',
          }}
        >
          <Icon
            name="arrow-downward"
            fill="#b5b5b5"
            style={{ height: 16, width: 16 }}
          />
          <Amount category="h3" amount={nextexpense || 0} />
        </View>

        {/**
           *
           */}
        <View style={{
          flexDirection: 'row',
        }}
        >
          <Icon
            name="trending-up"
            fill="#b5b5b5"
            style={{ height: 18, width: 18, marginRight: 2 }}
          />
          <Percentage amount={rentability} category="h3" status="warning" />
        </View>

      </View>

    </Card>
  );
};

export default MonBienResume;

// const styles = StyleSheet.create({ container: { } });
