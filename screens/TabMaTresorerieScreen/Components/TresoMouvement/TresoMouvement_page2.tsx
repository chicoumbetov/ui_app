import React, { useEffect, useState } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import {
  FlatList,
  LogBox, ScrollView, StyleSheet, TouchableOpacity,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CompteHeader from '../../../../components/CompteHeader/CompteHeader';
import comptesData from '../../../../mockData/comptesData';

const TresoMouvementPage2 = ({ compte }) => {
  // to ignore warning
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const [client, setClient] = useState(comptesData);
  console.log('compte in TresoMouvement', compte);

  // Take data that chosen and back to previous page with new chosen data
  const navigation = useNavigation();
  const onTresoMouvementPage1 = () => {
    navigation.navigate('TresoMouvement_page1');
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <Layout style={styles.container}>
        <Layout style={{ backgroundColor: '#f6f6f6', padding: 26 }}>
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
          marginVertical: 20, paddingVertical: 20, backgroundColor: '#f6f6f6', paddingHorizontal: 26,
        }}
        >
          <Text style={{
            // color: '#000',
            fontSize: 16,
            fontFamily: 'HouschkaRoundedDemiBold',
            borderRadius: 10,
            letterSpacing: 0.7,
            paddingTop: 11,
          }}
          >
            Monsieur
            {' '}
            {client[0].data[0].nom}
            {' '}
            {client[0].data[0].prenom}
          </Text>
          <Text style={{ color: '#b5b5b5', paddingTop: 8 }}>
            FR
            {client[0].data[0].IBAN}
          </Text>
          <Text style={{
            fontSize: 14.5, color: '#b5b5b5', marginTop: 4.3, letterSpacing: 0.2,
          }}
          >
            {client[0].data[0].bank}
          </Text>
        </Layout>

        <Layout style={{
          marginBottom: 20, paddingVertical: 20, backgroundColor: '#f6f6f6', paddingHorizontal: 26,
        }}
        >

          <Layout style={styles.window}>
            <Layout style={{
              flex: 1,
            }}
            >
              <Text style={{
                fontSize: 18,
                letterSpacing: 0.5,
                fontWeight: '600',
                color: '#00c29a',
                justifyContent: 'center',
              }}
              >
                + 500 €
              </Text>

              <Text style={{ fontSize: 16, color: '#b5b5b5' }}>10/03/2021</Text>
              <Text style={{ fontSize: 14, color: '#b5b5b5' }}>Libellé du mouvement</Text>
            </Layout>

          </Layout>

        </Layout>

        <Layout style={{
          flex: 1, marginBottom: 20, paddingVertical: 20, backgroundColor: '#f6f6f6', paddingHorizontal: 26,
        }}
        >
          <Text style={{
            // color: '#000',
            fontSize: 18,
            fontFamily: 'HouschkaRoundedMedium',
            borderRadius: 10,
            letterSpacing: 0.7,
            paddingTop: 11,
          }}
          >
            Revenus enregistés dans votre budget
          </Text>

          <FlatList
            data={comptesData}
            keyExtractor={(item) => item.id}
            renderItem={() => (

              <Layout style={styles.window}>
                <Layout style={{
                  flex: 1,
                  borderRightWidth: 1,
                  borderRightColor: '#b5b5b5',
                }}
                >

                  <Text style={{
                    fontSize: 18,
                    letterSpacing: 0.5,
                    fontWeight: '600',
                    color: '#00c29a',
                    justifyContent: 'center',
                  }}
                  >
                    + 500 €
                  </Text>

                  <Text style={{ fontSize: 16, color: '#b5b5b5' }}>10/03/2021</Text>
                  <Text style={{ fontSize: 14, color: '#b5b5b5' }}>Libellé du mouvement</Text>
                </Layout>

                <Layout style={{
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
                >
                  <Text style={{
                    fontSize: 18, letterSpacing: 0.4, marginLeft: 15, fontWeight: '800', color: 'orange',
                  }}
                  >
                    En attente
                  </Text>
                  <TouchableOpacity onPress={onTresoMouvementPage1}>
                    <AntDesign size={14} name="right" color="#b5b5b5" style={{ marginRight: 20 }} />
                  </TouchableOpacity>

                </Layout>
              </Layout>

            )}
          />

        </Layout>

      </Layout>
    </ScrollView>
  );
};

export default TresoMouvementPage2;

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
    marginVertical: 10,
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
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 15,
    backgroundColor: 'transparent',
  },
  buttonTextRight: {
    color: '#0076c8',
    fontSize: 17.5,
    fontWeight: '600',
  },
});
