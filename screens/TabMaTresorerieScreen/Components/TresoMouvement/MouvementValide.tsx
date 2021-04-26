import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import comptesData from '../../../../mockData/comptesData';

const MouvementValide = () => {
  const [client, setClient] = useState(comptesData);

  // Go to next page
  const navigation = useNavigation();
  const onTresoMouvementPage2 = () => {
    navigation.navigate('TresoMouvement_page2');
  };

  return (
    <Layout style={styles.windowOut}>
      <FlatList
        data={client}
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
                Validé
              </Text>
              <TouchableOpacity onPress={onTresoMouvementPage2}>
                <AntDesign size={14} name="right" color="#b5b5b5" style={{ marginRight: 20 }} />
              </TouchableOpacity>

            </Layout>
          </Layout>

        )}
      />
    </Layout>
  );
};

export default MouvementValide;

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
    marginTop: 35,
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
