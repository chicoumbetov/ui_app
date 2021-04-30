import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

const LogoPicture = () => (
  <View>
    <Image
      style={styles.tinyLogo}
      source={require('../../assets/Icones_omedom/logo_menu_principal.png')}
    />
  </View>
);

const styles = StyleSheet.create({

  tinyLogo: {
    width: 62,
    height: 62,
  },
});

export default LogoPicture;
