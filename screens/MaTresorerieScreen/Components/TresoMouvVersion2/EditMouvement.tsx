import {
  Button, Card, CheckBox, Layout, Text, useTheme,
} from '@ui-kitten/components';
import {
  FlatList, ScrollView, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
import React from 'react';

import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import mouvementData from '../../../../mockData/mouvementData';
import Icon from '../../../../components/Icon';
import { TabMaTresorerieParamList } from '../../../../types';
import { useGetRealEstate } from '../../../../src/API/RealEstate';

const EditMouvement = () => {
  const theme = useTheme();
  const [checked, setChecked] = React.useState(false);

  // const route = useRoute<RouteProp<TabMaTresorerieParamList, 'mouv-bancaires'>>();
  // const { bien } = useGetRealEstate(route.params.id);

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
    <View style={styles.container}>

      <View style={{ marginVertical: 20, alignItems: 'center' }}>
        <Text category="h2" status="success">+500 €</Text>
        <Text category="h6" status="basic">10/03/2021</Text>
        <Text category="h6" appearance="hint">Libéllé du mouvement</Text>
      </View>
      <ScrollView
        style={{ borderTopWidth: 1, borderTopColor: '#b5b5b5' }}
      >
        <Text
          category="h3"
          style={{
            marginTop: 20, paddingTop: 30,
          }}
        >
          Affecter le mouvement
        </Text>
        <Text category="p1" style={{ marginVertical: 10 }}>
          Revenus enregistés dans votre budget
        </Text>
        <Text category="p1" appearance="hint">
          Sélectionner le revenu correspondant
        </Text>

        {mouvementData.map((item) => (
          <Card
            key={item.id}
            style={{ marginVertical: 15 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CheckBox
                checked={checked}
                onChange={(nextChecked) => setChecked(nextChecked)}
                style={{ marginRight: 15 }}
              />
              <View style={{
                flex: 1,
                borderRightWidth: 1,
                borderRightColor: '#b5b5b5',
              }}
              >

                <Text
                  style={{ marginBottom: 15 }}
                  category="h6"
                  status={item.typeMouvement === 'Validé' ? ('success') : ('warning')}
                >
                  {item.typeMouvement}
                </Text>
                <Text
                      // style={{ justifyContent: 'center' }}
                  category="h5"
                  status={item.valeur.substring(0, 1) === '-' ? ('danger') : ('success')}
                >
                  {item.valeur}
                </Text>

              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'column',
                  // justifyContent: 'space-evenly',
                  paddingLeft: 10,
                }}
              >
                <Text category="p1" appearance="basic">Mensuel</Text>
                <Text category="p1" appearance="hint">Echéance</Text>
                <Text category="h6" status="basic">{item.date}</Text>

              </View>
            </View>
            <View style={{
              backgroundColor: '#efefef',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 25,
              borderBottomStartRadius: 10,
              borderBottomEndRadius: 10,
            }}
            >
              <Text category="h6" status="warning">En attente</Text>
              <Text category="h6" status="basic">Editer</Text>
              <Text category="h6">Supprimer</Text>
            </View>

          </Card>
        ))}

        <Text category="p1" status="basic" style={{ marginBottom: 20 }}>
          Parametrez et consulter vos charges et revenus dans votre budget.
        </Text>

        <Layout style={styles.docs}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              flexDirection: 'row', alignItems: 'center',
            }}
          >
            <Icon name="calculator" size={33} color={theme['color-success-400']} style={{ marginRight: 10 }} />
            <Text category="h5">
              Mon Budget
            </Text>
          </TouchableOpacity>
        </Layout>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
    paddingVertical: 25,
    marginBottom: 12,
    paddingHorizontal: 26,
    flex: 1,
    flexGrow: 1,
  },
  window: {
    flexDirection: 'column',
    marginTop: 30,
    // paddingTop: 31,
    // paddingBottom: 28,
    // paddingHorizontal: 37,
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
  docs: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    justifyContent: 'center',
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
});

export default EditMouvement;
