/**
 * Page d'acceuil
 *
 * @author: Shynggys UMBETOV, Amaury
 */

import React from 'react';
import { Icon as IconUIKitten, Text } from '@ui-kitten/components';
import {
  StyleSheet, TouchableOpacity, View,
} from 'react-native';

import { useLinkTo } from '@react-navigation/native';

// import comptesData from '../../mockData/comptesData';
import MaisonVert from '../../assets/Omedom_Icons_svg/Logement/maison_verte.svg';
import Immeuble from '../../assets/Omedom_Icons_svg/Logement/immeuble.svg';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import MonBienResume from '../../components/MonBienResume';
import { useGetRealEstate, useRealEstateList } from '../../src/API/RealEstate';
import Separator from '../../components/Separator';
import Card from '../../components/Card';
import Button from '../../components/Button';
import ActivityIndicator from '../../components/ActivityIndicator';
import { BudgetLineType } from '../../src/API';

function TableauDeBord() {
  const linkTo = useLinkTo();
  const { loading, data } = useRealEstateList();
  // console.log('data: ', data?.listRealEstates?.items?.map((item) => item?.id));
  // const bienDetail = useGetRealEstate(data?.listRealEstates?.items?.map((item) => item?.id));

  // const [compte, setCompte] = useState(comptesData);

  /**
   *   Summarizing of each expenses and incomes
   */

  const allIncomes = data?.listRealEstates?.items
      && data?.listRealEstates?.items?.filter((item) => {
        if (item?.type === BudgetLineType.Income && !item?._deleted) {
          return item;
        }
        return false;
      }).map((item) => item?.amount);
  // console.log(allIncomes);

  const allExpenses = data?.listRealEstates?.items
      && data?.listRealEstates?.items?.filter((item) => {
        if (item?.type === BudgetLineType.Expense && !item?._deleted) {
          return item;
        }
        return false;
      }).map((item) => item?.amount);

  // const sumAllIncomes = allIncomes?.reduce((a, b) => a + b, 0);
  // const sumAllExpenses = allExpenses?.reduce((a, b) => a + b, 0);

  const allerTresorie = () => {
    linkTo('/ma-tresorerie');
  };
  const allerNotificaitons = () => {
    linkTo('/notifications');
  };

  const onAjoutBien = () => {
    linkTo('/mes-biens/ajouter');
  };

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
              <Text category="h3" status="danger">- 160 €</Text>
              <MaisonVert height={42} width={44} />
            </View>
          </View>

        </Card>
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
                (item) => item && <MonBienResume key={item.id} bien={item} />,
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

        <Card style={{ marginTop: 27 }}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              marginRight: 20,
              flexDirection: 'row',
              backgroundColor: 'transparent',
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

          </TouchableOpacity>
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
