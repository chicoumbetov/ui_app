import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import Graphics from '../../../components/Graphics/Graphics';

const MesCharges3 = () => {
  const navigation = useNavigation();

  const onMesCharges1 = () => {
    navigation.navigate('MesCharges1');
  };

  return (

    <Layout style={styles.container}>
      <Text style={styles.title}>Charge Eau</Text>
      <Graphics />
    </Layout>

  );
};

export default MesCharges3;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    marginVertical: 12,
    backgroundColor: 'yellow',
  },
  title: {
    fontSize: 25,
    marginTop: 13,
    letterSpacing: 0.2,
    fontFamily: 'HouschkaRoundedDemiBold',
  },
});
