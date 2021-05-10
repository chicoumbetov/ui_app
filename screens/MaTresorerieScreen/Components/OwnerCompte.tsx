import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text, useTheme } from '@ui-kitten/components';

import { useNavigation } from '@react-navigation/native';
import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';

const OwnerCompte = ({ compte }) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const onTresoMouvement = () => {
    navigation.navigate('TresoMouvement_page1');
  };

  return (

    <Layout style={styles.container}>

      <Layout style={{ paddingHorizontal: 14, width: 255 }}>
        <Text
          category="h6"
          style={{
            borderRadius: 10,
            paddingTop: 11,
          }}
        >
          Monsieur
          {' '}
          {compte.nom}
          {' '}
          {compte.prenom}
        </Text>
        <Text
          category="h6"
          appearance="hint"
          style={{ paddingTop: 8 }}
        >
          FR
          {compte.IBAN}
        </Text>
        <Text
          category="h6"
          appearance="hint"
        >
          {compte.bank}
        </Text>
      </Layout>

      <Layout style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Layout style={{
          backgroundColor: '#ffbe00',
          marginTop: 17,
          marginRight: 5,
          height: 30,
          width: 30,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 5,
          borderRadius: 30,
        }}
        >
          <Text status="control">3</Text>
        </Layout>
        <TouchableOpacity onPress={onTresoMouvement} style={{ marginRight: 2, marginTop: 17 }}>
          <IconUIKitten
            name="arrow-ios-forward"
            fill={theme['text-hint-color']}
            style={{
              height: 20, width: 20,
            }}
          />
        </TouchableOpacity>

      </Layout>

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 32,
    paddingBottom: 27,
    marginLeft: 7,
    borderRadius: 10,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowColor: '#b5b5b5',
    shadowOffset: {
      width: 0,
      height: 1,
    },

    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    justifyContent: 'space-between',
  },
});

export default OwnerCompte;
