/**
 * Page 1 Mes Biens pour visualiser les biens
 *
 * @author: Shynggys UMBETOV
 */

import React, { useEffect, useState } from 'react';
import {
  Text, Icon, useTheme,
} from '@ui-kitten/components';

import {
  StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { useLinkTo, useNavigation } from '@react-navigation/native';
import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';
import GraphicsII from '../../../components/Graphics/GraphicsII';
import Graphics from '../../../components/Graphics/Graphics';

import RotatingIcon from '../../../components/Icon/RotatingIcon';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import { RealEstateItem, useGetRealEstate } from '../../../src/API/RealEstate';
import Card from '../../../components/Card';
import { BudgetLineType } from '../../../src/API';

const mesBiensData = [
  { x: '35%', y: 35 },
  { x: '15%', y: 15 },
  { x: '15%', y: 15 },
  { x: '35%', y: 35 },
];

type MesBiensDataProps = { x: number, y: number | undefined };

type MonBienProps = { bien: RealEstateItem };

const MonBien = (props: MonBienProps) => {
  const { bien } = props;
  const bienDetail = useGetRealEstate(bien?.id);
  const linkTo = useLinkTo();

  const navigation = useNavigation();
  const [opened, setOpened] = useState(false);
  const theme = useTheme();

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
  // let rentability;
  /**
   *   Summarizing of each expenses and incomes
   */
  const allIncomes = bienDetail?.bien?.budgetLines?.items
  && bienDetail?.bien?.budgetLines?.items?.filter((item) => {
    if (item?.type === BudgetLineType.Income && !item?._deleted) {
      return item;
    }
    return false;
  }).map((item) => item?.amount);

  const allExpenses = bienDetail?.bien?.budgetLines?.items
      && bienDetail?.bien?.budgetLines?.items?.filter((item) => {
        if (item?.type === BudgetLineType.Expense && !item?._deleted) {
          return item;
        }
        return false;
      }).map((item) => item?.amount);

  const sumAllIncomes = allIncomes?.reduce((a, b) => a + b, 0);
  const sumAllExpenses = allExpenses?.reduce((a, b) => a + b, 0);

  /**
   *   Summarizing of each expense categories to send to graph
   *   water
   *   electricity
   *   assurances
   *   Frais Divers
   *
   */

  /** get all the water expenses */
  const eau = bienDetail.bien?.budgetLines?.items
      && bienDetail.bien?.budgetLines?.items.filter((item) => {
        if (item?.category === 'Eau' && !item?._deleted) {
          return item;
        }
        return false;
      }).map((item) => item?.amount);

  /** get all the electricity expenses */
  const electricity = bienDetail.bien?.budgetLines?.items
      && bienDetail.bien?.budgetLines?.items.filter((item) => {
        if (item?.category === 'Electricité' && !item?._deleted) {
          return item;
        }
        return false;
      }).map((item) => item?.amount);

  /** get all the insurance expenses */
  const insurance = bienDetail.bien?.budgetLines?.items
      && bienDetail.bien?.budgetLines?.items.filter((item) => {
        if (
          (item?.category === 'Assurance du bien'
            || item?.category === 'Vacances locatives'
            || item?.category === 'Loyer impayé') && !item?._deleted
        ) {
          return item;
        }
        return false;
      }).map((item) => item?.amount);
  console.log('insurance: ', insurance);

  /** get all the Frais Divers expenses */
  const fraisDivers = bienDetail.bien?.budgetLines?.items
      && bienDetail.bien?.budgetLines?.items.filter((item) => {
        if (item?.category === 'Frais divers' && !item?._deleted) {
          return item;
        }
        return false;
      }).map((item) => item?.amount);

  const sumWaterExpenses = eau?.reduce((a, b) => a + b, 0);
  const sumElectricityExpenses = electricity?.reduce((a, b) => a + b, 0);
  const sumInsuranceExpenses = insurance?.reduce((a, b) => a + b, 0);
  const sumFraisDiversExpenses = fraisDivers?.reduce((a, b) => a + b, 0);

  console.log('NEXT HOUSE');
  console.log('water: ', sumWaterExpenses);
  console.log('elec: ', sumElectricityExpenses);
  console.log('insurance: ', sumInsuranceExpenses);
  console.log('Frais Divers: ', sumFraisDiversExpenses);

  /** % of each category of expense */
  const pourcentageWater = sumWaterExpenses * 100 / sumAllExpenses;
  const pourcentageElec = sumElectricityExpenses * 100 / sumAllExpenses;
  const pourcentageInsurance = sumInsuranceExpenses * 100 / sumAllExpenses;
  const pourcentageFraisDivers = sumFraisDiversExpenses * 100 / sumAllExpenses;
  console.log('pourcentageWater', pourcentageWater, pourcentageElec, pourcentageInsurance, pourcentageFraisDivers);

  /** Data to pass to graph */
  // you can also pass an i- value, but that's up to you
  const amountData: MesBiensDataProps[] | undefined = bienDetail.bien?.budgetLines?.items?.map(
    (val, index) => ({ x: index, y: val?.amount }),
  );

  /** Redirections */
  const allerTresorerie = () => {
    linkTo('/ma-tresorerie');
  };
  const allerMesRapports = () => {
    navigation.navigate('mes-rapports-biens1');
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

      <Card onPress={() => setOpened(!opened)} style={{ marginVertical: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, flexWrap: 'wrap' }}>
            <CompteHeader title={bien?.name} />
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
              <Text category="h4" status="success">{`+ ${sumAllIncomes} €`}</Text>
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
              <Text category="h4" status="danger">{` ${sumAllExpenses} €`}</Text>
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
              borderBottomWidth: 1, marginVertical: 20, borderBottomColor: theme['text-hint-color'],
            }}
            />
            <View style={{
              flexDirection: 'row',
            }}
            >
              <View style={styles.oneThirdBlock}>
                <Text category="h6" appearance="hint" style={styles.text}>Dernier mouvement</Text>
                <Text category="h4" status="success" style={{ marginVertical: 14 }}>+ 500 €</Text>
                <TouchableOpacity onPress={() => {}}>
                  <Text category="h6" status="info">Affecter</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.oneThirdBlock}>
                <Text category="h6" appearance="hint" style={styles.text}>
                  Prochaine dépense
                </Text>
                <Text category="h4" status="danger">- 160 €</Text>
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

            <TouchableOpacity onPress={() => onDetailsBiens(bien.id)} style={styles.button}>
              <Text category="h6" status="basic">Accéder au bien</Text>
              <Icon
                name="chevron-right-outline"
                fill="#b5b5b5"
                style={{ height: 18, width: 18, marginRight: 8 }}
              />
            </TouchableOpacity>
            <Graphics data={amountData} />
            <GraphicsII />
          </>
        )}
      </Card>

    </MaxWidthContainer>
  );
};

export default MonBien;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
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
