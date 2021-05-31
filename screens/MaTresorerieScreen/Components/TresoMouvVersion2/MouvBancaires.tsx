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
  StyleSheet, TouchableOpacity, View,
} from 'react-native';

import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import CompteHeader from '../../../../components/CompteHeader/CompteHeader';
import MaxWidthContainer from '../../../../components/MaxWidthContainer';

import comptesData from '../../../../mockData/comptesData';
import mouvementData from '../../../../mockData/mouvementData';
import ActionSheet from '../../../../components/ActionSheet/ActionSheet';
import EditMouvement from './EditMouvement';
import Card from '../../../../components/Card';
import { TabMaTresorerieParamList } from '../../../../types';
import { useGetRealEstate, useRealEstateList } from '../../../../src/API/RealEstate';

const MouvBancaires = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [compte] = useState(comptesData);
  const [currentMvt, setCurrentMvt] = useState();

  const route = useRoute<RouteProp<TabMaTresorerieParamList, 'mouv-bancaires'>>();
  const { bien } = useGetRealEstate(route.params.id);

  const onIgnorerMouvement = () => {
    navigation.navigate('ignorer-mouvement');
  };

  const onEditMouvement = (item) => {
    setCurrentMvt(item);
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
    <>
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

          <CompteHeader title={bien.name} />

          <View style={{ marginVertical: 20, alignItems: 'center' }}>
            <Text category="h6" status="basic">Monsieur Dupont Matthieu</Text>
            <Text category="h6" appearance="hint">FR76**************583</Text>
            <Text category="h6" status="basic">Société Générale</Text>
          </View>

          <Text
            category="s2"
            style={{
              marginVertical: 20, paddingTop: 30, borderTopWidth: 1, borderTopColor: '#b5b5b5',
            }}
          >
            Mouvements Bancaires
          </Text>
          <Text category="p2" appearance="hint">
            Vous pouvez affecter ou ignorer les mouvements bancaires liés à ce compte bancaire.
          </Text>

          <Button
            size="large"
            onPress={() => {}}
            appearance="outline"
            status="danger"
            style={{ marginTop: 20 }}
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
          {/** data={grouped.get('En attente')} */}

          {mouvementData.map((item) => (
            <Card
              key={item.id}
              style={{ marginVertical: 20 }}
            >
              <TouchableOpacity
                onPress={() => onEditMouvement(item)}
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
            </Card>

          ))}

        </View>

      </MaxWidthContainer>
      <ActionSheet title="test" before={<></>} noSafeArea scrollable={false} visible={currentMvt !== undefined} onClose={() => setCurrentMvt(undefined)}><EditMouvement /></ActionSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
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
