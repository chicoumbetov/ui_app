import { TransitionConfig, View as MotiView } from 'moti';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Icon as IconUIKitten, IconProps as IconPropsUIKitten } from '@ui-kitten/components';
import { SvgProps } from 'react-native-svg';
import Icon, { IconProps } from './Icon';

type IcomoonOnly = (IconProps & {
  uikitten?: false;
});

type UIKittenOnly = (IconPropsUIKitten<SvgProps> & {
  uikitten: true;
});

type RotatingIconProps = (IcomoonOnly | UIKittenOnly) & { state?: boolean;
  startRotation?: string;
  endRotation?: string;
  transition?: TransitionConfig;
  viewStyle?: StyleProp<ViewStyle>;
};

const RotatingIcon = (props: RotatingIconProps) => {
  const {
    state = false,
    startRotation = '0deg',
    endRotation = '180deg',
    transition = {
      type: 'timing',
      duration: 500,
    },
    viewStyle,
    uikitten,
    ...iconProps
  } = props;
  return (
    <MotiView
      from={{
        rotate: state ? startRotation : endRotation,
      }}
      animate={{
        rotate: state ? endRotation : startRotation,
      }}
      transition={transition}
      style={viewStyle}
    >
      {/* Dans le cas de Icomoon on à uikitten === false ou undefined (cf. type)
      @ts-expect-error */}
      {!uikitten ? <Icon {...iconProps} /> : <IconUIKitten {...iconProps} />}
    </MotiView>
  );
};

export default RotatingIcon;
