import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const HeaderLeftOpenDrawerNavigation = ({ navigation }) => (

  <TouchableOpacity onPress={() => { navigation.onBack(); }}>
    <AntDesign name="arrowleft" size={30} style={{ color: '#b5b5b5' }} />
  </TouchableOpacity>

);

export default HeaderLeftOpenDrawerNavigation;
