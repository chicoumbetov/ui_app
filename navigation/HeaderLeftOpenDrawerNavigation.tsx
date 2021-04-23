import React from 'react';
import { DrawerActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import LogoPicture from '../components/LogoPicture/LogoPicture';

const HeaderLeftOpenDrawerNavigation = ({ navigation }) => (

  <TouchableOpacity style={{ marginRight: 18 }} onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()); }}>
    <LogoPicture />
  </TouchableOpacity>

);

export default HeaderLeftOpenDrawerNavigation;
