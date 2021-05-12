import React, { useEffect, useState } from 'react';
import { Layout, Text, useTheme } from '@ui-kitten/components';
import {
  FlatList, StyleSheet, TouchableOpacity,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CompteHeader from '../../../../components/CompteHeader/CompteHeader';
import comptesData from '../../../../mockData/comptesData';
import MaxWidthContainer from '../../../../components/MaxWidthContainer';

const TresoMouvementPage2 = () => {
  const [client] = useState(comptesData);
  const theme = useTheme();

  // Take data that chosen and back to previous page with new chosen data
  const navigation = useNavigation();
  const onTresoMouvementPage1 = () => {
    navigation.navigate('TresoMouvement_page1');
  };

  useEffect(() => {
    console.log('useEffect of TresoMouvementPage 2 ');
  });

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
      }}
    >
      <Layout style={styles.container}>
        <Layout style={{ backgroundColor: '#f6f6f6', padding: 26 }}>
          <Text category="h1">
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
          <Text appearance="hint" style={{ paddingTop: 8 }}>
            FR
            {client[0].data[0].IBAN}
          </Text>
          <Text
            appearance="hint"
            style={{
              fontSize: 14.5, marginTop: 4.3, letterSpacing: 0.2,
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
              <Text
                status="success"
                style={{
                  fontSize: 18,
                  letterSpacing: 0.5,
                  fontWeight: '600',
                  justifyContent: 'center',
                }}
              >
                + 500 €
              </Text>

              <Text appearance="hint" category="h6">10/03/2021</Text>
              <Text appearance="hint" category="p1">Libellé du mouvement</Text>
            </Layout>

          </Layout>

        </Layout>

        <Layout style={{
          flex: 1, marginBottom: 20, paddingVertical: 20, backgroundColor: '#f6f6f6', paddingHorizontal: 26,
        }}
        >
          <Text
            category="s2"
            status="basic"
            style={{
              borderRadius: 10,
              paddingVertical: 15,
            }}
          >
            Revenus enregistés dans votre budget
          </Text>

          <FlatList
            data={comptesData}
            keyExtractor={(item) => item.id}
            renderItem={() => (

              <TouchableOpacity
                onPress={onTresoMouvementPage1}
                style={[
                  styles.window,
                  { backgroundColor: theme['color-basic-100'] },
                ]}
              >
                <Layout style={{
                  flex: 1,
                  borderRightWidth: 1,
                  borderRightColor: '#b5b5b5',
                }}
                >

                  <Text
                    status="success"
                    style={{
                      fontSize: 18,
                      letterSpacing: 0.5,
                      fontWeight: '600',
                      justifyContent: 'center',
                    }}
                  >
                    + 500 €
                  </Text>

                  <Text appearance="hint" style={{ fontSize: 16 }}>10/03/2021</Text>
                  <Text appearance="hint" style={{ fontSize: 14 }}>Libellé du mouvement</Text>
                </Layout>

                <Layout style={{
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
                >
                  <Text
                    status="warning"
                    style={{
                      fontSize: 18, letterSpacing: 0.4, marginLeft: 15, fontWeight: '800',
                    }}
                  >
                    En attente
                  </Text>
                  <AntDesign size={14} name="right" color="#b5b5b5" style={{ marginRight: 20 }} />
                </Layout>
              </TouchableOpacity>

            )}
          />

        </Layout>

      </Layout>
    </MaxWidthContainer>
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
