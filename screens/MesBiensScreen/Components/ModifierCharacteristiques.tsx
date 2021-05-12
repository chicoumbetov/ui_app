import React from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import {
  Button, Input, Layout, Text,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import TextInputComp from '../../../components/Form/TextInput';
import MaxWidthContainer from '../../../components/MaxWidthContainer';

const Informations = () => {
  const [prenom, setPrenom] = React.useState('');
  const [nom, setNom] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [motDePasee, setMotDePasse] = React.useState('');
  const [numeroTel, setNumeroTel] = React.useState('');

  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('DetailsBien');
  };

  return (
    <MaxWidthContainer>
      <Layout style={styles.container}>
        <View>
          <Text
            category="h2"
            style={{
              marginTop: 12,
              marginBottom: 39,
            }}
          >
            Modifier vos informations
          </Text>
        </View>

        <TextInputComp
          name="localisation"
          placeholder="Changer localisation"
        />
        <TextInputComp
          name="dateAcquisition"
          placeholder="Changer date d'acquisition"
        />
        <TextInputComp
          name="typeDeBien"
          placeholder="Changer type de bien"
        />

        <TextInputComp
          name="nombreDeParts"
          placeholder="Changer nombre de parts"
        />

        <View style={styles.buttonRight}>
          <Button onPress={onPress} style={{ width: 150 }}>
            Valider
          </Button>
        </View>

      </Layout>
    </MaxWidthContainer>
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
  },
});

export default Informations;
