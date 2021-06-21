import React from 'react';
import { Text } from '@ui-kitten/components';
import MaxWidthContainer from '../MaxWidthContainer';
import AutoAvatar from '../AutoAvatar';

type TitleProps = {
  title?: string
  iconUri?: string
};

const CompteHeader = ({ title, iconUri }: TitleProps) => (
  <MaxWidthContainer
    withScrollView="keyboardAware"
    innerViewProps={{
      style: {
        marginRight: 20, flexDirection: 'row',
      },
    }}
    outerViewProps={{
      showsVerticalScrollIndicator: false,
    }}
  >
    {/** <MaisonVerte height={40} width={40} style={{ marginRight: 10 }} /> */}
    <AutoAvatar avatarInfo={iconUri} style={{ height: 40, width: 40, marginRight: 10 }} />

    <Text category="h3" style={{ paddingTop: 13 }}>
      {title}
    </Text>
  </MaxWidthContainer>
);
export default CompteHeader;
