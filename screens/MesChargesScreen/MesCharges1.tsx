import React, { useState } from 'react';
import { Text, useTheme } from '@ui-kitten/components';

import {
  TouchableOpacity,
} from 'react-native';

import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
import { useNavigation } from '@react-navigation/native';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import Card from '../../components/Card';
import { useGetRealEstate, useRealEstateList } from '../../src/API/RealEstate';
import { BudgetLineType } from '../../src/API';
import DateUtils from '../../utils/DateUtils';

const DATA = [
  {
    id: '0',
    title: 'Eau',
    isChecked: false,
  },
  {
    id: '1',
    title: 'Electricité',
    isChecked: false,
  },
  {
    id: '2',
    title: 'Frais Divers',
    isChecked: false,
  },
  {
    id: '3',
    title: 'Assurances',
    isChecked: false,
  },
];

const MesCharges1 = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  // const [charges] = useState(DATA);
  const biensDetails = useRealEstateList();

  const houseBudgetLineDeadlines = biensDetails.data?.listRealEstates?.items?.map(
    (item) => item?.budgetLineDeadlines,
  );

  // const currentYear = new Date().getFullYear();

  /** Object with 3 attributes and its key */
  const allCurrentCategories: {
    [key: string]: { value: number, label: string }
  } = {};

  // console.log('AAAAAAAAA');

  if (houseBudgetLineDeadlines) {
    houseBudgetLineDeadlines.forEach((item) => {
      item?.items.forEach((itemBudget) => {
        // const allYears = DateUtils.parseToDateObj(itemBudget?.date).getFullYear();
        if (itemBudget?.category
        && itemBudget.type === BudgetLineType.Expense) {
          // console.log('itemBudget: ', itemBudget);
          if (allCurrentCategories[itemBudget?.category] === undefined) {
            /**
             * initial values and then calculate percentage starting from 0
             */
            allCurrentCategories[itemBudget?.category] = {
              value: itemBudget?.amount || 0,
              label: itemBudget?.category,
            };
          } else {
            /** else If any expoense exist then we add to allCurrentCategories variable */
            allCurrentCategories[itemBudget?.category].value += itemBudget?.amount || 0;
          }
        }
      });
      return false;
    });
  }
  const labels = Object.values(allCurrentCategories);
  const totalExpenses = Object.values(allCurrentCategories).reduce((t, { value }) => t + value, 0);
  console.log('allCurrentCategories', Object.values(allCurrentCategories));
  console.log('totalExpenses', totalExpenses);

  const onMesCharges2 = (lbl) => {
    navigation.navigate('mes-charges-2', { value: lbl.value, label: lbl.label });
  };

  return (
    <MaxWidthContainer
      outerViewProps={{
        style: {
          padding: 24,
        },
      }}
    >
      <Text category="h1" status="basic" style={{ marginTop: 13 }}>Mes rapports par charges</Text>
      <Text
        category="h5"
        appearance="hint"
        style={{
          marginTop: 7,
          paddingVertical: 30,
        }}
      >
        Choisissez votre charge
      </Text>

      {labels.map((lbl, index) => (
        <Card
          key={index}
          onPress={() => { onMesCharges2(lbl); }}
          style={{
            padding: 23,
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text category="h5" status="basic">{lbl.label}</Text>
          <IconUIKitten
            name="arrow-ios-forward"
            fill={theme['text-hint-color']}
            style={{
              height: 17, width: 17,
            }}
          />
        </Card>
      ))}

    </MaxWidthContainer>

  );
};

export default MesCharges1;

// const styles = StyleSheet.create({ container: {} });
