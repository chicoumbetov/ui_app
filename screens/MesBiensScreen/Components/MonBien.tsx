/**
 * Page 1 Mes Biens pour visualiser les biens
 *
 * @author: Shynggys UMBETOV
 */

import React, { useState } from 'react';
import { Icon, Text } from '@ui-kitten/components';

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useLinkTo } from '@react-navigation/native';
import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';

import CompteHeader from '../../../components/CompteHeader/CompteHeader';
import GraphicsII from '../../../components/Graphics/GraphicsII';
import Graphics from '../../../components/Graphics/Graphics';

import RotatingIcon from '../../../components/Icon/RotatingIcon';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import { useGetRealEstate } from '../../../src/API/RealEstate';
import Card from '../../../components/Card';
import { BudgetLineType } from '../../../src/API';
import DateUtils from '../../../utils/DateUtils';
import Amount from '../../../components/Amount';
import ActivityIndicator from '../../../components/ActivityIndicator';

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
  // console.log('bienget : ', bienget);

  /**
   *   Rentabilité
   *
   *   Exemple de calcul de rendement brut
   Pour un achat de 100 000 euros par exemple avec un futur loyer de 700 euros :
   700 x 12 = 8 400 euros x 100/100 00 euros = 8,4%.

   *  (Montant du loyer x 12 mois) x 100 - (les charges locatives)/par le prix d'achat
   *
   *  Vous devrez ensuite faire la somme de toutes les charges du bien.
   *  Par exemple : 900 euros de charges de copropriété annuelles non-récupérables,
   *  700 euros de taxe foncière,
   *  300 euros de réparations locatives et
   *  100 euros d'assurance loyer impayé. soit 2000 euros.
   *
   *  Soit : 8 400 - 2 000 x 100/ 100 000 = 6,4%.
   */

  /**
   *   Summarizing of each expenses and incomes
   */
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const allDataNextExpense = bienget?.budgetLineDeadlines?.items
  && bienget?.budgetLineDeadlines?.items?.map((item) => {
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

  /** Object with 3 attributes and its key */
  const allCurrentCategories: {
    [key: string]: { value: number, percentage: number, label: string }
  } = {};

  /**
   * Get all expenses of current year
   */
  if (bienget?.budgetLineDeadlines?.items) {
    bienget?.budgetLineDeadlines?.items.forEach((item) => {
      // years for all existing Eau expenses in whole period
      const allYears = DateUtils.parseToDateObj(item?.date).getFullYear();
      if (item?.category
          && allYears === currentYear
          && item.type === BudgetLineType.Expense) {
        /** If any expoense doesnt exist */
        if (allCurrentCategories[item?.category] === undefined) {
          /**
           * initial values and then calculate percentage starting from 0
           */
          allCurrentCategories[item?.category] = {
            value: item?.amount || 0,
            percentage: 0,
            label: item?.category,
          };
        } else {
          /** else If any expoense exist then we add to allCurrentCategories variable */
          allCurrentCategories[item?.category].value += item?.amount || 0;
        }
      }
    });
  }

  const totalExpenses = Object.values(allCurrentCategories).reduce((t, { value }) => t + value, 0);

  // percentages
  Object.keys(allCurrentCategories).forEach((property) => {
    /** Get only percentage variable number that is coefficient from allCurrentCategories and
     * convert to actual percentage according on total value */
    allCurrentCategories[property].percentage = Math
      .round((allCurrentCategories[property].value / totalExpenses) * 100);
  });

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

  const dernierMovement = bienget?.bankMovements?.items?.map(
    (item) => { if (item?.ignored) { return false; } return item; },
  );
  // console.log('last Movement', bienget?.bankMovements);
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
                      <Amount amount={dernierMovement[0]?.amount || 0} category="h4" />
                    ) : (
                      <Amount amount={0} category="h4" />
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
                    <Text category="h4" status="danger">
                      {`${(nextexpense) || '0'} €`}
                    </Text>
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
                    <Text category="h4" status="warning">60 %</Text>
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
                        <Amount amount={dernierMovement[0]?.amount || 0} category="h4" />
                      ) : (<></>)}

                      <TouchableOpacity onPress={() => {}}>
                        <Text category="h6" status="info">Affecter</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.oneThirdBlock}>
                      <Text category="h6" appearance="hint" style={styles.text}>
                        Prochaine dépense
                      </Text>
                      <Text category="h4" status="danger">
                        {`${(nextexpense) || '0'} €`}
                      </Text>
                      <TouchableOpacity onPress={allerTresorerie}>
                        <Text category="h6" status="info">En savoir +</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.oneThirdBlock}>
                      <Text category="h6" appearance="hint" style={styles.text}>
                        Réntabilité du bien
                      </Text>
                      <Text category="h4" status="warning" style={{ marginVertical: 14 }}>60 %</Text>
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
                  <Graphics data={allCurrentCategories} />
                  <GraphicsII />
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
  containerBiens: {
    backgroundColor: '#f6f6f6',
    marginTop: 12,
    paddingTop: 38,
    paddingHorizontal: 23,
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
