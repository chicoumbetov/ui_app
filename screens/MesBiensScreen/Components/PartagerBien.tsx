import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  StyleSheet, View,
} from 'react-native';
import MaisonVert from '../../../assets/Omedom_Icons_svg/Logement/maison_verte.svg';

const PartagerBien = () => {
  const navigation = useNavigation();

  const allerDetailsBien = () => {
    navigation.navigate('DetailsBien');
  };
  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: '#efefef' }}
    >

      {/**
      *  I part
      */}
      <Layout style={[styles.container, { marginTop: 0 }]}>
        <Text category="h1" status="basic" style={{ marginBottom: 30 }}>
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
    </KeyboardAwareScrollView>
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
