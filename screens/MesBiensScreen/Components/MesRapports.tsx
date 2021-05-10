import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Layout, Text } from '@ui-kitten/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  StyleSheet,
} from 'react-native';

const MesRapports = () => {
  const navigation = useNavigation();

  const allerDetailsBien = () => {
    navigation.navigate('DetailsBien');
  };
  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: '#efefef' }}
    >

      {/**
      *  I part
      */}
      <Layout style={[styles.container, { marginTop: 0 }]}>
        <Text category="h1" status="basic" style={{ marginBottom: 30 }}>
          Partager le bien
        </Text>
      </Layout>
    </KeyboardAwareScrollView>
  );
};

export default MesRapports;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
    marginTop: 12,
    paddingVertical: 25,
    paddingHorizontal: 26,
  },
});
