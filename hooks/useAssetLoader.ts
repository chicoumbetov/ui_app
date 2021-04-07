import { useState, useEffect } from 'react';
import { Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

type AppLoadingProps = {
  startAsync?: () => Promise<void>;
  onError?: (error: Error) => void;
  onFinish?: () => void;
  autoHideSplash?: boolean;
};

export type ImageResource = string | number;

export interface FontsResource {
  [name: string]: number;
}

export interface AssetLoaderConfig {
  images?: ImageResource[];
  fonts?: FontsResource;
}

export interface AssetLoaderState {
  isReady: boolean;
  getAppLoadingProps: () => AppLoadingProps;
}

export { AppLoadingProps };

export default function useAssetLoader(config: AssetLoaderConfig = {}): AssetLoaderState {
  const [isReady, setIsReady] = useState(false);

  useEffect((): void => {
    console.log(SplashScreen);
    SplashScreen.preventAutoHideAsync();
  }, []);

  const loadResourcesRequest = async (): Promise<void> => {
    if (config.images) {
      await cacheImages(config.images);
    }

    if (config.fonts) {
      await cacheFonts(config.fonts);
    }
  };

  const loadResourcesSuccess = (): void => {
    setIsReady(true);
  };

  const loadResourcesFailure = (error: Error): void => {
    throw new Error(`Error loading resources: ${error.message}`);
  };

  return {
    isReady,
    getAppLoadingProps(): AppLoadingProps {
      return {
        startAsync: loadResourcesRequest,
        onFinish: loadResourcesSuccess,
        onError: loadResourcesFailure,
      };
    },
  };
}

function cacheImages(images: ImageResource[]): Promise<(boolean|Asset)[]> {
  return Promise.all(
    images.map(
      (image: ImageResource): Promise<boolean|Asset> => (typeof image === 'string'
        ? Image.prefetch(image)
        : Asset.fromModule(image).downloadAsync()),
    ),
  );
}

function cacheFonts(fonts: FontsResource): Promise<void> {
  return Font.loadAsync(fonts);
}
