import React from 'react';
import { Text, useTheme } from '@ui-kitten/components';

import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
import { useNavigation } from '@react-navigation/native';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import Card from '../../components/Card';
import { useRealEstateList } from '../../src/API/RealEstate';
import { BudgetLineType } from '../../src/API';

/**
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
 */

const MesCharges1 = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const biensDetails = useRealEstateList();

  const houseBudgetLineDeadlines = biensDetails.data?.listRealEstates?.items?.map(
    (item) => item?.budgetLineDeadlines,
  );

  /** Object with 3 attributes and its key */
  const allCurrentCategories: {
    [key: string]: { value: number, label: string }
  } = {};

  if (houseBudgetLineDeadlines) {
    houseBudgetLineDeadlines.forEach((item) => {
      item?.items.forEach((itemBudget) => {
        if (itemBudget?.category
        && itemBudget.type === BudgetLineType.Expense) {
          // console.log('itemBudget: ', itemBudget);
          if (allCurrentCategories[itemBudget?.category] === undefined) {
            allCurrentCategories[itemBudget?.category] = {
              value: itemBudget?.amount || 0,
              label: itemBudget?.category,
            };
          }

          allCurrentCategories[itemBudget?.category].value += itemBudget?.amount || 0;
        }
      });
      return false;
    });
  }

  const labels = Object.values(allCurrentCategories);
  const totalExpenses = Object.values(allCurrentCategories).reduce((t, { value }) => t + value, 0);

  console.log('Trié que par les expenses', houseBudgetLineDeadlines);
  console.log('allCurrentCategories', Object.values(allCurrentCategories));
  console.log('totalExpenses', totalExpenses);

  const onMesCharges2 = (labl) => {
    navigation.navigate('mes-charges-2', { title: labl.label });
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
          // Only do this if items have no stable IDs
          // https://reactjs.org/docs/lists-and-keys.html#keys
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
