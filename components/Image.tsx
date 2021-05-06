/**
 *
 *
 * @author: David-Julian Buch
 */

import * as _ from 'lodash';
import * as React from 'react';
import {
  Image as RNImage,
  ImageProps as RNImageProps,
  ImageStyle,
  Platform,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { useEffect, useState, useRef } from 'react';
import { useTimingTransition } from 'react-native-redash';
import CacheManager from './CacheManager';
import BlurView from './BlurView';
import { useHasChanged } from '../utils/CustomHooks';

type ImageProps = Omit<RNImageProps, 'source' | 'style'> & {
  style: ViewStyle;
  preview?: string;
  uri: string;
};

export default function Image(props: ImageProps): JSX.Element {
  const {
    preview, style, defaultSource, uri, ...otherProps
  } = props;
  const [uriState, setUriState] = useState<string | undefined>();
  const [active, setActive] = useState(false);
  const intensity = useRef(useTimingTransition(active, { duration: 300 })).current;
  const previousState = useHasChanged(uriState);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (uri) {
        // only cache non local uri's
        let path: string | undefined = uri;
        if (uri.indexOf('file://') <= -1) {
          const entry = CacheManager.get(uri);
          path = await entry.getPath();
        }
        if (isMounted) {
          setUriState(path);
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [uri]);

  useEffect(() => {
    if (preview && previousState === undefined) {
      setActive(true);
    }
  }, [uriState]);

  const hasPreview = !!preview;
  const isImageReady = !!uriState;
  const computedStyle = StyleSheet.flatten<ImageStyle>([
    StyleSheet.absoluteFill,
    _.transform(
      _.pickBy(StyleSheet.flatten(style), (_value, key) => propsToCopy.indexOf(key) !== -1),
      (result, value, key) => Object.assign(result, {
        [key]: typeof value === 'number' ? value - (style?.borderWidth || 0) : 0,
      }),
    ),
  ]);
  console.log(isImageReady);
  console.log(uriState);
  console.log(otherProps);
  return (
    <View style={style}>
      {defaultSource && !hasPreview && !isImageReady && (
        <RNImage
          {...otherProps}
          source={defaultSource}
          resizeMode="cover"
          style={[
            computedStyle,
            {
              width: undefined, height: undefined, flex: 1, alignSelf: 'stretch',
            },
          ]}
        />
      )}
      {hasPreview && (
          <RNImage
            source={{ uri: preview }}
            resizeMode="cover"
            style={computedStyle}
            blurRadius={Platform.OS === 'android' ? 0.5 : 0}
          />
      )}
      {isImageReady && <RNImage {...otherProps} source={{ uri: uriState }} style={computedStyle} />}
      {hasPreview && <BlurView style={computedStyle} {...{ intensity }} />}
    </View>
  );
}

const propsToCopy = [
  'borderRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
];