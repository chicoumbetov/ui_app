/**
 * Mon Compte to visualise compte info or modify.
 *
 * @author: Shynggys UMBETOV
 */
import * as React from 'react';
import { Layout, Text } from '@ui-kitten/components';

import Informations from './Components/Informations';
import Abonnement from './Components/Abonnement';
import MaxWidthContainer from '../../components/MaxWidthContainer';

import ManAvatar from '../../assets/Omedom_Icons_svg/Avatars/manAvatar.svg';
import useCurrentUser from '../../src/API/User';

export default function MonCompte() {
  const { user } = useCurrentUser();

  return (

    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        style: {
          backgroundColor: '#efefef',
        },
        showsVerticalScrollIndicator: false,
      }}
    >

      <Layout style={{
        backgroundColor: '#f6f6f6', paddingHorizontal: 46, paddingTop: 37,
      }}
      >
        <Text category="h1">
          Mon Compte
        </Text>
        <Layout style={{
          alignItems: 'center', backgroundColor: 'transparent', marginTop: 41, marginBottom: 34,
        }}
        >
          <ManAvatar height={109} width={108} />
          <Text category="h2" style={{ marginTop: 15 }}>
            {user?.firstname || undefined}
          </Text>

        </Layout>
      </Layout>

      <Informations utilisateur={user} />
      <Abonnement />

    </MaxWidthContainer>
  );
}
