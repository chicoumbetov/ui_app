import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text, useTheme } from '@ui-kitten/components';

import { useNavigation } from '@react-navigation/native';
import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
import MaxWidthContainer from '../../../components/MaxWidthContainer';

const OwnerCompte = ({ compte }) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const onTresoMouvement = () => {
    navigation.navigate('TresoMouvement_page1');
  };

  return (
    <MaxWidthContainer>
      <Layout style={styles.container}>

        <Layout style={{ paddingHorizontal: 14, width: 255, backgroundColor: 'transparent' }}>
          <Text
            category="h6"
            style={{
              borderRadius: 10,
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
            style={{ paddingTop: 8 }}
          >
            {compte.bank}
          </Text>
        </Layout>

        <Layout style={{ flexDirection: 'row', backgroundColor: 'transparent', alignItems: 'center' }}>
          <Layout style={{
            backgroundColor: theme['color-warning-500'],
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
          <TouchableOpacity onPress={onTresoMouvement} style={{ marginRight: 2 }}>
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
    </MaxWidthContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginTop: 25,
    borderRadius: 10,
  },
  window: {
    flexDirection: 'row',
    margin: 24,
    marginTop: 39,
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
});

export default OwnerCompte;
