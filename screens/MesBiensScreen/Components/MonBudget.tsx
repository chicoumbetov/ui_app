/**
 * Page 2 Mes Biens - DetailsBiens
 *
 * @author: Shynggys UMBETOV
 */

import React from 'react';
import {
  Layout, Text, Icon as IconUIKitten, useTheme,
} from '@ui-kitten/components';
import {
  FlatList, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { useLinkTo, useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import MaxWidthContainer from '../../../components/MaxWidthContainer';

import Icon from '../../../components/Icon';

// import comptesData from '../../../mockData/comptesData';

import { TabMesBiensParamList } from '../../../types';
import { useGetRealEstate } from '../../../src/API/RealEstate';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';

import MonBudgetCard from './MonBudgetCard';
import { BudgetLine, BudgetLineType } from '../../../src/API';
import Separator from '../../../components/Separator';
import AjoutChargeCard from './AjoutChargeCard';

function MonBudget() {
  const navigation = useNavigation();
  const theme = useTheme();
  const linkTo = useLinkTo();
  const route = useRoute<RouteProp<TabMesBiensParamList, 'mon-budget'>>();
  // console.log('mon-budget data', route.params);
  const { bien } = useGetRealEstate(route.params.id);
  // console.log('data mon-budget: ', data?.getRealEstate);

  const allerTresorerie = () => {
    linkTo('/ma-tresorerie');
  };

  const allerAjoutRevenu = () => {
    navigation.navigate('ajout-revenu', { id: route.params.id });
  };

  const allerAjoutCharge = () => {
    navigation.navigate('ajout-charge', { id: route.params.id });
  };

  // console.log('mon budget :', bien);
  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
      }}
    >

      {/**
      *  I. Mon Budget
      */}
      <View style={styles.container}>
        <Text category="h1" style={{ marginVertical: 20 }}>
          Mon Budget
        </Text>
        <CompteHeader title={bien.name} />
      </View>

      <Separator />

      {/**
      *     Revenus
      */}
      <View style={styles.container}>

        <View style={{
          flexDirection: 'row', alignItems: 'center', marginBottom: 10,
        }}
        >
          <IconUIKitten
            name="arrow-upward-outline"
            fill={theme['color-success-400']}
            style={{
              height: 20, width: 20, marginRight: 5,
            }}
          />
          <Text category="h2" status="success">
            Revenus
          </Text>
        </View>
        {/**
         <FlatList<RealEstateItem>
         data={bien?.budgetLines?.items}
         renderItem={({ item }) => <MonBudgetCard budget={item} />}
         keyExtractor={(item) => item.id}
         />
        */}
        <FlatList<BudgetLine | null>
          data={bien?.budgetLines?.items.filter((item) => {
            if (item?.type === BudgetLineType.Income && !item?._deleted) {
              return item;
            }
            return false;
          })}
          renderItem={({ item }) => item && <MonBudgetCard budget={item} />}
          keyExtractor={(item) => item?.id}
        />

        <Layout style={styles.button}>
          <TouchableOpacity onPress={allerAjoutRevenu}>
            <Layout style={styles.button}>
              <Text category="h6" status="info" style={styles.buttonTextLeft}>Ajouter un revenu</Text>
            </Layout>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Layout style={styles.button}>
              <Text category="h6" status="basic">Supprimer un revenu</Text>
            </Layout>
          </TouchableOpacity>
        </Layout>

      </View>

      <Separator />

      {/**
       *     Charges
       */}
      <Layout style={styles.container}>

        <Layout style={{
          backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center', marginBottom: 10,
        }}
        >
          <IconUIKitten
            name="arrow-downward-outline"
            fill={theme['color-danger-500']}
            style={{
              height: 20, width: 20, marginRight: 5,
            }}
          />
          <Text category="h2" status="danger">
            Charges
          </Text>
        </Layout>

        <FlatList<BudgetLine | null>
          data={bien?.budgetLines?.items}
          renderItem={({ item }) => item && <AjoutChargeCard budget={item} />}
          keyExtractor={(item) => item?.id}
        />

        <View style={styles.button}>
          <TouchableOpacity onPress={allerAjoutCharge}>
            <View style={styles.button}>
              <Text category="h6" status="info" style={{ marginLeft: 6 }}>Ajouter une charge</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.button}>
              <Text category="h6" status="basic">Supprimer une charge</Text>
            </View>
          </TouchableOpacity>
        </View>

      </Layout>

      <Separator />

      {/**
      *       Aller Tresorerie
      */}
      <Layout style={styles.container}>

        <Text category="h6" status="info" style={{ marginBottom: 20 }}>
          Consulter la trésorerie pour affecter les mouvements bancaires
        </Text>
        {/**   1   */}
        <Layout style={[styles.docs, { marginBottom: 10, justifyContent: 'center' }]}>

          <TouchableOpacity
            onPress={allerTresorerie}
            style={{
              flexDirection: 'row', alignItems: 'center',
            }}
          >
            <Icon name="money" size={30} color={theme['color-success-400']} style={{ marginRight: 10 }} />
            <Text category="h6" status="basic">
              Ma Trésorerie
            </Text>

          </TouchableOpacity>

        </Layout>
      </Layout>

    </MaxWidthContainer>
  );
}

export default MonBudget;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    paddingHorizontal: 26,
  },
  window: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 37,
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

  // III part
  // Aide Declaration Impots
  docs: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 1,

    backgroundColor: '#fff',
    fontWeight: 'normal',
    borderColor: 'transparent',
    shadowColor: '#dedede',
  },

  // Footer
  button: {
    flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', backgroundColor: 'transparent',
  },
  buttonTextLeft: {
    marginLeft: 6,
  },
});
