import React from 'react';
import {
  Image, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import CameraDom from './Camera';

const Informations = ({ route }) => {
  const [value, setValue] = React.useState('');
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('MonCompte');
  };

  const onTakePicture = () => (navigation.navigate('CameraDom'));

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    console.log('result: ', result);
  };

  return (
    <Layout style={styles.container}>
      <View>
        <Text style={styles.title}>Modifier vos informations</Text>
      </View>
      <Text style={{ fontSize: 20 }}>Changer votre photo de profil</Text>
      <Layout style={{ alignItems: 'center', backgroundColor: 'transparent', margin: 20 }}>
        <Image
          source={require('../../../assets/Icones_omedom/avatars/avatar_1.png')}
          style={{ height: 140, width: 140 }}
        />

      </Layout>

      <TouchableOpacity onPress={() => {}} style={{ marginVertical: 30 }}>
        <Text style={{ fontSize: 17, color: '#b5b5b5' }}>Choisir une icone</Text>
      </TouchableOpacity>

      <Layout style={{
        flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'transparent',
      }}
      >
        <Image
          source={require('../../../assets/Icones_omedom/avatars/avatar_1.png')}
          style={{ height: 50, width: 50 }}
        />
        <Image
          source={require('../../../assets/Icones_omedom/avatars/avatar_2.png')}
          style={{ height: 50, width: 50 }}
        />

      </Layout>

      <TouchableOpacity onPress={() => { onTakePicture(); }} style={{ marginVertical: 20 }}>
        <Text style={styles.button}>Prendre une photo</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
        <TouchableOpacity onPress={() => { pickImage(); }}>
          <Text style={styles.button}>Ajouter une photo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={{ fontSize: 17, color: '#000' }}>Supprimer la photo</Text>
        </TouchableOpacity>
      </View>

      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 20,
      }}
      >
        <TouchableOpacity onPress={() => {}}>
          <Text style={{ fontSize: 17, color: '#000' }}>Ignorer</Text>
        </TouchableOpacity>
        <Button onPress={onPress} style={{ width: 150 }}>
          Valider
        </Button>
      </View>

    </Layout>

  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
  title: {
    marginVertical: 30,
    fontSize: 21,
    fontWeight: '300', // not working fix it
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#000000',
  },
  button: {
    fontSize: 17,
    color: '#0076c8',
  },
  buttonRight: {
    alignItems: 'flex-end',
  },
});

export default Informations;
