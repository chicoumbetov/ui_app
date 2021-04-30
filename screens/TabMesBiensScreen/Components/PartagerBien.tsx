import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Layout, Text } from '@ui-kitten/components';
import {
  Image, LogBox, ScrollView, StyleSheet, View,
} from 'react-native';

const PartagerBien = () => {
  const navigation = useNavigation();

  const allerDetailsBien = () => {
    navigation.navigate('DetailsBien');
  };
  return (
    <ScrollView style={{ backgroundColor: '#efefef' }}>

      {/**
      *  I part
      */}
      <Layout style={{ ...styles.container, marginTop: 0 }}>
        <Text style={{ fontSize: 25, fontFamily: 'HouschkaRoundedDemiBold' }}>
          Partager le bien
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
       *  II. Ajouter un utilisateur
       */}
      <Layout style={{ ...styles.container }}>
        <Text style={{ fontSize: 25, fontFamily: 'HouschkaRoundedDemiBold' }}>
          Ajouter un utilisateur
        </Text>

        <View style={styles.buttonRight}>
          <Button onPress={allerDetailsBien} style={{ width: 150 }}>
            Valider
          </Button>
        </View>
      </Layout>
    </ScrollView>
  );
};

export default PartagerBien;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
    marginTop: 12,
    paddingVertical: 25,
    paddingHorizontal: 26,
  },
  buttonRight: {
    marginTop: 36,
    alignItems: 'flex-end',
  },
});
