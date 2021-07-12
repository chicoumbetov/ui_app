import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  Alert, Animated, Platform, StyleSheet, TouchableOpacity, View, ViewStyle,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';
import { Camera as OriginalCamera } from 'expo-camera';
import { useKeepAwake } from 'expo-keep-awake';
import { useDimensions } from '@react-native-community/hooks';
import { PinchGestureHandler, PinchGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { useTheme, Icon as UIKittenIcon } from '@ui-kitten/components';
import Text from '../Text';

import { durationToStr } from '../../utils/TimeHelper';
import ActivityIndicator from '../ActivityIndicator';
import SafeAreaView from '../SafeAreaView';
import Image from '../Image';
import NotImplementedScreen from '../../screens/NotImplementedScreen';
import UIKittenIconButton from '../Icon/UIKittenIconButton';

import WbAuto from './WbIcons/WbAuto.svg';
import WbCloudy from './WbIcons/WbCloudy.svg';
import WbIncandescent from './WbIcons/WbIncandescent.svg';
import WbIridescent from './WbIcons/WbIridescent.svg';
import WbShadow from './WbIcons/WbShadow.svg';
import WbSunny from './WbIcons/WbSunny.svg';

type RecordingMode = 'video' | 'image';

export type CameraOutput = {
  uri: string;
  portrait?: boolean;
  height: number;
  width: number;
} | null;

type CameraProps = {
  onClose: (cancel?: boolean) => void;
  onChoose: (input: CameraOutput) => void;
  recordingMode?: RecordingMode;
  ratio?: [number, number];
  quality?: string;
  maxDuration?: number;
  minDuration?: number;
  frontCamera?: boolean;
  withPreview?: boolean;
  maxWidth?: number;
  maxHeight?: number;
  compress?: number;
};

type WhiteBalanceList = {
  auto: string;
  sunny: string;
  cloudy: string;
  shadow: string;
  fluorescent: string;
  incandescent: string;
};

type WhiteBalanceKeyList = {
  auto: keyof WhiteBalanceKeyList;
  sunny: keyof WhiteBalanceKeyList;
  cloudy: keyof WhiteBalanceKeyList;
  shadow: keyof WhiteBalanceKeyList;
  fluorescent: keyof WhiteBalanceKeyList;
  incandescent: keyof WhiteBalanceKeyList;
};

const wbOrder: WhiteBalanceKeyList = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};

const DESIRED_RATIO = '16:9';

