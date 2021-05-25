import { Layout } from '@ui-kitten/components';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeaderBack from '../Header/HeaderBack';
import HeaderLogo from '../Header/HeaderLogo';

const Header = ({
  onPress,
}: HeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Layout
      level="3"
      style={{
        height: 70 + insets.top,
        flexDirection: 'row',
        alignItems:
        'center',
        justifyContent:
        'space-between',
      }}
    >
      <HeaderBack onPress={onPress} withNavigation={false} />
      <HeaderLogo withAction={false} />
    </Layout>
  );
};

export default Header;

interface HeaderProps {
  onPress: () => void
}
