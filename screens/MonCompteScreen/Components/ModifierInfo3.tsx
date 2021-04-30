import React from 'react';
import {
  Image, ScrollView, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const Informations = () => {
  const [value, setValue] = React.useState('');
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('MonCompte');
  };

  const onTakePicture = () => (navigation.navigate('CameraDom'));

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
    } catch (e) {
      console.log('pickImage error: ', e);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View>
        <Text style={styles.title}>Modifier vos informations</Text>
      </View>
      <Text style={{ fontSize: 20 }}>Changer votre photo de profil</Text>
      <Layout style={{
        alignItems: 'center', backgroundColor: 'transparent', marginVertical: 45,
      }}
      >
        <Image
          source={require('../../../assets/Icones_omedom/avatars/avatar_1.png')}
          style={{ marginTop: 8, height: 140, width: 140 }}
        />

      </Layout>

      <TouchableOpacity onPress={() => {}}>
        <Text style={{ fontSize: 17, color: '#b5b5b5' }}>Choisir une icone</Text>
      </TouchableOpacity>

      <Layout style={{
        flexDirection: 'row', marginTop: 21, justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'transparent',
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

      <TouchableOpacity onPress={() => { onTakePicture(); }} style={{ marginVertical: 39 }}>
        <Text style={styles.button}>Prendre une photo</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
        <TouchableOpacity onPress={() => { pickImage(); }}>
          <Text style={styles.button}>Ajouter une photo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={{ fontSize: 17.5, color: '#000' }}>Supprimer la photo</Text>
        </TouchableOpacity>
      </View>

      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 36,
      }}
      >
        <TouchableOpacity onPress={() => {}}>
          <Text style={{ fontSize: 19, color: '#000' }}>Ignorer</Text>
        </TouchableOpacity>
        <Button onPress={onPress} style={{ width: 147 }}>
          Valider
        </Button>
      </View>

    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    margin: 22,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
  title: {
    marginTop: 18,
    marginBottom: 27,
    fontSize: 23,
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
