import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { WebView as OriginalWebView } from 'react-native-webview';

type WebViewProps = {
  src: string;
  onMessage?: (message: string) => void;
};

export default function WebView(props: WebViewProps): JSX.Element {
  const { src, onMessage } = props;

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let listener = (e:any) => {};
    if (onMessage && Platform.OS === 'web') {
      console.log('added');
      listener = (e) => {
        onMessage(e.data);
      };
      window.addEventListener('message', listener);
    }
    return () => {
      if (Platform.OS === 'web') {
        window.removeEventListener('message', listener);
      }
    };
  }, [src, onMessage]);

  if (Platform.OS === 'web') {
    return (
      <iframe
        title="webview"
        src={src}
        style={{ flex: 1, border: 'none' }}
      />
    );
  }

  return (
    <OriginalWebView
      useWebKit
      source={{ uri: src }}
      containerStyle={{ flex: 1 }}
      onMessage={(event) => {
        if (onMessage) {
          onMessage(event.nativeEvent.data);
        }
      }}
    />
  );
}
