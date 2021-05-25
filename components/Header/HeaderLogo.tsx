import React from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Logo from '../../assets/logo.svg';
import debounce from '../../utils/debounce';

const HeaderLogo = ({ withAction = true }: { withAction?:boolean }) => {
  let openDrawer = () => {};
  if (withAction) {
    const navigation = useNavigation();
    openDrawer = React.useCallback(
      debounce(() => {
        navigation.dispatch(DrawerActions.openDrawer());
      }, 50),
      [navigation],
    );
  }

  return (
    <TouchableOpacity
      onPress={() => {
        openDrawer();
      }}
      disabled={!withAction}
      style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 28 }}
    >
      <Logo height={33} width={30} />
    </TouchableOpacity>
  );
};

export default HeaderLogo;
