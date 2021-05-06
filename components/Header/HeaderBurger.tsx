import React from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@ui-kitten/components';

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
      <Icon name="menu-outline" fill="#5eecb4" style={{ height: 40, width: 40 }} />
    </TouchableOpacity>
  );
};

export default HeaderBurger;
