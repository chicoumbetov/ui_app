import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Layout, Text } from '@ui-kitten/components';

import {
  StyleSheet,
} from 'react-native';
import MaxWidthContainer from '../../../components/MaxWidthContainer';

const MesRapports = () => {
  const navigation = useNavigation();

  const allerDetailsBien = () => {
    navigation.navigate('DetailsBien');
  };

  useEffect(() => {
    console.log('useEffect of MesRapports component');
  });

  return (
    <MaxWidthContainer outerViewProps={{
      style: {
        backgroundColor: '#efefef',
      },
    }}
    >

      {/**
      *  I part
      */}
      <Layout style={styles.container}>
        <Text category="h1" status="basic" style={{ marginBottom: 30 }}>
          Partager le bien
        </Text>
      </Layout>
    </MaxWidthContainer>
  );
};

export default MesRapports;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
    marginBottom: 12,
    paddingVertical: 25,
    paddingHorizontal: 26,
  },
});
