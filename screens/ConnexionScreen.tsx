import * as React from 'react';

import { useState } from 'react';
import {
  StyleSheet, View, Image, useWindowDimensions, ScrollView,
} from 'react-native';

import { colors } from '../assets/styles';

// import ActivityIndicator from '../components/ActivityIndicator';

export default function LoginScreen(): JSX.Element {
  const { height: windowHeight } = useWindowDimensions();
  const imageAspectRatio = 853 / 1026;

  // const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView />
      <View style={styles.imageContainer}>
        <Image
          source={Images.fondLogin}
          resizeMode="contain"
          resizeMethod="resize"
          style={{
            flex: 1,
            width: imageAspectRatio * windowHeight,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.drawerBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerScrollView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  formContainer: {
    flex: 1,
  },
  form: {
    maxWidth: 400,
    marginLeft: '5%',
    paddingVertical: 30,
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'flex-end',
    textAlign: 'right',
    zIndex: -1,
  },
  button: {
    backgroundColor: colors.green,
  },
});
