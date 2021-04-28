import React from 'react';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { colors } from '../assets/styles';

const HeaderRightOpenDrawerNavigation = ({ navigation, onPress }) => (

  <TouchableOpacity onPress={onPress !== undefined ? onPress : () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  }}
  >
    <Ionicons name="menu" size={37} color={colors.green} />
  </TouchableOpacity>

);

export default HeaderRightOpenDrawerNavigation;
