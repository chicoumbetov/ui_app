import React from 'react';
import { Text } from '@ui-kitten/components';
import {
  TouchableOpacity, TouchableOpacityProps, View, ViewProps,
} from 'react-native';
import { useLinkTo } from '@react-navigation/native';
import MaxWidthContainer from '../MaxWidthContainer';
import AutoAvatar from '../AutoAvatar';

type TitleProps = {
  title?: string
  iconUri?: string
  id?: string
};

const CompteHeader = ({ title, iconUri, id }: TitleProps) => {
  const linkTo = useLinkTo();
  const props: ViewProps | TouchableOpacityProps = {
    style: {
      marginRight: 20, flexDirection: 'row',
    },
  };
  let Container: React.ElementType = View;
  if (id !== undefined) {
    Container = TouchableOpacity;
    (props as TouchableOpacityProps).onPress = () => {
      linkTo(`/mes-biens/${id}`);
    };
  }
  return (
    <Container
      {...props}
    >
      {/** <MaisonVerte height={40} width={40} style={{ marginRight: 10 }} /> */}
      <AutoAvatar
        avatarInfo={iconUri}
        style={{
          height: 40,
          width: 40,
          marginRight: 10,
          borderRadius: 20,
          overflow: 'hidden',
        }}
      />

      <Text category="h3" style={{ paddingTop: 13 }}>
        {title}
      </Text>
    </Container>
  );
};
export default CompteHeader;
