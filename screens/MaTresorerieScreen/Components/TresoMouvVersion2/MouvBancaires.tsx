/**
 * Trésorerie et les comptes bancaires
 *
 * @author: Shynggys UMBETOV
 */

import React, { useState } from 'react';
import {
  Button, Layout, Text, useTheme,
} from '@ui-kitten/components';
import {
  FlatList, StyleSheet, TouchableOpacity, View,
} from 'react-native';

import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
import { useNavigation } from '@react-navigation/native';
import CompteHeader from '../../../../components/CompteHeader/CompteHeader';
import MaxWidthContainer from '../../../../components/MaxWidthContainer';

import comptesData from '../../../../mockData/comptesData';
import mouvementData from '../../../../mockData/mouvementData';

const MouvBancaires = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [compte] = useState(comptesData);

  const onIgnorerMouvement = () => {
    navigation.navigate('ignorer-mouvement');
  };

  const onEditMouvement = () => {
    navigation.navigate('edit-mouvement');
  };

  /**
   if we want to sort mouvements then
    upload data such way // data={grouped.get('En attente')}
   */
  function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }
  const grouped = groupBy(mouvementData, (mouvement) => mouvement.typeMouvement);

  return (
    <MaxWidthContainer outerViewProps={{
      style: {
        backgroundColor: '#efefef',
      },
    }}
    >
      <Layout style={styles.container}>
        <Text
          category="h1"
          status="basic"
          style={{ marginVertical: 20 }}
        >
          Ma Trésorerie
        </Text>

        <CompteHeader />

        <View style={{ marginVertical: 20, alignItems: 'center' }}>
          <Text category="h6" status="basic">Monsieur Dupont Matthieu</Text>
          <Text category="h6" appearance="hint">FR76**************583</Text>
          <Text category="h6" status="basic">Société Générale</Text>
        </View>

        <Text
          category="h2"
          style={{
            marginVertical: 20, paddingTop: 30, borderTopWidth: 1, borderTopColor: '#b5b5b5',
          }}
        >
          Mouvements Bancaires
        </Text>
        <Text category="h6" appearance="hint">
          Vous pouvez affecter ou ignorer les mouvements bancaires liés à ce compte bancaire.
        </Text>

        <Button
          size="large"
          onPress={() => {}}
          appearance="outline"
          status="danger"
          style={{ marginVertical: 20 }}
        >
          Ignorer des mouvements
        </Button>

        <TouchableOpacity
          onPress={() => onIgnorerMouvement()}
          style={[
            styles.window,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: theme['color-basic-100'],
            },
          ]}
        >
          <Text category="h6" status="basic">Mouvements ignorés</Text>
          <IconUIKitten
            name="arrow-ios-forward"
            fill="#000"
            style={{
              height: 20, width: 20, alignItems: 'center',
            }}
          />
        </TouchableOpacity>

        <FlatList
          // data={grouped.get('En attente')}
          data={mouvementData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (

            <TouchableOpacity
              onPress={() => onEditMouvement()}
              style={[
                styles.window,
                { backgroundColor: theme['color-basic-100'] },
              ]}
            >
              <View style={{
                flex: 1,
              }}
              >

                <Text
                  style={{
                    justifyContent: 'center',
                  }}
                  category="h5"
                  status={item.valeur.substring(0, 1) === '-' ? ('danger') : ('success')}
                >
                  {item.valeur}
                </Text>
                <Text
                  style={{ justifyContent: 'center' }}
                  category="h6"
                  status={item.typeMouvement === 'Validé' ? ('success') : ('warning')}
                >
                  {item.typeMouvement}
                </Text>

              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  paddingLeft: 10,
                }}
              >
                <Text category="h6" status="basic">{item.date}</Text>
                <Text category="p1" appearance="hint">Libellé du mouvement</Text>

              </View>

            </TouchableOpacity>

          )}
        />

      </Layout>

    </MaxWidthContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
    paddingVertical: 25,
    marginBottom: 12,
    paddingHorizontal: 26,
  },
  window: {
    flexDirection: 'row',
    marginTop: 30,
    paddingTop: 31,
    paddingBottom: 28,
    paddingHorizontal: 37,
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
  footer: {
    paddingTop: 5,
    backgroundColor: 'transparent',
    paddingBottom: 32,
    borderBottomWidth: 0.5,
    borderBottomColor: '#b5b5b5',
  },
});

export default MouvBancaires;
