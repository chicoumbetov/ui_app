import React from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import LogoPicture from '../components/LogoPicture/LogoPicture';

const HeaderLeftOpenDrawerNavigation = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.dispatch(DrawerActions.toggleDrawer());
      }}
    >
      <LogoPicture />
    </TouchableOpacity>
  );
};

export default HeaderLeftOpenDrawerNavigation;
