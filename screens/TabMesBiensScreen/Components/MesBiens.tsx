/**
 * Page 1 Mes Biens pour visualiser les biens
 *
 * @author: Shynggys UMBETOV
 */

import React from 'react';
import { Button, Layout, Text } from '@ui-kitten/components';

import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CompteHeader from '../../../components/CompteHeader/CompteHeader';
import GraphicsII from '../../../components/Graphics/GraphicsII';

function MesBiens() {
  const navigation = useNavigation();

  const onAjoutBien = () => {
    navigation.navigate('ajoutBienScreen');
  };
  return (
    <ScrollView>
      <Layout style={{ backgroundColor: '#efefef', padding: 26 }}>
        <Text style={{ fontSize: 34, fontWeight: '600' }}>
          Mes Biens
        </Text>
        <Layout style={{
          flexDirection: 'column',
          backgroundColor: '#fff',
          marginTop: 20,
          padding: 15,
          borderRadius: 10,
        }}
        >
          <CompteHeader />
          <Layout style={{ flexDirection: 'row' }}>
            <Layout style={{
              flex: 1,
              alignItems: 'center',
              borderRightColor: '#b5b5b5',
              borderRightWidth: 1,
              justifyContent: 'space-between',
            }}
            >
              <Text style={{ justifyContent: 'center', color: '#b5b5b5' }}>Dernier crédit</Text>
              <Text style={{ marginTop: 10, fontWeight: '600', color: '#00c29a' }}> + 500 €</Text>
            </Layout>

            <Layout style={{
              flex: 1,
              alignItems: 'center',
              borderRightWidth: 1,
              borderRightColor: '#b5b5b5',
              justifyContent: 'space-between',
            }}
            >
              <Text style={{ justifyContent: 'center', color: '#b5b5b5' }}>Dernier débit</Text>
              <Text style={{ marginTop: 10, fontWeight: '600', color: '#ff5640' }}> - 80 €</Text>
            </Layout>

            <Layout style={{ flex: 1, justifyContent: 'space-between' }}>
              <Text style={{ alignItems: 'center', color: '#b5b5b5' }}>Prochain mouvement</Text>
              <Text style={{ marginTop: 10, fontWeight: '600', color: '#ff5640' }}> - 160 €</Text>
            </Layout>
          </Layout>

        </Layout>
        <GraphicsII />
      </Layout>
      <Button
        style={{ margin: 10 }}
        onPress={() => {
          onAjoutBien();
        }}
      >
        Ajouter un nouveau bien
      </Button>
    </ScrollView>
  );
}

export default MesBiens;
