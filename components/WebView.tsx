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
    const listener = (e) => {
      console.log(e);
    };
    if (onMessage && Platform.OS === 'web') {
      window.addEventListener('onmessage', listener);
    }
    return () => {
      window.removeEventListener('onmessage', listener);
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
      onMessage={(event) => {
        if (onMessage) {
          onMessage(event.nativeEvent.data);
        }
      }}
    />
  );
}
