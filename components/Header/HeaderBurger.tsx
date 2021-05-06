import React from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Icon from '../Icon';

const HeaderBurger = () => {
  const navigation = useNavigation();
  // onPress !== undefined ? onPress :
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.dispatch(DrawerActions.toggleDrawer());
      }}
      style={{
        marginTop: -1,
        marginHorizontal: 21,
      }}
    >
      <Icon name="menu-outline" status="primary" size={33} />
    </TouchableOpacity>
  );
};

export default HeaderBurger;
