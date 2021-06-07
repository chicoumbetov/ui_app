import React from 'react';
import { Icon, Text } from '@ui-kitten/components';
import { TouchableOpacity, View } from 'react-native';

import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';
// import clientData from '../../../mockData/clientDATA';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import { TabMonAssistantParamList } from '../../../types';
import { useGetRealEstate } from '../../../src/API/RealEstate';
import Separator from '../../../components/Separator';
import Card from '../../../components/Card';

const QuittanceLoyer2 = () => {
  const route = useRoute<RouteProp<TabMonAssistantParamList, 'quittance-loyer-2'>>();
  const { bien } = useGetRealEstate(route.params.id);
  // const onPdf = () => { navigation.navigate('pdf-screen'); };
  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
        style: {
          padding: 27,
        },
      }}
    >

      <View style={{ marginBottom: 20 }}>
        <Text category="h1" style={{ marginBottom: 6 }}>Générer une quittance de loyer</Text>
        <CompteHeader />
      </View>

      <Separator />

      <Text category="h2" style={{ marginVertical: 30 }}>Votre document est prêt</Text>
      <Card>
        <TouchableOpacity
          onPress={() => {}}
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Text category="p2">
            Quittance_Loyer_
            {bien?.name}
            _
            {route.params.anneeEcheance}
          </Text>
          <Icon name="eye" fill="#b5b5b5" style={{ height: 20, width: 20 }} />
        </TouchableOpacity>
      </Card>

    </MaxWidthContainer>
  );
};

export default QuittanceLoyer2;

// const styles = StyleSheet.create({});
