/**
 * Mon Compte to visualise compte info or modify.
 *
 * @author: Shynggys UMBETOV
 */
import * as React from 'react';
import { Text } from '@ui-kitten/components';

import { View } from 'react-native';
import Informations from './Components/Informations';
import Abonnement from './Components/Abonnement';
import MaxWidthContainer from '../../components/MaxWidthContainer';

import { useUser } from '../../src/API/UserContext';
import AutoAvatar from '../../components/AutoAvatar';
import Separator from '../../components/Separator';

export default function MonCompte() {
  const { user } = useUser();

  return (
    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
        style: {
          paddingHorizontal: 46, paddingTop: 37,
        },
      }}
    >

      <Text category="h1">
        Mon Compte
      </Text>
      <View style={{
        alignItems: 'center', backgroundColor: 'transparent', marginTop: 41, marginBottom: 34,
      }}
      >
        <AutoAvatar
          style={{
            height: 108, width: 108, borderRadius: 54, overflow: 'hidden',
          }}
          avatarInfo={user?.avatarUri || 'default::ManAvatar'}
        />
        <Text category="h2" style={{ marginTop: 15 }}>
          {user?.firstname || undefined}
        </Text>
      </View>
      <Separator />

      <Informations utilisateur={user} />
      <Separator />
      <Abonnement />

    </MaxWidthContainer>
  );
}
