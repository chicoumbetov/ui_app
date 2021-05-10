import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import mouvementData from '../../../../mockData/mouvementData';
import MaxWidthContainer from '../../../../components/MaxWidthContainer';

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
const MouvementAttente = () => {
  // Go to next page
  const navigation = useNavigation();

  const onTresoMouvementPage2 = () => {
    navigation.navigate('TresoMouvement_page2');
  };

  const onIgnorerMouvement = () => {
    navigation.navigate('IgnorerMouvement');
  };

  const grouped = groupBy(mouvementData, (mouvement) => mouvement.typeMouvement);

  return (
    <MaxWidthContainer>
      <Layout style={styles.windowOut}>
        <FlatList
          data={grouped.get('En attente')}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (

            <Layout style={styles.window}>
              <Layout style={{
                flex: 1,
                borderRightWidth: 1,
                borderRightColor: '#b5b5b5',
              }}
              >

                <Text
                  style={{
                    justifyContent: 'center',
                  }}
                  category="h5"
                  status="success"
                >
                  {item.valeur}
                </Text>

                <Text category="h6" appearance="hint">{item.date}</Text>
                <Text category="p1" appearance="hint">Libellé du mouvement</Text>
              </Layout>

              <Layout style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 10,
              }}
              >
                <Text
                  style={{ justifyContent: 'center' }}
                  category="h6"
                  status={item.typeMouvement === 'Validé' ? ('success') : ('warning')}
                >
                  {item.typeMouvement}
                </Text>
                <TouchableOpacity onPress={onTresoMouvementPage2}>
                  <AntDesign size={14} name="right" color="#b5b5b5" style={{ marginRight: 20 }} />
                </TouchableOpacity>

              </Layout>

            </Layout>

          )}
        />

        <TouchableOpacity onPress={onIgnorerMouvement}>
          <Layout style={styles.button}>
            <Text category="h3" status="info">Ignorer les mouvements</Text>
          </Layout>
        </TouchableOpacity>
        <Layout style={styles.separator} />

        <FlatList
          data={grouped.get('Validé')}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (

            <Layout style={styles.window}>
              <Layout style={{
                flex: 1,
                borderRightWidth: 1,
                borderRightColor: '#b5b5b5',
              }}
              >

                <Text
                  style={{
                    justifyContent: 'center',
                  }}
                  category="h5"
                  status="success"
                >
                  {item.valeur}
                </Text>

                <Text category="h6" appearance="hint">{item.date}</Text>
                <Text category="p1" appearance="hint">Libellé du mouvement</Text>
              </Layout>

              <Layout style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 10,
              }}
              >
                <Text
                  style={{ justifyContent: 'center' }}
                  category="h6"
                  status={item.typeMouvement === 'Validé' ? ('success') : ('warning')}
                >
                  {item.typeMouvement}
                </Text>
                <TouchableOpacity onPress={onTresoMouvementPage2}>
                  <AntDesign size={14} name="right" color="#b5b5b5" style={{ marginRight: 20 }} />
                </TouchableOpacity>

              </Layout>

            </Layout>

          )}
        />
      </Layout>
    </MaxWidthContainer>
  );
};

export default MouvementAttente;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  windowOut: {
    backgroundColor: '#f6f6f6',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#b5b5b5',
  },
  window: {
    flexDirection: 'row',
    marginTop: 35,
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
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 30,
    backgroundColor: 'transparent',
  },
});
