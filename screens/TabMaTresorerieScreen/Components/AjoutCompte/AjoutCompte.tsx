import React, { useEffect, useState } from 'react';
import {
  Button, Input, Layout, Text,
} from '@ui-kitten/components';
import {
  LogBox,
  ScrollView, StyleSheet, View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import CompteHeader from '../../../../components/CompteHeader/CompteHeader';
import comptesData from '../../../../mockData/comptesData';

const AjoutCompte = ({ compte }) => {
  // to ignore warning
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  // Take data that chosen and render previous page with new chosen data
  const navigation = useNavigation();
  const onMaTresorerie = () => {
    navigation.navigate('MaTresorerie');
  };

  const [client, setClient] = useState(comptesData);
  const [nom, setNom] = useState('');
  const [iban, setIBAN] = useState('');

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <Layout style={styles.container}>
        <Layout style={{ backgroundColor: '#f6f6f6', padding: 26, marginBottom: 13 }}>
          <Text style={{
            fontSize: 26, letterSpacing: 0.2,
          }}
          >
            Ma Trésorerie
          </Text>
          <Layout style={{ backgroundColor: 'transparent', marginTop: 20 }}>
            <CompteHeader title={client[0].title} />
          </Layout>

        </Layout>

        <Layout style={{
          flex: 1, marginBottom: 20, paddingVertical: 20, backgroundColor: '#f6f6f6', paddingHorizontal: 26,
        }}
        >
          <Text style={{
            // color: '#000',
            fontSize: 20,
            fontFamily: 'Houschka_Rounded_Alt_Light_Regular',
            borderRadius: 10,
            letterSpacing: 0.7,
            paddingTop: 11,
            marginBottom: 30,
          }}
          >
            Ajouter un compte bancaire
          </Text>
          <Input
            style={styles.inputStyle}
            placeholder="Nom du titulaire du compte"
            value={nom}
            onChangeText={(nextValue) => setNom(nextValue)}
          />
          <Input
            style={styles.inputStyle}
            placeholder="IBAN"
            value={iban}
            onChangeText={(nextValue) => setIBAN(nextValue)}
          />

          <View style={styles.buttonRight}>
            <Button onPress={onMaTresorerie} style={{ width: 130 }}>
              Valider
            </Button>
          </View>

        </Layout>

      </Layout>

    </ScrollView>
  );
};

export default AjoutCompte;

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
  inputStyle: {
    borderRadius: 7,
    backgroundColor: '#fff',
    fontWeight: 'normal',
    borderColor: 'transparent',
    marginBottom: 32,
    shadowColor: '#dedede',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  buttonRight: { alignItems: 'flex-end' },
});
