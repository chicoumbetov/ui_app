import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Layout, Text } from '@ui-kitten/components';
import {
  Image, ScrollView, StyleSheet, View,
} from 'react-native';
import MaisonVert from '../../../assets/Omedom_Icons_svg/Logement/maison_verte.svg';

const ParametrerAjoutRevenu = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={{ backgroundColor: '#efefef' }}>

      {/**
         *  I. Mon Budget
         */}
      <Layout style={{ ...styles.container, marginTop: 0 }}>
        <Text category="h1">
          Mon Budget
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
      <Layout style={{ ...styles.container }}>
        <Text category="h4">
          Ajouter un revenu
        </Text>
      </Layout>
    </ScrollView>
  );
};

export default ParametrerAjoutRevenu;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
    marginTop: 12,
    paddingVertical: 25,
    paddingHorizontal: 26,
  },
});
