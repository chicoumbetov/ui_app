import React, { useEffect } from 'react';
import { useLinkTo, useNavigation } from '@react-navigation/native';
import { Text, useTheme } from '@ui-kitten/components';

import { StyleSheet } from 'react-native';
import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import Card from '../../../components/Card';

const MesRapports = () => {
  const navigation = useNavigation();
  const linkTo = useLinkTo();
  const theme = useTheme();

  const allerMesCharges = () => {
    linkTo('/mes-charges');
  };

  const allerMesRapportBiens1 = () => {
    navigation.navigate('mes-rapports-biens1');
  };

  useEffect(() => {
    console.log('useEffect of MesRapports component');
  });

  return (
    <MaxWidthContainer outerViewProps={{
      style: {
        paddingHorizontal: 24,
        backgroundColor: '#f6f6f6',
      },
    }}
    >
      <Text category="h1" status="basic" style={{ marginVertical: 30 }}>Mes Rapports</Text>

      {/**
       * Par charges
       * */}
      <Card
        onPress={() => { allerMesCharges(); }}
        style={
            styles.docs
          }
      >
        <Text category="h5" status="basic">Par charges</Text>
        <IconUIKitten
          name="arrow-ios-forward"
          fill={theme['text-hint-color']}
          style={{
            height: 17, width: 17,
          }}
        />
      </Card>

      {/**
       * Par biens
       * */}
      <Card
        onPress={() => { allerMesRapportBiens1(); }}
        style={
          styles.docs
}
      >
        <Text category="h5" status="basic">Par biens</Text>
        <IconUIKitten
          name="arrow-ios-forward"
          fill={theme['text-hint-color']}
          style={{
            height: 17, width: 17,
          }}
        />

      </Card>
    </MaxWidthContainer>
  );
};

export default MesRapports;

const styles = StyleSheet.create({
  docs: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: 23,
    paddingVertical: 29.5,
    marginBottom: 29,
  },
});
