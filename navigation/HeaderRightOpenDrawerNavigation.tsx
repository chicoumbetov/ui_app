import React from 'react';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const HeaderRightOpenDrawerNavigation = ({ navigation }) => (

  <TouchableOpacity onPress={() => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  }}
  >
    <Ionicons name="menu" size={37} />
  </TouchableOpacity>

);

export default HeaderRightOpenDrawerNavigation;
