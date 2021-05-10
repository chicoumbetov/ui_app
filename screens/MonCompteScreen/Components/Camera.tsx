import React, { useState, useEffect, useRef } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@ui-kitten/components';

import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';

export default function CameraDom() {
  const camera = useRef();
  const theme = useTheme();
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const flipCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    );
  };

  const onTakePic = async () => {
    const data = await camera.current.takePictureAsync();

    console.log(data.uri);
    navigation.navigate('CreatePost', { videoUri: data.uri });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    console.log('result: ', result);
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
                // onRecord={() => setIsRecording(true)}
                // onRecord={() => setIsRecording(false)}
                // stopRecording={() => setIsRecording(false)}
        style={styles.camera}
        type={type}
      >
        <View style={styles.buttonContainer}>
          <View style={styles.buttonFlip}>
            <TouchableOpacity
              style={styles.flipIcon}
              onPress={flipCamera}
            >
              <Ionicons name="camera-reverse-outline" size={30} />
            </TouchableOpacity>
          </View>

          <View style={styles.recordBorder}>
            <TouchableOpacity
              style={styles.buttonRecord}
              onPress={onTakePic}
            />
          </View>

          <View style={styles.buttonGallery}>
            <TouchableOpacity
              onPress={pickImage}
              style={styles.galleryIcon}
            >
              <IconUIKitten
                name="image-outline"
                fill={theme['color-info-900']}
                style={{
                  height: 30, width: 30,
                }}
              />
            </TouchableOpacity>
          </View>

        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },

  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  buttonFlip: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 5,
    marginHorizontal: 10,
  },
  flipIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordBorder: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    width: 55,
    borderRadius: 50,
  },
  buttonRecord: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: 45,
    width: 45,
    backgroundColor: 'red',
    borderRadius: 50,
  },
  text: {
    fontSize: 20,
  },
  buttonGallery: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 60,
    backgroundColor: 'white',
    padding: 5,
    marginHorizontal: 10,
  },
  galleryIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
