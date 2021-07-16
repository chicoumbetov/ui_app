import React from 'react';
import { useLinkTo, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Logo from '../../assets/logo.svg';
import debounce from '../../utils/debounce';

const HeaderLogo = ({ withAction = true }: { withAction?:boolean }) => {
  let openDrawer = () => {};
  if (withAction) {
    const linkTo = useLinkTo();
    openDrawer = React.useCallback(
      debounce(() => {
        linkTo('/tableau-de-bord');
      }, 50),
      [linkTo],
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
