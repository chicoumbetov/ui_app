import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Layout, Text } from '@ui-kitten/components';

import {
  StyleSheet, View,
} from 'react-native';
import MaisonVert from '../../../assets/Omedom_Icons_svg/Logement/maison_verte.svg';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import TextInputComp from '../../../components/Form/TextInput';
import SelectComp from '../../../components/Form/Select';

export const typeAcces = [
  {
    label: 'Administration',
    key: 'b1',
  },
  {
    label: 'Lecture Seule',
    key: 'b2',
  },
];

const PartagerBien = () => {
  const navigation = useNavigation();

  const allerDetailsBien = () => {
    navigation.navigate('DetailsBien');
  };

  useEffect(() => {
    console.log('useEffect of Partager Bien component');
  }, []);

  return (
    <MaxWidthContainer>

      {/**
      *  I part
      */}
      <Layout style={styles.container}>
        <Text category="h1" status="basic" style={{ marginBottom: 20 }}>
          Partager le bien
        </Text>
        <View style={{
          marginTop: 10, marginRight: 20, flexDirection: 'row', alignItems: 'center',
        }}
        >
          <MaisonVert height={40} width={40} style={{ marginRight: 12 }} />
          <Text category="h4" status="basic">
            {' '}
            {/* {compte.typeBien} */}
            La Maison
            {' '}
            de Mathieu
            {' '}
          </Text>
        </View>
      </Layout>

      {/**
       *  II. Ajouter un utilisateur
       */}
      <Layout style={styles.container}>
        <Text category="h2">
          Ajouter un utilisateur
        </Text>

        <TextInputComp
          name="email"
          placeholder="Saisissez le mail de 'utilisateur"
          style={{ marginVertical: 15 }}
        />
        <SelectComp name="TypeAcces" data={typeAcces} placeholder="Type d'accès" size="large" appearance="default" status="primary" />

        <View style={styles.buttonRight}>
          <Button onPress={allerDetailsBien} style={{ width: 150 }}>
            Valider
          </Button>
        </View>
      </Layout>
    </MaxWidthContainer>
  );
};

export default PartagerBien;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
    marginBottom: 12,
    paddingVertical: 25,
    paddingHorizontal: 26,
  },
  buttonRight: {
    marginTop: 36,
    alignItems: 'flex-end',
  },
});
