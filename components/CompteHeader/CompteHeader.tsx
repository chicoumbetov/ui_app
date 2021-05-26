import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import MaisonVerte from '../../assets/Omedom_Icons_svg/Logement/maison_verte.svg';
import MaxWidthContainer from '../MaxWidthContainer';

type TitleProps = {
  title?: string
};

const CompteHeader = ({ title }: TitleProps) => (
  <MaxWidthContainer>
    <Layout style={{
      marginRight: 20, flexDirection: 'row', backgroundColor: 'transparent',
    }}
    >
      <MaisonVerte height={40} width={40} style={{ marginRight: 10 }} />

      <Text category="h3" style={{ paddingTop: 13 }}>
        {title}
      </Text>
    </Layout>
  </MaxWidthContainer>

);

export default CompteHeader;
