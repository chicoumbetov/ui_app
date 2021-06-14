import React from 'react';
import {
  Text,
} from '@ui-kitten/components';
import {
  View,
} from 'react-native';

import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import { useGetRealEstate } from '../../src/API/RealEstate';

import CompteHeader from '../../components/CompteHeader/CompteHeader';
import MaxWidthContainer from '../../components/MaxWidthContainer';

import { TabMaTresorerieParamList } from '../../types';

const AffecterMouvement = () => {
  // const { compte } = props;
  // const theme = useTheme();
  // const [client] = useState(comptesData);
  const route = useRoute<RouteProp<TabMaTresorerieParamList, 'affecter-mouvement'>>();
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

      <CompteHeader title={bien?.name} />

      <View style={{
        marginTop: 20,
        alignItems: 'center',
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#b5b5b5',
      }}
      >
        <Text category="h6" status="basic">Monsieur Dupont Matthieu</Text>
        <Text category="h6" appearance="hint">FR76**************583</Text>
        <Text category="h6" status="basic">Société Générale</Text>
      </View>

      <Text
        category="s2"
        style={{
          marginBottom: 20, paddingTop: 30,
        }}
      >
        Mouvements bancaires
      </Text>
      <Text category="p2" appearance="hint">
        Vous pouvez modifier une affectation en sélectionnant le mouvement bancaire.
      </Text>

    </MaxWidthContainer>
  );
};

export default AffecterMouvement;

// const styles = StyleSheet.create({ windowOut: {} });
