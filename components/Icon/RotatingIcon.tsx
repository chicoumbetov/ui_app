import { TransitionConfig, View as MotiView } from 'moti';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Icon, { IconProps } from './Icon';

type RotatingIconProps = IconProps & {
  state?: boolean;
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
      <Icon {...iconProps} />
    </MotiView>
  );
};

export default RotatingIcon;
