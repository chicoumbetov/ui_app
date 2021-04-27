import React from 'react';
import {
  Layout, RadioGroup, Radio, Text, Button,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

const MesCharges2 = ({ charges }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const navigation = useNavigation();

  const onMesCharges3 = () => {
    navigation.navigate('MesCharges3');
  };
  return (

    <Layout style={styles.container}>
      <Text style={styles.title}>
        Charge Eau
      </Text>

      <RadioGroup
        selectedIndex={selectedIndex}
        onChange={(index) => setSelectedIndex(index)}
        style={styles.containerRadio}
      >
        <Radio status="info">Année</Radio>
        <Radio>Année - 1</Radio>
        <Radio>Mois</Radio>
      </RadioGroup>

      <Text
        style={{
          fontSize: 17.2,
          letterSpacing: 0.07,
          fontFamily: 'HouschkaRoundedDemiBold',
          color: '#b5b5b5',
          paddingVertical: 26,
        }}
      >
        Selectionner l'année
      </Text>

      <View style={styles.buttonRight}>
        <Button onPress={() => { onMesCharges3(); }} style={{ width: 150 }}>
          Envoyer
        </Button>
      </View>

      <Text category="h6">
        {`Selected Option: ${selectedIndex + 1}`}
      </Text>

    </Layout>

  );
};

export default MesCharges2;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    marginVertical: 12,
    backgroundColor: '#f6f6f6',
  },
  containerRadio: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    backgroundColor: 'transparent',
  },
  buttonRight: { marginTop: 36, alignItems: 'flex-end' },
  title: {
    fontSize: 25,
    marginTop: 13,
    letterSpacing: 0.2,
    fontFamily: 'HouschkaRoundedDemiBold',
  },
});
