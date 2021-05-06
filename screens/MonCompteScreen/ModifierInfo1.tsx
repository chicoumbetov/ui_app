import React, { useEffect } from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import {
  Button, Layout, Text,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import TextInputComp from '../../components/Form/TextInput';

const ModifierInfo1 = () => {
  const [prenom, setPrenom] = React.useState('');
  const [nom, setNom] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [motDePasee, setMotDePasse] = React.useState('');
  const [numeroTel, setNumeroTel] = React.useState('');

  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('ModifierInfo2');
  };

  useEffect(() => {
    console.log('useEffect test of ModifierInfo 1');
  });

  return (
    <Layout style={styles.container}>
      <View>
        <Text category="h1" style={styles.title}>Modifier vos informations</Text>
      </View>

      <TextInputComp
        name="prenom"
        placeholder="Changer prènom"
      />

      <Layout style={{ marginTop: 20, backgroundColor: 'transparent' }}>
        <TextInputComp
          name="nom"
          placeholder="Changer nom"
        />
      </Layout>

      <Layout style={{ marginTop: 20, backgroundColor: 'transparent' }}>
        <TextInputComp
          name="email"
          placeholder="Changer email"
        />
      </Layout>

      <Layout style={{ marginTop: 20, backgroundColor: 'transparent' }}>
        <TextInputComp
          name="motDePasse"
          placeholder="Changer mot de Passe"
        />
      </Layout>

      <Layout style={{ marginTop: 20, backgroundColor: 'transparent' }}>
        <TextInputComp
          name="numeroTel"
          placeholder="Changer numéro télephone"
        />
      </Layout>

      <View style={styles.buttonRight}>
        <Button onPress={onPress} size="large" style={{ width: 139 }}>
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
    backgroundColor: 'transparent',
  },
  buttonRight: { alignItems: 'flex-end', marginTop: 34 },
  title: {
    marginTop: 12,
    marginBottom: 39,
  },
});

export default ModifierInfo1;
