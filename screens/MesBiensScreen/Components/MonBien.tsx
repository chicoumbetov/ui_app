/**
 * Page 1 Mes Biens pour visualiser les biens
 *
 * @author: Shynggys UMBETOV
 */

import React, { useMemo, useState } from 'react';
import { Icon, Text } from '@ui-kitten/components';

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useLinkTo } from '@react-navigation/native';
import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';

import _ from 'lodash';
import moment from 'moment';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';
import GraphicsII from '../../../components/Graphics/GraphicsII';
import Graphics from '../../../components/Graphics/Graphics';

import RotatingIcon from '../../../components/Icon/RotatingIcon';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import { useGetRealEstate, useRentability } from '../../../src/API/RealEstate';
import Card from '../../../components/Card';
import { BudgetLineType } from '../../../src/API';
import DateUtils from '../../../utils/DateUtils';
import Amount from '../../../components/Amount';
import ActivityIndicator from '../../../components/ActivityIndicator';
import {
  typeAssurance, typeBanque,
  typeCharge,
  typeDivers,
  typeImpots,
  typeRevenu,
} from '../../../mockData/ajoutRevenuData';
import Percentage from '../../../components/Percentage';

type MonBienProps = { biens: string };

const MonBien = (props: MonBienProps) => {
  // biens = bien.id
  const { biens } = props;
  const { bienget, loading } = useGetRealEstate(biens);

  // const budgetLineDeadLine = useGetBudgetLineDeadLine(bien?.id);
  const linkTo = useLinkTo();

  // const navigation = useNavigation();
  const [opened, setOpened] = useState(false);
  // const theme = useTheme();
  console.log('bienget : ', bienget);

  const { budgetLineDeadlines, budgetLines, bankMovements } = bienget || {};

  /**
   *
   *   Rentabilité
   *
   */
  const rentability = useRentability(
    budgetLineDeadlines?.items,
    (bienget?.purchasePrice || 0) + (bienget?.notaryFee || 0),
  );

  // console.log('renta', rentability);

  /**
   *
   *
   *   GRAPHIC I
   *
   *
   */

  const firstDayCurrentYear = new Date(new Date().getFullYear(), 0, 1);
  const lastDayCurrentYear = new Date(new Date().getFullYear(), 11, 31);

  // budgetLines are already sorted in schema.graphql
  // sortDirection: ASC
  const nextexpense = budgetLines?.items
      && budgetLines?.items.length > 0
      && budgetLines?.items[0]?.amount;

  // make common list of all possible
  // revenues, expeneses categories, types
  // with their keys, labels
  const allPossibleTypes = {};
  _.merge(
    allPossibleTypes,
    typeCharge,
    typeImpots,
    typeRevenu,
    typeAssurance, typeDivers, typeBanque,
  );

  const currentYear = new Date().getFullYear();

  /** Object with 3 attributes and its key */
  const { allCurrentCategories } = useMemo(() => {
    const allCurrentCategoriesInternal : {
      [key: string]: { value: number, percentage: number, label: string }
    } = {};
      /**
     * Get all expenses of current year
     */
    if (budgetLineDeadlines?.items) {
      budgetLineDeadlines?.items.forEach((item) => {
        // years for all existing Eau expenses in whole period
        const allYears = DateUtils.parseToDateObj(item?.date).getFullYear();

        if (item?.category
            && allYears === currentYear
            && item.type === BudgetLineType.Expense) {
          /** If any expoense doesnt exist */
          if (allCurrentCategoriesInternal[item?.category] === undefined) {
            /**
             * initial values and then calculate percentage starting from 0
             */
            allCurrentCategoriesInternal[item?.category] = {
              value: item?.amount || 0,
              percentage: 0,
              label: allPossibleTypes[item.category].label,
            };
          } else {
            /** else If any expense exist then we add to allCurrentCategories variable */
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

    // if we need to use outside of useMemo
    return {
      totalExpenses: totalExpensesInternal,
      allCurrentCategories: allCurrentCategoriesInternal,
    };
  }, [budgetLineDeadlines]);

  // useMemo used if big O notation is expensive. higher than n to the power 2
  const dernierMovement = useMemo(() => bankMovements?.items?.find(
    (item) => (!item?.ignored),
  ), [bankMovements]);

  // console.log('allCurrentCategories Mon Bien', allCurrentCategories);

  /** Redirections */
  const allerTresorerie = () => {
    linkTo('/ma-tresorerie');
  };
  const allerMesRapports = () => {
    linkTo(`/mes-biens/mes-rapports-biens1/${bienget.id}`);
  };

  const onDetailsBiens = (id: string) => {
    linkTo(`/mes-biens/bien/${id}`);
  };

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
      }}
    >

      {loading
        ? <ActivityIndicator />
        : (
          <>
            <Card onPress={() => setOpened(!opened)} style={{ marginVertical: 15 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flex: 1, flexWrap: 'wrap' }}>
                  <CompteHeader title={bienget?.name} iconUri={bienget?.iconUri} />
                </View>

                <RotatingIcon name="arrow-ios-downward-outline" uikitten state={opened} width={24} height={25} fill="#b5b5b5" />
              </View>
              {!opened ? (
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

                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row' }}>
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
                    {dernierMovement ? (
                      <Amount amount={Math.round(dernierMovement?.amount * 100) / 100 || 0} category="h4" />
                    ) : (
                      <Text category="h4" status="primary">0 €</Text>
                    )}

                  </View>

                  {/**
                 *
                 */}

                  <View style={{
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
                    <Amount amount={Math.round((nextexpense || 0) * 100) / 100} category="h4" />
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
                    <Percentage amount={rentability} category="h4" status="warning" />
                  </View>

                </View>
              ) : (
                <>
                  <View style={{
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#b5b5b5',
                    marginVertical: 20,
                  }}
                  />
                  <View style={{
                    flexDirection: 'row',
                  }}
                  >
                    <View style={styles.oneThirdBlock}>
                      <Text category="h6" appearance="hint" style={styles.text}>Dernier mouvement</Text>
                      {dernierMovement ? (
                        <Amount amount={Math.round(dernierMovement?.amount * 100) / 100 || 0} category="h5" />
                      ) : (<Text category="h5" status="primary">0 €</Text>)}

                      <TouchableOpacity onPress={() => {}}>
                        <Text category="h6" status="info">Affecter</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.oneThirdBlock}>
                      <Text category="h6" appearance="hint" style={styles.text}>
                        Prochaine dépense
                      </Text>
                      <Amount amount={Math.round((nextexpense || 0) * 100) / 100} category="h5" />
                      <TouchableOpacity onPress={allerTresorerie}>
                        <Text category="h6" status="info">En savoir +</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.oneThirdBlock}>
                      <Text category="h6" appearance="hint" style={styles.text}>
                        Rentabilité du bien
                      </Text>
                      <Text category="h5" status="warning" style={{ marginVertical: 14 }}>{`${rentability} %`}</Text>
                      <TouchableOpacity onPress={allerMesRapports}>
                        <Text category="h6" status="info">Mes rapports</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <TouchableOpacity onPress={() => onDetailsBiens(biens)} style={styles.button}>
                    <Text category="h6" status="basic">Accéder au bien</Text>
                    <Icon
                      name="chevron-right-outline"
                      fill="#b5b5b5"
                      style={{ height: 18, width: 18, marginRight: 8 }}
                    />
                  </TouchableOpacity>
                  <>
                    {Object.keys(allCurrentCategories).length > 0 && (
                      <Graphics data={allCurrentCategories} />
                    )}
                    <GraphicsII
                      dateStart={firstDayCurrentYear}
                      dateEnd={lastDayCurrentYear}
                      id={bienget.id}
                    />
                  </>
                </>
              )}
            </Card>
          </>
        )}

    </MaxWidthContainer>
  );
};

export default MonBien;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f6f6f6',
    marginTop: 12,
    paddingTop: 38,
    paddingHorizontal: 26,
  },

  // Part I
  oneThirdBlock: {
    flex: 1,
    marginTop: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    width: 94,
    justifyContent: 'center',
    textAlign: 'center',
  },

  // Button ignorer les mouvements
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 30,
    backgroundColor: 'transparent',
  },
});
