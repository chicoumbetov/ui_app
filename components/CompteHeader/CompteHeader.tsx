import React, { useState } from 'react';
import { Text } from '@ui-kitten/components';
import { View } from 'react-native';
// import MaisonVerte from '../../assets/Omedom_Icons_svg/Logement/maison_verte.svg';
import MaxWidthContainer from '../MaxWidthContainer';
import AutoAvatar from '../AutoAvatar';
import { useUser } from '../../src/API/UserContext';

type TitleProps = {
  title?: string
};

const CompteHeader = ({ title }: TitleProps) => {
  const { user } = useUser();
  const [avatarImage] = useState(user?.avatarUri || 'default::ManAvatar');

  return (
    <MaxWidthContainer>
      <View style={{
        marginRight: 20, flexDirection: 'row',
      }}
      >
        {/** <MaisonVerte height={40} width={40} style={{ marginRight: 10 }} /> */}
        <AutoAvatar avatarInfo={avatarImage} style={{ height: 40, width: 40 }} />

        <Text category="h3" style={{ paddingTop: 13 }}>
          {title}
        </Text>
      </View>
    </MaxWidthContainer>
  );
};

export default CompteHeader;
