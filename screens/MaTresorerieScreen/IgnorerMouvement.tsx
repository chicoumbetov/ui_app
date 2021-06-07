import React from 'react';
import {
  Text,
} from '@ui-kitten/components';
import {
  TouchableOpacity, View,
} from 'react-native';

import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import { useGetRealEstate } from '../../src/API/RealEstate';

import CompteHeader from '../../components/CompteHeader/CompteHeader';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import Card from '../../components/Card';

import { TabMaTresorerieParamList } from '../../types';

// import comptesData from '../../mockData/comptesData';
import mouvementData from '../../mockData/mouvementData';

const IgnorerMouvement = () => {
  // const { compte } = props;
  // const theme = useTheme();
  // const [client] = useState(comptesData);
  const route = useRoute<RouteProp<TabMaTresorerieParamList, 'ignorer-mouvement'>>();
  const { bien } = useGetRealEstate(route.params.id);

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

      <CompteHeader title={bien.name} />

      <View style={{
        marginVertical: 20, paddingBottom: 20, alignItems: 'center', borderBottomWidth: 2.5, borderBottomColor: '#f4f4f4',
      }}
      >
        <Text category="h6" status="basic">Monsieur Dupont Matthieu</Text>
        <Text category="h6" appearance="hint">FR76**************583</Text>
        <Text category="h6" status="basic">Société Générale</Text>
      </View>

      <Text
        category="h2"
      >
        Mouvements ignorés
      </Text>
      <Text category="p1" appearance="hint">
        Vous pouvez affecter ou ignorer les mouvements bancaires liés à ce compte bancaire.
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
              backgroundColor: 'f4f4f4',
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
