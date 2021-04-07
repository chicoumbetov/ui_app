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
    width: 50,
    height: 50,
  },
});

export default LogoPicture;
