import { CheckBox, Icon, Text } from '@ui-kitten/components';
import React from 'react';
import * as Sharing from 'expo-sharing';
import { Platform, View } from 'react-native';
import { Storage } from 'aws-amplify';
import * as FileSystem from 'expo-file-system';
import { DocumentItem } from '../src/API/Document';
import Card from './Card';
import { waitingDirectory } from '../utils/S3FileStorage';

type DocumentProps = {
  supprimer?: boolean,
  document: DocumentItem | null
  onCheck?: (checked: boolean) => void,
  checked?: boolean };

const DocumentComponent = (props: DocumentProps) => {
  const {
    document, supprimer = false, checked = false, onCheck,
  } = props;
  // console.log('props', props);

  const shareDoc = async () => {
    if (document) {
      try {
        const url = await Storage.get(document.s3file);
        if (Platform.OS === 'web') {
          window.open(url as string);
        } else {
          const directory = `${FileSystem.cacheDirectory + waitingDirectory}temp/`;

          try {
            await FileSystem.makeDirectoryAsync(
              directory,
              { intermediates: true },
            );
          } catch (e) {
            console.log('Document Component error : ', e);
          }

          const downloaded = await FileSystem.downloadAsync(
            url as string,
            directory + encodeURIComponent(document.name),
          );
          if (downloaded.uri) {
            await Sharing.shareAsync(downloaded.uri);
            await FileSystem.deleteAsync(downloaded.uri);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  // console.log('document component', document);

  return (document ? (
    <Card
      onPress={() => { shareDoc(); }}
      style={{
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15,
      }}
    >
      {supprimer && (
      <View style={{ justifyContent: 'center', paddingHorizontal: 14, width: 50 }}>
        <CheckBox
          checked={checked}
          status="danger"
          onChange={(nextChecked) => {
            if (onCheck) {
              onCheck(nextChecked);
            }
          }}
        />
      </View>
      )}
      <Text category="p2" style={{ flex: 1 }}>
        {document.name}
      </Text>
      <Icon name="eye" fill="#b5b5b5" style={{ height: 20, width: 20 }} />
    </Card>
  ) : (<></>)
  );
};

export default DocumentComponent;
