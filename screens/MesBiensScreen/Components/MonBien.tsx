/**
 * Page 1 Mes Biens pour visualiser les biens
 *
 * @author: Shynggys UMBETOV
 */

import React, { useMemo, useState } from 'react';
import { Icon, Text } from '@ui-kitten/components';

import {
  Alert, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { useLinkTo } from '@react-navigation/native';
import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';

import CompteHeader from '../../../components/CompteHeader/CompteHeader';
import GraphicsII from '../../../components/Graphics/GraphicsII';
import Graphics from '../../../components/Graphics/Graphics';

import RotatingIcon from '../../../components/Icon/RotatingIcon';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import { useGetRealEstate, useRentability } from '../../../src/API/RealEstate';
import Card from '../../../components/Card';
import { BankMovementStatus, BudgetLineType } from '../../../src/API';
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
      && (budgetLines.items.find((item) => (item && item.amount < 0)));

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
              label: allPossibleTypes[(item.category as keyof typeof allPossibleTypes)].label,
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
    (item) => (item && item.status === BankMovementStatus.Affected),
  ), [bankMovements]);

  // console.log('allCurrentCategories Mon Bien', allCurrentCategories);

  const allerMesRapports = () => {
    linkTo(`/mes-biens/mes-rapports-biens1/${bienget.id}`);
  };

  const onDetailsBiens = (id: string) => {
    linkTo(`/mes-biens/${id}`);
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
            <Card
              onPress={() => setOpened(!opened)}
              style={{ marginVertical: 15 }}
              withOpacity={false}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flex: 1, flexWrap: 'wrap' }}>
                  <CompteHeader title={bienget?.name} iconUri={bienget?.iconUri} />
                </View>

                <RotatingIcon name="arrow-ios-downward-outline" uikitten state={opened} width={24} height={25} fill="#b5b5b5" />
              </View>

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
                    {dernierMovement ? (
                      <Amount amount={Math.round(dernierMovement?.amount * 100) / 100 || 0} category="h5" />
                    ) : (
                      <Text category="h5" status="primary" style={{ marginRight: 8 }}>0,00 €</Text>
                    )}
                  </View>
                  {opened && (
                  <TouchableOpacity onPress={() => {
                    if (bienget?.bankAccounts?.items
                        && bienget?.bankAccounts?.items?.length > 0) {
                      Alert.alert(
                        'Vous devez lier un compte',
                        'Pour affecter une opération, vous devez lier un compte bancaire.',
                        [{
                          text: 'Annuler',
                          style: 'cancel',
                        },
                        {
                          text: 'Lier',
                          onPress: async () => {
                            linkTo(`/ma-tresorerie/${bienget?.id}/mes-comptes/`);
                          },
                        }],
                      );
                    } else {
                      linkTo(`/ma-tresorerie/${bienget?.id}/mes-comptes/`);
                    }
                  }}
                  >
                    <Text category="c1" status="info">Affecter</Text>
                  </TouchableOpacity>
                  )}
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
                    <Amount amount={(nextexpense || { amount: 0 }).amount} category="h5" />
                  </View>
                  {nextexpense
                  && (
                  <Text category="h6" appearance="hint" style={styles.text}>
                    {allPossibleTypes[nextexpense.category as keyof typeof allPossibleTypes].label}
                  </Text>
                  )}
                  {opened && (
                  <TouchableOpacity onPress={() => linkTo(`/mes-biens/${bienget?.id}/budget`)}>
                    <Text category="c1" status="info">En savoir +</Text>
                  </TouchableOpacity>
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
                    <Percentage amount={rentability} category="h5" status="warning" />
                  </View>

                  {opened && (
                  <TouchableOpacity onPress={allerMesRapports}>
                    <Text category="c1" status="info">Mes rapports</Text>
                  </TouchableOpacity>
                  )}
                </View>

              </View>

              {opened && (
              <>
                <TouchableOpacity onPress={() => onDetailsBiens(biens)} style={styles.button}>
                  <Text category="h6" status="basic">Accéder au bien</Text>
                  <Icon
                    name="chevron-right-outline"
                    fill="#b5b5b5"
                    style={{ height: 18, width: 18, marginRight: 8 }}
                  />
                </TouchableOpacity>
                {Object.keys(allCurrentCategories).length > 0 && (
                <Graphics data={allCurrentCategories} />
                )}
                <GraphicsII
                  dateStart={firstDayCurrentYear}
                  dateEnd={lastDayCurrentYear}
                  id={bienget.id}
                />
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
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
