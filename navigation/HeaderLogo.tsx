import React from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Logo from '../assets/logo.svg';

const HeaderLogo = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.dispatch(DrawerActions.toggleDrawer());
      }}
      style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 28 }}
    >
      <Logo height={33} width={30} />
    </TouchableOpacity>
  );
};

export default HeaderLogo;
