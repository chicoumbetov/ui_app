import React, { useEffect, useState } from 'react';
import {
  Layout, RadioGroup, Radio, Text, Button,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TextInput, View } from 'react-native';
import TextInputComp from '../../../components/Form/TextInput';
import { colors } from '../../../assets/styles';

const MesCharges2 = ({ charges }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [dateCharge, setDateCharge] = useState('');

  const navigation = useNavigation();

  const onMesCharges3 = () => {
    navigation.navigate('MesCharges3');
  };

  useEffect(() => {
    console.log('useEffect test of MesCharges 2');
  });

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
        <Radio status="info" style={{ marginRight: 31 }}>
          <Text style={{ fontSize: 17 }}>Année</Text>
        </Radio>
        <Radio style={{ marginRight: 20 }}>
          <Text style={{ fontSize: 17 }}>Année - 1</Text>
        </Radio>
        <Radio>
          <Text style={{ fontSize: 17 }}>Mois</Text>
        </Radio>
      </RadioGroup>

      <Layout style={{
        flexDirection: 'row', backgroundColor: 'transparent', marginTop: 10, justifyContent: 'space-between',
      }}
      >
        <Text
          style={{
            flex: 1,
            fontSize: 17,
            letterSpacing: 0.017,
            fontFamily: 'HouschkaRoundedMedium',
            color: colors.gris,
            paddingTop: 33,

          }}
        >
          Selectionner l'année
        </Text>
        <TextInput
          placeholder="dd/mm/yyyy"
          style={{
            width: 173, borderRadius: 5, marginTop: 18, paddingHorizontal: 16, paddingVertical: 13, backgroundColor: colors.blanc, borderColor: 'transparent',
          }}
        />
      </Layout>

      <View style={styles.buttonRight}>
        <Button onPress={() => { onMesCharges3(); }} style={{ width: 173, borderRadius: 9 }}>
          <Text style={{ fontSize: 17, letterSpacing: 0.15, color: colors.blanc }}>Valider</Text>
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
    padding: 22,
    marginVertical: 12,
    backgroundColor: '#f6f6f6',
  },
  containerRadio: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 30,
    backgroundColor: 'transparent',
  },
  buttonRight: { marginTop: 34, alignItems: 'flex-end' },
  title: {
    fontSize: 25,
    marginTop: 13,
    letterSpacing: 0.2,
    fontFamily: 'HouschkaRoundedDemiBold',
  },
});
