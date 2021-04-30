import React from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import {
  Button, Input, Layout, Text,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const Informations = () => {
  const [prenom, setPrenom] = React.useState('');
  const [nom, setNom] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [motDePasee, setMotDePasse] = React.useState('');
  const [numeroTel, setNumeroTel] = React.useState('');

  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('ModifierInfo2');
  };

  return (
    <Layout style={styles.container}>
      <View>
        <Text style={styles.title}>Modifier vos informations</Text>
      </View>

      <Input
        style={styles.inputStyle}
        placeholder="Changer prènom"
        value={prenom}
        onChangeText={(nextValue) => setPrenom(nextValue)}
      />
      <Input
        style={styles.inputStyle}
        placeholder="Changer nom"
        value={nom}
        onChangeText={(nextValue) => setNom(nextValue)}
      />
      <Input
        style={styles.inputStyle}
        placeholder="Changer email"
        value={email}
        onChangeText={(nextValue) => setEmail(nextValue)}
      />
      <Input
        style={styles.inputStyle}
        placeholder="Changer mot de Passe"
        value={motDePasee}
        onChangeText={(nextValue) => setMotDePasse(nextValue)}
      />
      <Input
        style={styles.inputStyle}
        placeholder="Changer numéro télephone"
        value={numeroTel}
        onChangeText={(nextValue) => setNumeroTel(nextValue)}
      />

      <View style={styles.buttonRight}>
        <Button onPress={onPress} style={{ width: 150 }}>
          Valider
        </Button>
      </View>

    </Layout>

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
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  buttonRight: { alignItems: 'flex-end' },
  title: {
    marginTop: 12,
    marginBottom: 39,
    fontSize: 25,
    fontWeight: '300', // not working fix it
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#000000',
  },
});

export default Informations;
