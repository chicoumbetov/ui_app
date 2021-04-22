import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { colors, typographies } from '../../../assets/styles';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';

function TableauDeBord({ navigation }) {
  return (
    <ScrollView style={{ backgroundColor: '#efefef', marginTop: 12 }}>
      <Layout style={styles.container}>
        <Text style={{ fontSize: 34, fontWeight: '600', marginLeft: 22 }}>
          Trésorerie
        </Text>
        <Layout style={{
          flexDirection: 'column', marginTop: 20, padding: 15, borderRadius: 10,
        }}
        >
          <Layout style={{ flexDirection: 'row' }}>
            <Layout style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            >
              <Text style={{ justifyContent: 'center', color: '#b5b5b5' }}>Dernier crédit</Text>
              <Text style={{ marginTop: 10, fontWeight: '600', color: '#00c29a' }}> + 500 €</Text>
              <Image
                source={require('../../../assets/Icones_omedom/logements/icones_log1.png')}
                style={{ height: 40, width: 40, marginRight: 12 }}
              />
            </Layout>

            <Layout style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            >
              <Text style={{
                justifyContent: 'center',
                color: '#b5b5b5',
                textAlign: 'center',
              }}
              >
                Dernier débit
              </Text>
              <Text style={{ marginTop: 10, fontWeight: '600', color: '#ff5640' }}> - 80 €</Text>
              <Image
                source={require('../../../assets/Icones_omedom/logements/icones_log1.png')}
                style={{ height: 40, width: 40, marginRight: 12 }}
              />
            </Layout>

            <Layout style={{
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            >
              <Text style={{
                justifyContent: 'center',
                color: '#b5b5b5',
                textAlign: 'center',
              }}
              >
                Prochain mouvement
              </Text>
              <Text style={{ marginTop: 10, fontWeight: '600', color: '#ff5640' }}> - 160 €</Text>
              <Image
                source={require('../../../assets/Icones_omedom/logements/icones_log1.png')}
                style={{ height: 40, width: 40, marginRight: 12 }}
              />
            </Layout>
          </Layout>
          <Text style={{ color: colors.bleu }} onPress={() => navigation.navigate('Ma Trésorerie')}>Accéder à la trésorerie</Text>

        </Layout>
      </Layout>
      <Layout style={styles.container}>
        <Text style={{ fontSize: 34, fontWeight: '600', marginLeft: 22 }}>
          Mes Biens
        </Text>
        <Layout style={{
          flexDirection: 'column', marginTop: 20, padding: 15, borderRadius: 10,
        }}
        >
          <CompteHeader />
          <Layout style={{ flexDirection: 'row' }}>
            <Layout style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            >
              <Text style={{ marginTop: 10, fontWeight: '600', color: '#00c29a' }}> + 500 €</Text>
            </Layout>

            <Layout style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            >
              <Text style={{ marginTop: 10, fontWeight: '600', color: '#ff5640' }}> - 80 €</Text>
            </Layout>

            <Layout style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            >
              <Text style={{ marginTop: 10, fontWeight: '600', color: '#ff5640' }}> 60 %</Text>
            </Layout>
          </Layout>

        </Layout>
      </Layout>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(255,255,255)',
    marginTop: 12,

  },
});
export default TableauDeBord;
