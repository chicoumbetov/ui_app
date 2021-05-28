/**
 * Trésorerie et les comptes bancaires
 *
 * @author: Shynggys UMBETOV
 */

import React, { useState } from 'react';
import { Text } from '@ui-kitten/components';
import {
  StyleSheet, TouchableOpacity, View,
} from 'react-native';

import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
import { useNavigation, useRoute } from '@react-navigation/native';

import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import comptesData from '../../mockData/comptesData';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import CompteHeader from '../../components/CompteHeader/CompteHeader';
import { useRealEstateList } from '../../src/API/RealEstate';
import ActivityIndicator from '../../components/ActivityIndicator';
import Separator from '../../components/Separator';
import Card from '../../components/Card';
import { TabMaTresorerieParamList } from '../../types';

const MaTresorerie = () => {
  // const [client] = useState(comptesData);
  const { loading, data } = useRealEstateList();
  const navigation = useNavigation();
  // const route = useRoute<RouteProp<TabMaTresorerieParamList, 'ma-tresorerie'>>();

  const onMaTresorerie2 = () => {
    navigation.navigate('ma-tresorerie-2');
  };

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
      }}
    >
      <View style={styles.container}>
        <Text
          category="h1"
          status="basic"
          style={{ marginVertical: 20 }}
        >
          Ma Trésorerie
        </Text>

        <Text category="h2" status="basic">
          Derniers mouvements
        </Text>

        <Card style={styles.window}>
          <View style={{
            flex: 1,
            borderRightWidth: 1,
            borderRightColor: '#b5b5b5',
          }}
          >
            <Text category="h6" appearance="hint">Dernier crédit</Text>
            <View style={{ marginLeft: 20 }}>
              <Text
                category="h4"
                status="success"
                style={{
                  marginTop: 14,
                  justifyContent: 'center',
                }}
              >
                + 500 €
              </Text>
            </View>
          </View>

          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          >
            <Text category="h6" appearance="hint" style={{ marginLeft: 32 }}>Dernier débit</Text>
            <Text
              category="h4"
              status="danger"
              style={{
                marginLeft: 35,
              }}
            >
              - 80 €
            </Text>
          </View>

        </Card>

      </View>

      <Separator />
      <View style={styles.container}>
        <Text category="h2">
          Consulter votre trésorerie
        </Text>
        <Text category="h6" appearance="hint" style={{ marginTop: 15 }}>Sélectionner le bien</Text>

        {loading
          ? <ActivityIndicator />
          : (
            <>
              {data?.listRealEstates?.items?.map(
                (item) => item && (
                <Card
                  key={item.id}
                  style={{
                    flexDirection: 'column', marginTop: 28, padding: 17, borderRadius: 10,
                  }}
                >
                  {/**
                         <MonBienResume title={item.title} id={item.id} />
                         */}
                  <TouchableOpacity
                    onPress={() => {
                      onMaTresorerie2();
                    }}
                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <CompteHeader title={item.name} />
                    <IconUIKitten
                      name="arrow-ios-forward"
                      fill="#b5b5b5"
                      style={{
                        height: 16, width: 16, marginRight: 5, marginTop: 8,
                      }}
                    />
                  </TouchableOpacity>
                </Card>
                ),
              )}
            </>
          )}
        {/**
        <FlatList<RealEstateItem>
          data={data?.listRealEstates?.items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{
              flexDirection: 'column', marginTop: 28, padding: 17, borderRadius: 10,
            }}
            >
              <TouchableOpacity
                onPress={() => {
                  onMaTresorerie2();
                }}
                style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between' }}
              >
                <CompteHeader title={item.name} />
                <IconUIKitten
                  name="arrow-ios-forward"
                  fill="#b5b5b5"
                  style={{
                    height: 16, width: 16, marginRight: 5, marginTop: 8,
                  }}
                />
              </TouchableOpacity>
            </View>

          )}
        />
      */}
      </View>

    </MaxWidthContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f6f6f6',
    paddingVertical: 25,
    marginBottom: 12,
    paddingHorizontal: 26,
  },
  window: {
    flexDirection: 'row',
    marginTop: 30,
    // paddingTop: 31,
    // paddingBottom: 28,
    // paddingHorizontal: 37,
    // borderRadius: 10,
    // borderColor: 'transparent',
    // shadowColor: '#dedede',
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 0.5,
    // shadowOpacity: 1,
  },
});

export default MaTresorerie;
