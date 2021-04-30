import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Layout, Text } from '@ui-kitten/components';
import {
  Image, ScrollView, StyleSheet, View,
} from 'react-native';

const ParametrerAjoutRevenu = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={{ backgroundColor: '#efefef' }}>

      {/**
         *  I. Mon Budget
         */}
      <Layout style={{ ...styles.container, marginTop: 0 }}>
        <Text style={{ fontSize: 25, fontFamily: 'HouschkaRoundedDemiBold' }}>
          Mon Budget
        </Text>
        <View style={{
          marginTop: 10, marginRight: 20, flexDirection: 'row', alignItems: 'center',
        }}
        >
          <Image source={require('../../../assets/Icones_omedom/logements/icones_log1.png')} style={{ height: 40, width: 40, marginRight: 12 }} />
          <Text style={{ fontSize: 19, fontFamily: 'HouschkaRoundedDemiBold' }}>
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
        <Text style={{ fontSize: 25, fontFamily: 'HouschkaRoundedDemiBold' }}>
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
