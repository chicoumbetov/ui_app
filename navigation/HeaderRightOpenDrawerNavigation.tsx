import React from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { colors } from '../assets/styles';

const HeaderRightOpenDrawerNavigation = () => {
  const navigation = useNavigation();
  // onPress !== undefined ? onPress :
  return (
    <TouchableOpacity onPress={() => {
      navigation.dispatch(DrawerActions.toggleDrawer());
    }}
    >
      <Ionicons name="menu" size={37} color={colors.green} />
    </TouchableOpacity>
  );
};

export default HeaderRightOpenDrawerNavigation;
