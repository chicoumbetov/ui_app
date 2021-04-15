import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';

const LoginII = () => {
  <Layout>
    <Text>
      LoginII
    </Text>
    <TouchableOpacity onPress={() => navigation.navigate('LoginII')}>
      <Text>
        Login
      </Text>
    </TouchableOpacity>
  </Layout>;
};

export default LoginII;
