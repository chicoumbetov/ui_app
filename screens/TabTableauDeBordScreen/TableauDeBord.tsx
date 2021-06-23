/**
 * Page d'acceuil
 *
 * @author: Shynggys UMBETOV, Amaury
 */

import React, { useEffect } from 'react';
import { Icon as IconUIKitten, Text } from '@ui-kitten/components';
import {
  Alert,
  Platform,
  StyleSheet, View,
} from 'react-native';

import { useLinkTo } from '@react-navigation/native';

// import comptesData from '../../mockData/comptesData';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import MaisonVert from '../../assets/Omedom_Icons_svg/Logement/maison_verte.svg';
import Immeuble from '../../assets/Omedom_Icons_svg/Logement/immeuble.svg';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import MonBienResume from '../../components/MonBienResume';
import { useRealEstateList } from '../../src/API/RealEstate';
import Separator from '../../components/Separator';
import Card from '../../components/Card';
import Button from '../../components/Button';
import ActivityIndicator from '../../components/ActivityIndicator';
import { BudgetLineType } from '../../src/API';
import { useUser } from '../../src/API/UserContext';
import DateUtils from '../../utils/DateUtils';

function TableauDeBord() {
  const linkTo = useLinkTo();
  const { loading, data } = useRealEstateList();
  const { updateUser, user } = useUser();
  const biensDetails = useRealEstateList();
  // console.log('biensDetails', biensDetails);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web' && Constants.isDevice && updateUser && user) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus === 'granted') {
          const token = (await Notifications.getExpoPushTokenAsync()).data;
          const newTokens = user?.expoToken || [];
          // console.log('newTokens', newTokens);
          if (newTokens.indexOf(token) <= -1) {
            newTokens.push(token);
            updateUser({
              expoToken: newTokens,
            });
          }
        }
      }
      // on regarde si on a des biens
      if (!loading) {
        if (data?.listRealEstates?.items && data?.listRealEstates?.items.length <= 0) {
          Alert.alert(
            'Bienvenue',
            'Votre compte est désormais crée, vous pouvez désormais ajouter votre premier bien !',
            [
              { text: 'Ignorer', style: 'cancel' },
              { text: 'Ajouter un bien', onPress: () => linkTo('/mes-biens/ajouter') },
            ],
            { cancelable: true },
          );
        }
      }
    })();
  }, [updateUser, user, loading, data]);

  /**
   *   Summarizing of each expenses and incomes
   */
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const fullSortExpense = biensDetails.data?.listRealEstates?.items?.map(
    (item) => item && {
      ...item,
      totalExpense: item?.budgetLineDeadlines?.items
      && item?.budgetLineDeadlines?.items.find((x) => {
        const allYears = DateUtils.parseToDateObj(x?.date).getFullYear();
        const allMonths = DateUtils.parseToDateObj(x?.date).getMonth();

        if (x?.type === BudgetLineType.Expense
            // eslint-disable-next-line no-underscore-dangle
            && !x?._deleted
            && allYears === currentYear
            && allMonths === currentMonth + 1
        ) {
          // console.log('xxxxxx', x.amount);
          return x.amount;
        }
        return false;
      }),
    },
  );
  // console.log('fullSortExpense2', fullSortExpense);

  /** Object with 3 attributes and its key */
  const allCurrentCategories: {
    [key: string]: { value: number, date: string }
  } = {};

  if (fullSortExpense) {
    fullSortExpense.forEach((item) => {
      // console.log('maison', item);
      if (item && item.totalExpense?.date) {
        allCurrentCategories[item.name] = {
          value: item.totalExpense?.amount || 0,
          date: item.totalExpense?.date,
        };
      }
    });
  }
  // console.log('allCurrentCategories', Object.values(allCurrentCategories));

  const today = new Date();
  const values = Object.values(allCurrentCategories);
  const closest = values.length > 0 && values
    .reduce((a, b) => (a.date - today.getTime() < b.date - today.getTime() ? a : b));
  const next = (closest || { value: 0 }).value;
  // console.log('closest', closest.value);

  const allerTresorie = () => {
    linkTo('/ma-tresorerie');
  };
  const allerNotificaitons = () => {
    linkTo('/notifications');
  };

  const onAjoutBien = () => {
    linkTo('/mes-biens/ajouter');
  };

  // console.log(biensDetails);
  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
      }}
    >
      <Separator />
      {/**
       *  Trésorerie section
       */}
      <View style={styles.container}>
        <Text category="h1">
          Trésorerie
        </Text>
        {biensDetails.data?.listRealEstates?.items?.length > 0 && (
        <Card style={{
          flexDirection: 'row',
          marginTop: 27,
        }}
        >

          <View style={styles.oneThirdBlock}>
            <Text category="h6" appearance="hint" style={styles.text}>Dernier crédit</Text>

            <View style={styles.mouvementImage}>
              <Text category="h3" status="success">+ 500 €</Text>
              <MaisonVert height={42} width={44} />
            </View>
          </View>

          <View style={styles.oneThirdBlock}>
            <Text category="h6" appearance="hint" style={styles.text}>Dernier débit</Text>

            <View style={styles.mouvementImage}>
              <Text category="h3" status="danger">- 80 €</Text>
              <Immeuble height={42} width={44} />
            </View>
          </View>

          <View style={styles.oneThirdBlock}>
            <Text category="h6" appearance="hint" style={styles.text}>
              Prochain mouvement
            </Text>

            <View style={styles.mouvementImage}>
              <Text category="h3" status="danger">{`${next || '0'} €`}</Text>
              <MaisonVert height={42} width={44} />
            </View>
          </View>

        </Card>
        )}
        <Text
          category="h5"
          status="info"
          style={{ marginVertical: 20 }}
          onPress={allerTresorie}
        >
          Accéder à la trésorerie
        </Text>
      </View>
      <Separator />

      {/**
      *  Mes Biens section
      */}
      <View style={styles.containerBiens}>
        <Text category="h1">
          Mes Biens
        </Text>
        {/**
        {
          comptesData.map((item) => <MonBienResume title={item.title} id={item.id} key={item.id} />)
        }
        */}
        {loading
          ? <ActivityIndicator />
          : (
            <>
              {data?.listRealEstates?.items?.map(
                (item) => item && <MonBienResume key={item.id} biens={item} />,
              )}
            </>
          )}
        <Button
          size="large"
          onPress={() => { onAjoutBien(); }}
          style={{ marginVertical: 25 }}
        >
          Ajouter un nouveau bien
        </Button>
      </View>
      <Separator />
      {/**
       *  Notification
       */}
      <View style={styles.container}>
        <Text category="h1" style={{ marginTop: -5 }}>
          Notifications
        </Text>

        <Card
          onPress={() => {}}
          style={{
            marginTop: 27,
            marginRight: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginRight: 18 }}>
              <MaisonVert height={42} width={44} />
            </View>
            <Text
              category="h6"
              status="basic"
              style={{ flex: 1 }}
            >
              Un mouvement négatif a été détécté
            </Text>
          </View>
          <IconUIKitten
            name="arrow-ios-forward"
            fill="#b5b5b5"
            style={{
              height: 20, width: 20, marginRight: 5, alignItems: 'center',
            }}
          />
        </Card>

        <Text
          category="h5"
          status="info"
          style={{ marginTop: 21, marginBottom: 35 }}
          onPress={allerNotificaitons}
        >
          Consulter les notifications
        </Text>
      </View>
    </MaxWidthContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 38,
    paddingHorizontal: 26,
  },
  containerBiens: {
    paddingTop: 38,
    paddingHorizontal: 23,
  },
  oneThirdBlock: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    width: 94,
    justifyContent: 'center',
    textAlign: 'center',
  },
  mouvementImage: {
    marginRight: 3,
    marginTop: 15,
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default TableauDeBord;
