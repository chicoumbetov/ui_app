import React from 'react';
import { Platform } from 'react-native';
import { WebView as OriginalWebView } from 'react-native-webview';

type WebViewProps = {
  src: string;
};

export default function WebView(props: WebViewProps): JSX.Element {
  const { src } = props;
  return (Platform.OS === 'web'
    ? (<iframe title="webview" src={src} style={{ flex: 1, border: 'none' }} />)
    : (
      <OriginalWebView
        useWebKit
        source={{ uri: src }}
      />
    ));
}
