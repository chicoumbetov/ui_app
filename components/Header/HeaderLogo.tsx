import React from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Logo from '../../assets/logo.svg';
import debounce from '../../utils/debounce';

const HeaderLogo = () => {
  const navigation = useNavigation();
  const openDrawer = React.useCallback(
    debounce(() => {
      navigation.dispatch(DrawerActions.openDrawer());
    }, 50),
    [navigation],
  );

  return (
    <TouchableOpacity
      onPress={() => {
        openDrawer();
      }}
      style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 28 }}
    >
      <Logo height={33} width={30} />
    </TouchableOpacity>
  );
};

export default HeaderLogo;
