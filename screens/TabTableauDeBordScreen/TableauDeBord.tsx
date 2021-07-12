/**
 * Page d'acceuil
 *
 * @author: Shynggys UMBETOV, Amaury
 */

import React, { useEffect } from 'react';
import { Text } from '@ui-kitten/components';
import {
  Alert, Platform, StyleSheet, View,
} from 'react-native';

import { useLinkTo } from '@react-navigation/native';

// import comptesData from '../../mockData/comptesData';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import MonBienResume from '../../components/MonBienResume';
import { RealEstateItem, useRealEstateList } from '../../src/API/RealEstate';
import Separator from '../../components/Separator';
import Card from '../../components/Card';
import Button from '../../components/Button';
import ActivityIndicator from '../../components/ActivityIndicator';
import { BankMovementStatus, ModelSortDirection } from '../../src/API';
import { useUser } from '../../src/API/UserContext';
import DateUtils from '../../utils/DateUtils';
import { useNotificationsList } from '../../src/API/Notification';
import NotificationCard from '../../components/NotificationCard';
import { useListBankMovementbyListRealEstate } from '../../src/API/BankMouvement';
import Amount from '../../components/Amount';
import AutoAvatar from '../../components/AutoAvatar';

function TableauDeBord() {
  const linkTo = useLinkTo();
  const { updateUser, user } = useUser();
  const { loading, data } = useRealEstateList('cache-and-network');
  const { loading: loadingNotif, notifications } = useNotificationsList({
    userId: user?.id,
    sortDirection: ModelSortDirection.DESC,
    createdAt: {
      ge: moment().add(-30, 'days').format('YYYY-MM-DDT00:00:00'),
    },
  });

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
    })();
  }, [updateUser, user]);
  useEffect(() => {
    (async () => {
      const hasAskedCreate = await AsyncStorage.getItem('hasAskedCreate');
      // on regarde si on a des biens
      if (!loading && hasAskedCreate !== 'true') {
        if (data?.listRealEstates?.items && data?.listRealEstates?.items.length <= 0) {
          await AsyncStorage.setItem('hasAskedCreate', 'true');
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
  }, [loading, data]);

  /**
   *   On récupère la prochaine dépense
   */
  let minDate: Date|undefined;
  let next: { amount: number|undefined, inconUri: string };
  if (data?.listRealEstates?.items) {
    // on boucle sur tous les real estates
    for (let i = 0; i < data?.listRealEstates.items?.length; i += 1) {
      const currentItem = data?.listRealEstates.items[i];
      if (currentItem?.budgetLines?.items && currentItem.budgetLines.items.length > 0) {
        const itemDate = DateUtils.parseToDateObj(currentItem?.budgetLines?.items[0]?.nextDueDate);
        if (minDate === undefined || minDate > itemDate) {
          minDate = itemDate;
          next = { amount: currentItem?.budgetLines?.items[0]?.amount, inconUri: currentItem.iconUri };
        }
      }
    }
  }

  const dateDebut = new Date();
  const dateFin = new Date();

  const { data: listBankMovement } = useListBankMovementbyListRealEstate(BankMovementStatus.Affected, moment(dateDebut.setMonth(dateDebut.getMonth() - 2)).format('YYYY-MM-DD').toString(), moment(dateFin).format('YYYY-MM-DD').toString());

  let dernierCredit: { amount: number, date: string, iconUri: string } = {};
  let dernierDebit: { amount: number, date: string, iconUri: string } = {};

  if (listBankMovement
      && listBankMovement?.listRealEstates
      && listBankMovement?.listRealEstates.items) {
    for (let i = 0; i < listBankMovement.listRealEstates.items.length; i += 1) {
      const bankMovement = listBankMovement.listRealEstates.items[i];
      if (bankMovement?.negativeMovements?.items) {
        for (let j = 0; j < bankMovement.negativeMovements.items.length; j += 1) {
          const negativeMovement = bankMovement.negativeMovements.items[j];
          if (dernierDebit && dernierDebit.amount === undefined) {
            dernierDebit = {
              amount: negativeMovement.amount,
              date: negativeMovement.date,
              iconUri: bankMovement?.iconUri,
            };
          } else if (dernierDebit && DateUtils.parseToDateObj(dernierDebit.date).getDate() < DateUtils.parseToDateObj(negativeMovement.date).getDate()) {
            dernierCredit = {
              amount: negativeMovement.amount,
              date: negativeMovement.date,
              iconUri: bankMovement.iconUri,
            };
          }
        }
      }
      for (let j = 0; j < bankMovement.positiveMovements.items.length; j += 1) {
        const positiveMovements = bankMovement.positiveMovements.items[j];
        if (dernierCredit && dernierCredit.amount === undefined && positiveMovements) {
          dernierCredit = { amount: positiveMovements.amount, date: positiveMovements.date, iconUri: bankMovement.iconUri };
        } else if (dernierCredit && DateUtils.parseToDateObj(dernierCredit.date).getDate() < DateUtils.parseToDateObj(positiveMovements.date).getDate()) {
          dernierCredit = { amount: positiveMovements.amount, date: positiveMovements.date, iconUri: bankMovement.iconUri };
        }
      }
    }
  }

  console.log('dernierDebit', dernierDebit);
  console.log('dernierCredit', dernierCredit);

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
        {data?.listRealEstates?.items
        && data?.listRealEstates?.items?.length > 0
        && (
        <Card style={{
          flexDirection: 'row',
          marginTop: 27,
        }}
        >

          <View style={styles.oneThirdBlock}>
            <Text category="h6" appearance="hint" style={styles.text}>Dernier crédit</Text>
            <View style={styles.mouvementImage}>
              <Amount category="h3" amount={dernierCredit.amount || 0} />
              <AutoAvatar
                avatarInfo={dernierCredit.iconUri || ''}
                style={{
                  height: 42,
                  width: 44,
                  marginRight: 10,
                  borderRadius: 20,
                  overflow: 'hidden',
                }}
              />
            </View>
          </View>

          <View style={styles.oneThirdBlock}>
            <Text category="h6" appearance="hint" style={styles.text}>Dernier débit</Text>

            <View style={styles.mouvementImage}>
              <Amount category="h3" amount={dernierDebit.amount || 0} />
              <AutoAvatar
                avatarInfo={dernierDebit.iconUri || ''}
                style={{
                  height: 42,
                  width: 44,
                  marginRight: 10,
                  borderRadius: 20,
                  overflow: 'hidden',
                }}
              />
            </View>
          </View>

          <View style={styles.oneThirdBlock}>
            <Text category="h6" appearance="hint" style={styles.text}>
              Prochain mouvement
            </Text>
            <View style={styles.mouvementImage}>
              <Amount category="h3" amount={Math.round(next?.amount * 100) / 100 || 0} />
              <AutoAvatar
                avatarInfo={next?.inconUri || ''}
                style={{
                  height: 42,
                  width: 44,
                  marginRight: 10,
                  borderRadius: 20,
                  overflow: 'hidden',
                }}
              />
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
          : data?.listRealEstates?.items?.map(
            (item) => item && <MonBienResume key={item.id} biens={(item as RealEstateItem)} />,
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

        {loadingNotif
          ? <ActivityIndicator center margin={10} />
          : notifications?.slice(0, 5).map(
            (notification) => notification && (
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
            ),
          )}

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