export default function Camera(props: CameraProps): JSX.Element {
  const camera = useRef<OriginalCamera | null>(null);
  const video = useRef<Promise<{ uri: string }> | undefined>();
  const theme = useTheme();
  const { screen } = useDimensions();
  const {
    recordingMode = 'image', withPreview = true, maxWidth, maxHeight, compress = 1,
  } = props;

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(
    // eslint-disable-next-line react/destructuring-assignment
    props.frontCamera ? OriginalCamera.Constants.Type.front : OriginalCamera.Constants.Type.back,
  );
  const [flashMode, setFlashMode] = useState(OriginalCamera.Constants.FlashMode.off);
  const [showGrid, setShowGrid] = useState(false);
  const [whiteBalance, setWhiteBalance] = useState<keyof WhiteBalanceKeyList>('auto');
  const [zoom, setZoom] = useState(0);
  const [currentImage, setCurrentImage] = useState<CameraOutput | null>(null);
  const [currentVideo, setCurrentVideo] = useState<CameraOutput | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [duration, setDuration] = useState(0);
  const [lastDistance, setLastDistance] = useState(1);
  const [ratio, setRatio] = useState<string>();
  const [durationInterval, setDurationInterval] = useState<number | undefined>();

  const toggleFlash = () => {
    const { on, off, torch } = OriginalCamera.Constants.FlashMode;
    // eslint-disable-next-line no-nested-ternary
    setFlashMode(flashMode === on || flashMode === torch ? off : recordingMode === 'video' ? torch : on);
  };

  const toggleGrid = () => {
    setShowGrid(!showGrid);
  };

  const toggleCamera = () => {
    const { front, back } = OriginalCamera.Constants.Type;
    setType(type === back ? front : back);
  };

  const toggleWB = () => {
    setWhiteBalance(wbOrder[whiteBalance]);
  };

  const prepareRatio = async () => {
    if (Platform.OS === 'android' && camera.current) {
      const ratios = await camera.current.getSupportedRatiosAsync();

      // See if the current device has your desired ratio, otherwise get the maximum supported one
      // Usually the last element of "ratios" is the maximum supported ratio

      // eslint-disable-next-line @typescript-eslint/no-shadow
      setRatio(ratios.find((ratio) => ratio === DESIRED_RATIO) || ratios[ratios.length - 1]);
    }
  };

  const setClampedZoom = (v: number) => {
    let value = v;
    if (v < 0) {
      value = 0;
    } else if (v > 1) {
      value = 1;
    }
    setZoom(value);
  };

  const renderWBIcon = (name: keyof WhiteBalanceList) => {
    switch (name) {
      case 'cloudy':
        return <WbCloudy fill="white" width={25} height={25} />;
        break;
      case 'fluorescent':
        return <WbIridescent fill="white" width={25} height={25} />;
        break;
      case 'incandescent':
        return <WbIncandescent fill="white" width={25} height={25} />;
        break;
      case 'shadow':
        return <WbShadow fill="white" width={25} height={25} />;
        break;
      case 'sunny':
        return <WbSunny fill="white" width={25} height={25} />;
        break;
      case 'auto':
      default:
        return <WbAuto fill="white" width={25} height={25} />;
        break;
    }
  };

  const takePicture = async () => {
    if (camera.current) {
      if (recordingMode === 'video') {
        if (isRecording && video.current) {
          camera.current.stopRecording();
          setIsSaving(true);
          setIsRecording(false);
          clearInterval(durationInterval);
          const { uri } = await video.current;

          const asset = await MediaLibrary.createAssetAsync(uri);
          const assetInfo = await MediaLibrary.getAssetInfoAsync(asset);

          if (props.minDuration !== undefined) {
            if (props.minDuration > duration / 1000) {
              Alert.alert(
                'Erreur',
                `Votre vidéo doit durer un minimum de ${props.minDuration} secondes !`,
              );
              cancelChoice();
              return;
            }
            if (assetInfo.duration < props.minDuration) {
              Alert.alert(
                'Erreur',
                `Votre vidéo doit durer un minimum de ${props.minDuration} secondes !`,
              );
              cancelChoice();
              return;
            }
          }
          const portrait = assetInfo.height > assetInfo.width;
          /* if (Platform.OS === "android") {
                        //car bug actuellement sur android : https://github.com/expo/expo/issues/3744
                        const orientation = await ScreenOrientation.getOrientationAsync();
                        console.log(orientation);
                        portrait =
                            orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN ||
                            orientation === ScreenOrientation.Orientation.PORTRAIT_UP;
                    } */
          console.log(portrait);
          onVideoSaved({
            uri, portrait, height: assetInfo.height, width: assetInfo.width,
          });
        } else {
          setDuration(0);
          setIsRecording(true);
          const interval = setInterval(() => {
            setDuration(duration + 100);
          }, 100);
          // @ts-ignore
          setDurationInterval(interval);
          const { quality = '1080p', maxDuration } = props;
          video.current = camera.current.recordAsync({ quality, maxDuration });
        }
      } else {
        setIsSaving(true);
        const photo = await camera.current.takePictureAsync({
          exif: true,
          skipProcessing: false,
          base64: false,
        });
        const croper = calculateCropElements(photo.width, photo.height);
        const actions: Array<ImageManipulator.Action> = [
          {
            crop: {
              originX: croper.x,
              originY: croper.y,
              width: croper.newWidth,
              height: croper.newHeight,
            },
          },
        ];
        if (maxWidth || maxHeight) {
          if (maxWidth && maxWidth < croper.newWidth) {
            actions.push({
              resize: { width: maxWidth },
            });
          } else if (maxHeight && maxHeight < croper.newHeight) {
            actions.push({
              resize: { height: maxHeight },
            });
          }
        }
        const manipResult = await ImageManipulator.manipulateAsync(
          photo.uri,
          actions,
          { compress, format: ImageManipulator.SaveFormat.JPEG, base64: false },
        );
        if (withPreview) {
          setCurrentImage({
            uri: manipResult.uri,
            height: manipResult.height,
            width: manipResult.width,
          });
          setIsSaving(false);
        } else {
          acceptChoice({
            uri: manipResult.uri,
            height: manipResult.height,
            width: manipResult.width,
          });
        }
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const onVideoSaved = async (video: CameraOutput) => {
    if (withPreview) {
      setCurrentVideo(video);
      setIsSaving(false);
    } else {
      acceptChoice(video);
    }
  };

  const calculateCropElements = (width: number, height: number) => {
    const splitRatio = props.ratio ?? [9, 16];
    const wantedRatio = splitRatio[0] / splitRatio[1];
    const originalRatio = width / height;
    let newHeight; let newWidth; let x; let
      y;
    if (wantedRatio > originalRatio) {
      newWidth = width;
      x = 0;
      newHeight = Math.round(width / wantedRatio);
      y = Math.round((height - newHeight) / 2);
    } else {
      newHeight = height;
      y = 0;
      newWidth = Math.round(height * wantedRatio);
      x = Math.round((width - newWidth) / 2);
    }

    return {
      newHeight, newWidth, x, y,
    };
  };

  const goBack = (cancel?: boolean) => {
    setCurrentImage(null);
    setCurrentVideo(null);
    setIsRecording(false);
    setIsSaving(false);
    setDuration(0);
    props.onClose(cancel);
  };

  const cancelChoice = () => {
    goBack(true);
  };

  const acceptChoice = (returnElem?: CameraOutput) => {
    returnElem = returnElem || (currentImage !== null ? currentImage : currentVideo);
    if (props.onChoose !== undefined) {
      goBack();
      props.onChoose(returnElem);
    }
  };

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const onPinchGestureEvent = (event: PinchGestureHandlerGestureEvent) => {
    const { scale } = event.nativeEvent;

    if (Math.abs(lastDistance - scale) > 0.01) {
      const calcZoom = zoom + (scale > 1 ? +0.01 : -0.01);
      // eslint-disable-next-line no-nested-ternary
      const newZoom = Math.round((calcZoom > 0 ? (calcZoom < 1 ? calcZoom : 1) : 0) * 1000) / 1000;

      setClampedZoom(newZoom);
      setLastDistance(scale);
    }
  };

  useEffect(() => {
    (async () => {
      const { status: existingStatus } = await OriginalCamera.getPermissionsAsync();
      let finalStatus = existingStatus;

      // only ask if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await OriginalCamera.requestPermissionsAsync();
        finalStatus = status;
      }

      setHasCameraPermission(finalStatus === 'granted');
    })();
  }, []);

  useKeepAwake();

  if (hasCameraPermission === null) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  const { width, height } = screen;

  let cameraHeight = height;
  let cameraWidth = width;
  if (ratio !== undefined) {
    let realRatio = 16 / 9;
    switch (ratio) {
      case '4:3':
        realRatio = 4 / 3;
        break;
      case '1:1':
        realRatio = 1;
        break;
      default:
        realRatio = 16 / 9;
    }
    if (height > width && height - Constants.statusBarHeight >= width * realRatio) {
      cameraWidth = width;
      cameraHeight = width * realRatio;
    } else if (height > width && height - Constants.statusBarHeight < width * realRatio) {
      cameraHeight = height - Constants.statusBarHeight;
      cameraWidth = cameraHeight / realRatio;
    } else if (height < width && height >= width / realRatio) {
      cameraHeight = width / realRatio - Constants.statusBarHeight;
      cameraWidth = cameraHeight * realRatio;
    } else if (height < width && height < width / realRatio) {
      cameraWidth = (height - Constants.statusBarHeight) / realRatio;
      cameraHeight = height;
    }
  }

  const croper = calculateCropElements(cameraWidth, cameraHeight);

  let gridHeight = croper.newHeight;
  let viewHeight = croper.newHeight;
  if (width > height) {
    gridHeight -= 120;
    viewHeight -= 120;
  }
  const gridWidth = croper.newWidth;

  const spacingSmall = parseInt(theme['spacing-small'], 10);
  const calculatedStyles = {
    grid: StyleSheet.flatten<ViewStyle>({
      borderColor: theme['color-basic-600'],
      borderWidth: 1,
      borderBottomWidth: 0,
      width: gridWidth - spacingSmall * 2,
      height: gridHeight - spacingSmall * 2,
    }),
    row: StyleSheet.flatten<ViewStyle>({
      height: (gridHeight - spacingSmall * 2) / 3,
      borderColor: theme['color-basic-600'],
      borderBottomWidth: 1,
      flexDirection: 'row',
    }),
    cell: StyleSheet.flatten<ViewStyle>({
      width: (gridWidth - spacingSmall * 2) / 3,
      height: (gridHeight - spacingSmall * 2) / 3,
      borderColor: theme['color-basic-600'],
      borderRightWidth: 1,
    }),
  };

  if (currentImage !== null || currentVideo !== null) {
    return (
      <SafeAreaView style={StyleSheet.flatten([styles.cameraSafeArea, { width: cameraWidth, backgroundColor: 'black' }])} top>
        <View style={maxWidth ? {
          flexDirection: 'column',
          flexGrow: 1,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'green',
        } : {
          flexDirection: 'column',
          flexGrow: 1,
          flex: 1,
          justifyContent: 'center',
        }}
        >
          <View style={maxWidth ? {
            width: maxWidth,
            maxWidth,
          } : {}}
          >
            {currentImage !== null ? (
              <Image
                uri={currentImage.uri}
                style={{
                  height: viewHeight * 0.8,
                }}
                resizeMode="contain"
              />
            ) : (
              currentVideo !== null && <NotImplementedScreen />
            )}
          </View>
        </View>
        <View style={styles.footer}>
          <UIKittenIconButton fill={theme['color-danger-500']} onPress={() => cancelChoice()} name="close-outline" width={40} height={40} />
          <UIKittenIconButton fill={theme['color-primary-500']} onPress={() => acceptChoice()} name="checkmark-outline" width={40} height={40} />
        </View>
      </SafeAreaView>
    );
  }

  let snapButton = (
    <View style={[styles.innerSnapButton, { backgroundColor: theme['color-primary-600'] }]}>
      <UIKittenIcon
        name={recordingMode === 'video' ? 'video' : 'camera'}
        fill="white"
        width={25}
        height={25}
      />
    </View>
  );
  if (isSaving) {
    snapButton = (
      <ActivityIndicator />
    );
  } else if (isRecording) {
    snapButton = (
      <View style={[styles.innerSnapButton, { backgroundColor: 'transparent' }]}>
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 4,
            backgroundColor: 'red',
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={[
        { flex: 1, justifyContent: 'center' },
        Platform.OS === 'android' ? { alignItems: 'center' } : {},
      ]}
    >
      <OriginalCamera
        style={[
          styles.camera,
          {
            width: cameraWidth,
            height: cameraHeight,
            maxWidth: cameraWidth,
            maxHeight: cameraHeight,
          },
        ]}
        {...{
          type, flashMode, whiteBalance, zoom, ratio,
        }}
        ref={camera}
        /* eslint-disable-next-line max-len */
        onCameraReady={prepareRatio} // You can only get the supported ratios when the camera is mounted
      >
        <SafeAreaView style={styles.cameraSafeArea} top>
          <PinchGestureHandler onGestureEvent={onPinchGestureEvent}>
            <Animated.View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: croper.newWidth + croper.x * 2,
                height: croper.newHeight + croper.y * 2,
                backgroundColor: 'transparent',
                borderColor: recordingMode === 'video' ? 'transparent' : 'rgba(0,0,0,0.6)',
                borderLeftWidth: croper.x,
                borderRightWidth: croper.x,
                borderTopWidth: croper.y,
                borderBottomWidth: croper.y,
                flex: 1,
              }}
            />
          </PinchGestureHandler>
          {showGrid && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View style={calculatedStyles.grid}>
              <View style={calculatedStyles.row}>
                <View style={calculatedStyles.cell} />
                <View style={calculatedStyles.cell} />
              </View>
              <View style={calculatedStyles.row}>
                <View style={calculatedStyles.cell} />
                <View style={calculatedStyles.cell} />
              </View>
              <View style={calculatedStyles.row}>
                <View style={calculatedStyles.cell} />
                <View style={calculatedStyles.cell} />
              </View>
            </View>
          </View>
          )}
          <View style={styles.header}>
            <UIKittenIconButton
              name="grid"
              onPress={toggleGrid}
              fill="white"
              width={25}
              height={25}
            />
            <UIKittenIconButton
              name={flashMode === OriginalCamera.Constants.FlashMode.on
            || flashMode === OriginalCamera.Constants.FlashMode.torch ? 'flash' : 'flash-off'}
              onPress={toggleFlash}
              disabled={isRecording || type === OriginalCamera.Constants.Type.front}
              fill="white"
              width={25}
              height={25}
              style={{
                opacity: isRecording || type === OriginalCamera.Constants.Type.front
                  ? 0 : 1,
              }}
            />
            <TouchableOpacity
              onPress={toggleWB}
              disabled={isRecording}
              style={{
                opacity: isRecording ? 0 : 1,
              }}
            >
              {renderWBIcon(whiteBalance)}
            </TouchableOpacity>
          </View>

          {/* <View style={styles.zoom}>
                        <SliderVertical
                            onValueChange={setClampedZoom}
                        />
                    </View> */}
          <View style={styles.footer}>
            <UIKittenIconButton
              appearance="ghost"
              name="close"
              fill="white"
              width={25}
              height={25}
              onPress={() => goBack(true)}
            />
            <TouchableOpacity onPress={() => takePicture()}>
              {duration > 0 && (
                <View style={{ alignSelf: 'center', marginTop: -15 }}>
                  <Text color="white">{durationToStr(duration)}</Text>
                </View>
              )}
              <View style={styles.snapButton}>
                {snapButton}
              </View>
            </TouchableOpacity>

            <UIKittenIconButton
              name="flip-2"
              onPress={toggleCamera}
              disabled={isRecording}
              fill="white"
              width={25}
              height={25}
              style={{
                opacity: isRecording
                  ? 0 : 1,
              }}
            />
          </View>
        </SafeAreaView>
      </OriginalCamera>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
  },
  cameraSafeArea: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    height: 50,
  },
  footer: {
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  snapButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerSnapButton: {
    width: 52,
    height: 52,
    borderRadius: 25.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoom: {
    position: 'absolute',
    right: 0,
    top: 100,
    bottom: 100,
  },
});
