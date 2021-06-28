import React, { useState } from 'react';
import {
  Platform,
  StyleSheet, TouchableOpacity, View,
} from 'react-native';
import {
  Button, Modal, Text,
} from '@ui-kitten/components';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import { ImagePickerResult } from 'expo-image-picker';
import MaxWidthContainer from '../../components/MaxWidthContainer';

import ManAvatar from '../../assets/Omedom_Icons_svg/Avatars/manAvatarWait.svg';
import WomanAvatar from '../../assets/Omedom_Icons_svg/Avatars/womanAvatar.svg';
import { TabMonCompteParamList } from '../../types';
import AutoAvatar from '../../components/AutoAvatar';
import Camera from '../../components/Camera';
import { useUser } from '../../src/API/UserContext';
import { Delete, Upload } from '../../utils/S3FileStorage';
import { CameraOutput } from '../../components/Camera/Camera';

const Informations = () => {
  const [camera, setCamera] = React.useState(false);
  const { updateUser, user, userIsCreating } = useUser();
  const [avatarImage, setAvatarImage] = useState(user?.avatarUri || 'default::ManAvatar');
  const [selectedNewImage, setSelectedNewImage] = useState<
  ImagePickerResult |
  CameraOutput |
  undefined
  >();

  const route = useRoute<RouteProp<TabMonCompteParamList, 'modifier-info-3'>>();

  const navigation = useNavigation();

  const onPress = async () => {
    if (updateUser) {
      let avatarUri = avatarImage;
      const toDelete = user && user.avatarUri && user.avatarUri.indexOf('default::') > -1
        ? undefined
        : user?.avatarUri;
      if (toDelete) {
        await Delete(toDelete);
      }
      if (selectedNewImage) {
        const upload = await Upload(selectedNewImage, `user/${user?.id}/`);
        if (upload !== false) {
          avatarUri = upload.key;
        }
      }

      await updateUser({
        avatarUri,
      });
      if (!userIsCreating) {
        navigation.navigate('mon-compte');
      }
    }
  };

  const onTakePicture = () => {
    setCamera(true);
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1, 1],
      });
      if (!result.cancelled) {
        setAvatarImage(result.uri);
        setSelectedNewImage(result);
      }
    } catch (e) {
      console.log('pickImage error: ', e);
    }
  };

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
      }}
      innerViewProps={{
        style: {
          paddingHorizontal: 24,
          paddingVertical: 34,
        },
      }}
    >

      <Text category="h2" style={styles.title}>{route.params?.signUp ? 'Finalisez votre inscription' : 'Modifier vos informations'}</Text>
      <Text category="h3" style={{ marginBottom: 30 }}>Changer votre photo de profil !</Text>
      <View style={{
        alignItems: 'center', marginVertical: 40, marginTop: 8,
      }}
      >
        <AutoAvatar
          style={{
            height: 140, width: 140, borderRadius: 70, overflow: 'hidden',
          }}
          avatarInfo={avatarImage}
        />
      </View>

      <Text category="h5" appearance="hint">Choisir une icone</Text>

      <View style={{
        flexDirection: 'row', marginTop: 21, justifyContent: 'space-around', alignItems: 'center',
      }}
      >
        <TouchableOpacity onPress={() => {
          setAvatarImage('default::ManAvatar');
          setSelectedNewImage(undefined);
        }}
        >
          <ManAvatar height={50} width={50} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setAvatarImage('default::WomanAvatar');
          setSelectedNewImage(undefined);
        }}
        >
          <WomanAvatar height={50} width={50} />
        </TouchableOpacity>

      </View>

      {Platform.OS !== 'web' && (
      <TouchableOpacity
        onPress={() => {
          onTakePicture();
        }}
        style={{ marginVertical: 30 }}
      >
        <Text category="h5" status="info">Prendre une photo</Text>
      </TouchableOpacity>
      )}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
        <TouchableOpacity onPress={() => { pickImage(); }}>
          <Text category="h5" status="info">Ajouter une photo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setAvatarImage('default::ManAvatar');
          setSelectedNewImage(undefined);
        }}
        >
          <Text category="h5" status="basic">Supprimer la photo</Text>
        </TouchableOpacity>
      </View>

      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 25,
      }}
      >
        <TouchableOpacity
          onPress={() => {
            setAvatarImage('default::ManAvatar');
            setSelectedNewImage(undefined);
            onPress();
          }}
        >
          <Text category="h5" status="basic">Ignorer</Text>
        </TouchableOpacity>
        <Button onPress={onPress} size="large" style={{ width: 173 }}>
          Valider
        </Button>
      </View>

      {Platform.OS !== 'web' && (
      <Modal
        visible={camera}
        style={{
          overflow: 'hidden', alignItems: 'center', margin: 0, height: '100%',
        }}
      >
        {camera && (
        <Camera
          onClose={() => {
            setCamera(false);
          }}
          maxWidth={300}
          onChoose={(result) => {
            if (result) {
              setAvatarImage(result.uri);
              setSelectedNewImage(result);
            }
            setCamera(false);
          }}
          withPreview
          ratio={[1, 1]}
        />
        )}
      </Modal>
      )}

    </MaxWidthContainer>

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
  buttonRight: {
    alignItems: 'flex-end',
  },
});

export default Informations;
