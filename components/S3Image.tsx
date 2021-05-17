/**
 *
 *
 * @author: David-Julian Buch
 */

import * as React from 'react';
import {
  Platform,
  View,
} from 'react-native';

import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { Storage } from 'aws-amplify';
import Image, { ImageProps } from './Image';
import ActivityIndicator from './ActivityIndicator';
import { waitingDirectory } from '../utils/S3FileStorage';

type S3ImageProps = Omit<ImageProps, 'uri'> & {
  s3key: string
};

export default function S3Image(props: S3ImageProps): JSX.Element {
  const {
    s3key, ...otherProps
  } = props;
  const [uri, setUri] = useState<false | string>(false);

  useEffect(() => {
    let isMounted = true;
    if (uri) {
      setUri(false);
    }
    (async () => {
      if (Platform.OS !== 'web') {
        // on regarde s'il existe encore le fichier dans le cache d'upload
        const uuid = extractUUID(s3key);
        const value = `@S3Object_${uuid}`;

        const stored = await AsyncStorage.getItem(value);
        if (stored) {
          const infos = JSON.parse(stored);
          if (isMounted) {
            setUri(FileSystem.documentDirectory + waitingDirectory + infos.key);
          }
        } else {
          const url = await Storage.get(s3key);
          if (isMounted) {
            setUri(url as string);
          }
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [s3key]);

  if (!uri) {
    return (
      <View style={otherProps.style}><ActivityIndicator /></View>
    );
  }

  return (
    <Image {...otherProps} uri={uri} />
  );
}

const extractUUID = (key: string) => {
  const lastPathItem = key.split('/').pop();
  const uuid = lastPathItem?.split('.').shift();
  return uuid;
};
