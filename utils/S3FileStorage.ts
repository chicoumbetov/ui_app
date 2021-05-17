/**
 * Fonctions de Gestion Storage local et cloud s3
 *
 * @author: Randy Larzabal
 */

import * as FileSystem from 'expo-file-system';
import { Storage } from 'aws-amplify';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { useEffect } from 'react';
import { ImagePickerResult } from 'expo-image-picker';
import { DocumentResult } from 'expo-document-picker';
import { v4 as uuid } from 'uuid';
import { useNetworkInfo } from './CustomHooks';

const MimeType = require('mime-type/with-db');

export const waitingDirectory = 'waitingFile/';

const UploadPendingDocs = async () => {
  const allKey = await AsyncStorage.getAllKeys();
  const goodKey: (number | string)[] = [];
  allKey.forEach((value) => {
    if (value.includes('@S3Object_')) {
      goodKey.push(value);
    }
  });
  goodKey.forEach(async (value) => {
    let JsonObject;
    if (typeof value === 'string') {
      JsonObject = JSON.parse((await AsyncStorage.getItem(value)) as string);
    }
    await UploadInternal(
      FileSystem.documentDirectory + waitingDirectory + JsonObject.key,
      JsonObject.key, value as string,
    );
  });
};

// envoie les fichier sur le cloud 1 par 1
const UploadInternal = async (
  uri: string,
  key: string,
  storageKey?: string,
  deleteTempFile?: boolean,
) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (fileInfo.exists) {
      await Storage.put(key, blob, {
        contentType: blob.type,
        progressCallback(progress: any) {
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
        },
      });
    }
    if (deleteTempFile) {
      await FileSystem.deleteAsync(uri);
    }
    if (storageKey) {
      await AsyncStorage.removeItem(storageKey);
    }
    return true;
  } catch (err) {
    console.log(`error:${err}`);
  }
  return false;
};

export function useAutoFileStorage() {
  const networkinfo = useNetworkInfo();

  useEffect(() => {
    if (networkinfo === true && Platform.OS !== 'web') {
      UploadPendingDocs();
    }
  }, [networkinfo]);
}

export const Upload = async (file: ImagePickerResult | DocumentResult, path?: string) => {
  // on normalise l'objet en fonction du cas
  let found = false;
  let finalFile: { name: string, uri: string } = { name: '', uri: '' };
  if ('cancelled' in file && !file.cancelled) {
    found = true;
    finalFile = {
      name: getFilename(file.uri),
      uri: file.uri,
    };
    // on est dans le cas d'un resultat de ImagePicker
  } else if ('type' in file && file.type === 'success') {
    found = true;
    // on est dans le cas d'un resultat de DocumentPicker
    finalFile = {
      name: file.name,
      uri: file.uri,
    };
  }
  if (!found) {
    return false;
  }

  const extension = finalFile.name.split('.');
  const uuidKey = uuid();
  const key = `${path}${uuidKey}.${extension}`;
  const inputData = {
    key,
    ...finalFile,
  };
  if (Platform.OS === 'web') {
    const success = await UploadInternal(finalFile.uri, key);
    if (success) {
      return inputData;
    }
  } else {
    const uri = FileSystem.documentDirectory + waitingDirectory + key;
    const storageKey = `@S3Object_${uuidKey}`;
    try {
      await FileSystem.copyAsync({
        from: finalFile.uri,
        to: uri,
      });
      await AsyncStorage.setItem(`@S3Object_${uuidKey}`, JSON.stringify(inputData));
      UploadInternal(uri, key, storageKey, true);
      return inputData;
    } catch (err) {
      console.log('error: ', err);
    }
  }
  return false;
};

const getFilename = (filePath: string) => {
  if (filePath.indexOf('data:') > -1) {
    const ext = MimeType.extension(filePath.split(';')[0].replace('data:', ''));
    return `${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}.${ext}`;
  }
  return filePath.replace(/^.*[\\/]/, '');
};
