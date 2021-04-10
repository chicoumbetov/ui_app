import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

function createIconsMap() {
  return new Proxy({}, {
    get(target, name) {
      return IconProvider(name);
    },
  });
}

const FeatherIconsPack = {
  name: 'feather',
  icons: createIconsMap(),
};

function FeatherIcon({ name, style }) {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return (
  // eslint-disable-next-line react/jsx-filename-extension
    <Icon name={name} size={height} color={tintColor} style={iconStyle} />
  );
}

const IconProvider = (name) => ({
  toReactElement: (props) => FeatherIcon({ name, ...props }),
});

export default FeatherIconsPack;
