import React from 'react';
import { Image } from 'react-native';

const IconProvider = (source) => ({
  toReactElement: ({ animation, ...props }) => (
    <Image {...props} source={source} />
  ),
});

const AssetIconsPack = {
  name: 'assets',
  icons: {
    github: IconProvider(require('./assets/Icones_omedom/logements/whiteLogo.png')),
    'color-palette': IconProvider(require('./assets/images/color-palette.png')),
    // ...
  },
};

export default AssetIconsPack;
