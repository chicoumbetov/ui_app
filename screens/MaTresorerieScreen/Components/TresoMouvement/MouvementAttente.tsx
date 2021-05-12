import React from 'react';
import {
  FlatList, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Layout, Text, useTheme } from '@ui-kitten/components';

import { useNavigation } from '@react-navigation/native';
import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
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
  const theme = useTheme();
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
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
      }}
    >
      <Layout style={styles.windowOut}>
        {/**
           Change color according on type of mouvement:
           make red if negative
           make green if positive
           */}
        <FlatList
          data={grouped.get('En attente')}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (

            <TouchableOpacity
              onPress={onTresoMouvementPage2}
              style={[
                styles.window,
                { backgroundColor: theme['color-basic-100'] },
              ]}
            >
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
                  status={item.valeur.substring(0, 1) === '-' ? ('danger') : ('success')}
                >
                  {item.valeur}
                </Text>

                <Text category="h6" appearance="hint">{item.date}</Text>
                <Text category="p1" appearance="hint">Libellé du mouvement</Text>
              </Layout>

              <Layout
                style={{
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
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
                <IconUIKitten
                  name="arrow-ios-forward"
                  fill="#b5b5b5"
                  style={{
                    height: 20, width: 20, alignItems: 'center',
                  }}
                />
              </Layout>

            </TouchableOpacity>

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

            <TouchableOpacity
              onPress={onTresoMouvementPage2}
              style={[
                styles.window,
                { backgroundColor: theme['color-basic-100'] },
              ]}
            >
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
                  status={item.valeur.substring(0, 1) === '-' ? ('danger') : ('success')}
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
                justifyContent: 'space-evenly',
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
                <IconUIKitten
                  name="arrow-ios-forward"
                  fill="#b5b5b5"
                  style={{
                    height: 20, width: 20, alignItems: 'center',
                  }}
                />
              </Layout>

            </TouchableOpacity>

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
