import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Button, Input, Text,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import TextInputComp from '../../../components/Form/TextInput';

const Informations = () => {
  const navigation = useNavigation();
  const [dateDeNaissance, setDateDeNaissance] = React.useState('');
  const [adresse, setAdresse] = React.useState('');
  const [adresseComplement, setAdresseComplement] = React.useState('');
  const [codePostal, setCodePostal] = React.useState('');
  const [ville, setVille] = React.useState('');
  const [pays, setPays] = React.useState('');

  const onPress = () => {
    navigation.navigate('ModifierInfo3');
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View>
        <Text style={styles.title}>Modifier vos informations</Text>
      </View>

      <View style={{
        flexDirection: 'row', marginBottom: 35, alignItems: 'center',
      }}
      >
        <View style={{ marginRight: 25 }}>
          <Text style={{ fontSize: 17 }}>Votre date de naissance</Text>
        </View>

        <TextInputComp
          name="dateDeNaissance"
          placeholder="Date de naissance"
        />
      </View>

      <TextInputComp
        name="adresse"
        placeholder="Adresse"
      />
      <TextInputComp
        name="adresseComplement"
        placeholder="Complément d'adresse"
      />

      <TextInputComp
        name="codePostal"
        placeholder="Code postale"
      />
      <TextInputComp
        name="ville"
        placeholder="Ville"
      />
      <TextInputComp
        name="pays"
        placeholder="Pays"
      />

      <View style={styles.buttonRight}>
        <Button onPress={onPress} style={{ width: 150 }}>
          Valider
        </Button>
      </View>

    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 21,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
  inputStyle: {
    borderRadius: 7,
    backgroundColor: '#fff',
    fontWeight: 'normal',
    borderColor: 'transparent',
    marginBottom: 32,
    shadowColor: '#dedede',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  buttonRight: { alignItems: 'flex-end' },
  title: {
    marginTop: 12,
    marginBottom: 39,
    fontSize: 25,
    fontWeight: '800', // not working fix it
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#000000',
  },
  inputStyleDate: {
    flex: 1,
    borderRadius: 7,
    backgroundColor: '#fff',
    fontWeight: 'normal',
    borderColor: 'transparent',
    shadowColor: '#dedede',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
});

export default Informations;
