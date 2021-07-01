import React, { useMemo } from 'react';
// import { useNavigation } from '@react-navigation/native';
import { Text } from '@ui-kitten/components';

import { useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';

import Graphics from '../../../components/Graphics/Graphics';
import GraphicsII from '../../../components/Graphics/GraphicsII';
import { useGetRealEstate } from '../../../src/API/RealEstate';
import Separator from '../../../components/Separator';
import Card from '../../../components/Card';
import DateUtils from '../../../utils/DateUtils';
import { BudgetLineType } from '../../../src/API';

/**
const mesBiensData = [
  { x: '35%', y: 35 },
  { x: '15%', y: 15 },
  { x: '15%', y: 15 },
  { x: '35%', y: 35 },
];

const mesTotalData = [
  { x: 1, y: 2 },
  { x: 2, y: 3 },
  { x: 3, y: 5 },
  { x: 4, y: 4 },
  { x: 5, y: 7 },
];
*/

const MesRapportBien2 = () => {
  const route = useRoute();
  // console.log('route dans MesCharges 3', route);

  /** 11111111 */
  const { range, id } = route.params;
  console.log('dans ', id, range);
  const { bienget } = useGetRealEstate(id);
  const start = range.startDate;
  const end = range.endDate;

  /** Object with 3 attributes and its key */
  const { allCurrentCategories } = useMemo(() => {
    const allCurrentCategoriesInternal : {
      [key: string]: { value: number, percentage: number, label: string }
    } = {};

    if (bienget?.budgetLineDeadlines?.items) {
      bienget?.budgetLineDeadlines?.items.forEach((item) => {
        // years for all existing Eau expenses in whole period
        if (item?.category
            // eslint-disable-next-line no-underscore-dangle
            && !item._deleted
            && item.type === BudgetLineType.Expense
            && DateUtils.parseToDateObj(item.date) >= range.startDate
            && DateUtils.parseToDateObj(item.date) <= range.endDate
        ) {
          /** If any expoense doesnt exist */
          if (allCurrentCategoriesInternal[item?.category] === undefined) {
            /**
             * initial values and then calculate percentage starting from 0
             */
            allCurrentCategoriesInternal[item?.category] = {
              value: item?.amount || 0,
              percentage: 0,
              label: item?.category,
            };
          } else {
            /** else If any expoense exist then we add to allCurrentCategories variable */
            allCurrentCategoriesInternal[item?.category].value += item?.amount || 0;
          }
        }
      });
    }

    const totalExpensesInternal = Object.values(allCurrentCategoriesInternal)
      .reduce((t, { value }) => t + value, 0);

    // percentages
    Object.keys(allCurrentCategoriesInternal).forEach((property) => {
      /** Get only percentage variable number that is coefficient from allCurrentCategories and
       * convert to actual percentage according on total value */
      allCurrentCategoriesInternal[property].percentage = Math
        .round((allCurrentCategoriesInternal[property].value / totalExpensesInternal) * 100);
    });

    return {
      totalExpenses: totalExpensesInternal,
      allCurrentCategories: allCurrentCategoriesInternal,
    };
  }, [bienget.budgetLineDeadlines]);

  // console.log('allCurrentCategories Mon Bien', allCurrentCategories);

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
      }}
    >

      <View style={{ padding: 22 }}>
        <Text category="h1" status="basic" style={{ marginBottom: 20 }}>
          Mes rapports par bien
        </Text>
        <CompteHeader title={bienget?.name} iconUri={bienget?.iconUri} />
      </View>
      {bienget.budgetLineDeadlines?.items?.find((y) => y) ? (
        <>
          <Separator />
          <Card style={{ margin: 22 }}>
            <Graphics data={allCurrentCategories} />
          </Card>
          <Text category="s2" style={{ marginHorizontal: 22, marginVertical: 15 }}>Etat de trésorerie</Text>
          <Card style={{ margin: 22 }}>
            <GraphicsII dateStart={start} dateEnd={end} id={bienget.id} />
          </Card>
        </>
      ) : (
        <View style={{ paddingLeft: 22 }}>
          <Text>Vous n'avez pas des charges </Text>
        </View>
      )}

    </MaxWidthContainer>
  );
};

export default MesRapportBien2;

// const styles = StyleSheet.create({ });
