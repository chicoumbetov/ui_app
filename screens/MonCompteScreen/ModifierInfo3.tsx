import React from 'react';
import {
  ScrollView, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { useLinkTo, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import ManAvatar from '../../assets/Omedom_Icons_svg/Avatars/manAvatar.svg';
import WomanAvatar from '../../assets/Omedom_Icons_svg/Avatars/womanAvatar.svg';

const Informations = () => {
  const [value, setValue] = React.useState('');
  const navigation = useNavigation();
  const linkTo = useLinkTo();

  const onPress = () => {
    linkTo('/');
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

      <Text category="h1" style={styles.title}>Modifier vos informations</Text>
      <Text category="h2">Changer votre photo de profil</Text>
      <Layout style={{
        alignItems: 'center', backgroundColor: 'transparent', marginVertical: 45,
      }}
      >
        <ManAvatar height={140} width={140} style={{ marginTop: 8 }} />
      </Layout>

      <TouchableOpacity onPress={() => {}}>
        <Text category="h5" appearance="hint">Choisir une icone</Text>
      </TouchableOpacity>

      <Layout style={{
        flexDirection: 'row', marginTop: 21, justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'transparent',
      }}
      >
        <ManAvatar height={50} width={50} />
        <WomanAvatar height={50} width={50} />
      </Layout>

      <TouchableOpacity onPress={() => { onTakePicture(); }} style={{ marginVertical: 39 }}>
        <Text category="h5" status="info">Prendre une photo</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
        <TouchableOpacity onPress={() => { pickImage(); }}>
          <Text category="h5" status="info">Ajouter une photo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text category="h5" status="basic">Supprimer la photo</Text>
        </TouchableOpacity>
      </View>

      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 36,
      }}
      >
        <TouchableOpacity onPress={() => {}}>
          <Text category="h5" status="basic">Ignorer</Text>
        </TouchableOpacity>
        <Button onPress={onPress} size="large">
          Valider
        </Button>
      </View>

    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    margin: 22,
    backgroundColor: 'transparent',
  },
  title: {
    marginTop: 18,
    marginBottom: 27,
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
