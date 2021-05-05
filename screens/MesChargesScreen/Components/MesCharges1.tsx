import React, { useState } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import {
  FlatList, StyleSheet, TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../../../assets/styles';

const DATA = [
  {
    id: '0',
    title: 'Eau',
    isChecked: false,
  },
  {
    id: '1',
    title: 'Electricité',
    isChecked: false,
  },
  {
    id: '2',
    title: 'Frais Divers',
    isChecked: false,
  },
  {
    id: '3',
    title: 'Assurances',
    isChecked: false,
  },
];

const MesCharges1 = () => {
  const navigation = useNavigation();
  const [charges, setCharges] = useState(DATA);

  const onMesCharges2 = (item) => {
    navigation.navigate('MesCharges2');
    const temp = charges.map((charge) => {
      // comparison of clicked index with taken index
      if (item.id === charge.id) {
        // on recupere charge et on fait copie,
        // ensuite on change boolean de isChecked dans le assistantDATA
        return { ...charge, isChecked: !charge.isChecked };
      }
      return charge;
    });
    setCharges(temp);
  };

  return (

    <Layout style={styles.container}>
      <Text style={styles.title}>Mes rapports par charges</Text>
      <Text
        style={{
          fontSize: 16.5,
          letterSpacing: 0.02,
          fontFamily: 'HouschkaRoundedDemiBold',
          color: '#b5b5b5',
          marginTop: 7,
          paddingVertical: 30,
        }}
      >
        Choisissez votre charge
      </Text>

      <FlatList
        data={charges}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Layout style={styles.docs}>
            <Text style={styles.aideText}>{item.title}</Text>
            <TouchableOpacity onPress={() => { onMesCharges2(item); }}>
              <AntDesign name="right" size={13} style={{ color: '#b5b5b5', fontWeight: '700' }} />
            </TouchableOpacity>
          </Layout>
        )}

      />

    </Layout>

  );
};

export default MesCharges1;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    marginVertical: 12,
    backgroundColor: '#f6f6f6',
  },
  title: {
    fontSize: 25,
    marginTop: 13,
    letterSpacing: 0.2,
    fontFamily: 'HouschkaRoundedDemiBold',
  },
  docs: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: 23,
    paddingVertical: 29.5,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 29,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 1,

    backgroundColor: colors.blanc,
    fontWeight: 'normal',
    borderColor: 'transparent',
    shadowColor: '#dedede',
  },
  aideText: {
    fontSize: 17.5,
    letterSpacing: 0.1,
    fontFamily: 'HouschkaRoundedDemiBold',
  },
});
