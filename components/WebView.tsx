import React from 'react';
import { Platform } from 'react-native';
import { WebView as OriginalWebView } from 'react-native-webview';

type WebViewProps = {
  src: string;
  id: string;
  onUrlChange?: (currentUrl: string) => void;
};

export default function WebView(props: WebViewProps): JSX.Element {
  const { src, onUrlChange, id } = props;
  return (Platform.OS === 'web'
    ? (<iframe id={id} title="webview" src={src} style={{ flex: 1, border: 'none' }} onLoad={(e) => { console.log(e, document.getElementById(id).contentWindow.location.pathname); if (onUrlChange) { onUrlChange(); } }} />)
    : (
      <OriginalWebView
        useWebKit
        source={{ uri: src }}
        onNavigationStateChange={({ url }) => {
          console.log('url>>>>>>>>', url);
          if (onUrlChange) { onUrlChange(url); }
        }}
      />
    ));
}
