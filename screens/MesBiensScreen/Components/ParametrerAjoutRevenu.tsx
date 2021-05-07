import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import {
  ScrollView, StyleSheet, View,
} from 'react-native';
import MaisonVert from '../../../assets/Omedom_Icons_svg/Logement/maison_verte.svg';

const ParametrerAjoutRevenu = () => (
  <ScrollView style={{ backgroundColor: '#efefef' }}>

    {/**
         *  I. Mon Budget
         */}
    <Layout style={styles.container}>
      <Text category="h1">
        Paramétrer votre budget
      </Text>
      <View style={{
        marginTop: 10, marginRight: 20, flexDirection: 'row', alignItems: 'center',
      }}
      >
        <View style={{ marginRight: 12 }}>
          <MaisonVert height={40} width={40} />
        </View>

        <Text category="h2">
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
       *  II. Ajouter revenu
       */}
    <Layout style={styles.container}>
      <Text category="h4" status="basic">
        Ajouter un revenu
      </Text>
    </Layout>
  </ScrollView>
);

export default ParametrerAjoutRevenu;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
    marginTop: 12,
    paddingVertical: 25,
    paddingHorizontal: 26,
  },
});
