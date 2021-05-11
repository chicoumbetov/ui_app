import React, { useEffect } from 'react';
import { useLinkTo, useNavigation } from '@react-navigation/native';
import { Layout, Text, useTheme } from '@ui-kitten/components';

import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
import MaxWidthContainer from '../../../components/MaxWidthContainer';

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
      <TouchableOpacity
        onPress={() => { allerMesCharges(); }}
        style={[
          styles.docs,
          { backgroundColor: theme['color-basic-100'] },
        ]}
      >
        <Text category="h5" status="basic">Par charges</Text>

        <IconUIKitten
          name="arrow-ios-forward"
          fill={theme['text-hint-color']}
          style={{
            height: 17, width: 17,
          }}
        />

      </TouchableOpacity>

      {/**
       * Par biens
       * */}
      <TouchableOpacity
        onPress={() => { allerMesRapportBiens1(); }}
        style={[
          styles.docs,
          { backgroundColor: theme['color-basic-100'] },
        ]}
      >
        <Text category="h5" status="basic">Par biens</Text>

        <IconUIKitten
          name="arrow-ios-forward"
          fill={theme['text-hint-color']}
          style={{
            height: 17, width: 17,
          }}
        />

      </TouchableOpacity>

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
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 29,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    borderColor: 'transparent',
    shadowColor: '#dedede',
  },
});
