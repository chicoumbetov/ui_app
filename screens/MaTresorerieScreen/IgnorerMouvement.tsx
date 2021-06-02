import React, { useState } from 'react';
import {
  Text,
} from '@ui-kitten/components';
import {
  StyleSheet, TouchableOpacity, View,
} from 'react-native';

import CompteHeader from '../../components/CompteHeader/CompteHeader';
import comptesData from '../../mockData/comptesData';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import mouvementData from '../../mockData/mouvementData';
import Card from '../../components/Card';

const IgnorerMouvement = () => {
  // const { compte } = props;
  // const theme = useTheme();
  const [client] = useState(comptesData);

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
        style: {
          padding: 25,
        },
      }}
    >

      <Text
        category="h1"
        status="basic"
        style={{ marginBottom: 20 }}
      >
        Ma Trésorerie
      </Text>

      <CompteHeader title={client[0].title} />

      <View style={{ marginVertical: 20, alignItems: 'center' }}>
        <Text category="h6" status="basic">Monsieur Dupont Matthieu</Text>
        <Text category="h6" appearance="hint">FR76**************583</Text>
        <Text category="h6" status="basic">Société Générale</Text>
      </View>

      <Text
        category="h2"
      >
        Mouvements ignorés
      </Text>
      <View
        style={{ marginBottom: 40 }}
      >
        {mouvementData.map((item) => (
          <Card
            key={item.id}
            style={{
              marginVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >

            <TouchableOpacity
              onPress={() => {}}
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                  marginLeft: 20,
                }}
              >
                <Text
                  style={{ justifyContent: 'center' }}
                  category="h5"
                  status="basic"
                >
                  {item.valeur}
                </Text>
                <Text
                  style={{ justifyContent: 'center' }}
                  category="h6"
                  appearance="hint"
                >
                  Ignoré
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
  );
};

export default IgnorerMouvement;

// const styles = StyleSheet.create({ windowOut: {} });
