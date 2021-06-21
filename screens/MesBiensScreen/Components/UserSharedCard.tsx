import { Layout, Text, useTheme } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet, TouchableOpacity, View, Alert,
} from 'react-native';

import Card from '../../../components/Card';
import { User } from '../../../src/API';
import MaxWidthContainer from '../../../components/MaxWidthContainer';
import WomanAvatar from '../../../assets/Omedom_Icons_svg/Avatars/womanAvatar.svg';
import { useGetUser } from '../../../src/API/User';
import ActivityIndicator from '../../../components/ActivityIndicator';
import { usePendingInvitationsList } from '../../../src/API/PendingInvitation';

type MonBudgetProps = { idUser?: string, admin?: boolean, email?: string };

const UserSharedCard = (props: MonBudgetProps) => {
  const { idUser, admin } = props;
  const theme = useTheme();

  const { user, loading } = useGetUser(idUser);
  console.log('idUser', idUser);

  return (

    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
      }}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Card style={[styles.docs, {
          justifyContent: 'flex-start',
        }]}
        >
          <WomanAvatar height={50} width={50} style={{ marginRight: 18 }} />

          <View style={{ flexDirection: 'column' }}>
            <Text category="p1" status="basic">
              {user?.firstname}
            </Text>
            <Text category="p2" appearance="hint">
              {admin ? ('Admin') : ('Lecture Seule')}
            </Text>
          </View>

        </Card>
      )}

    </MaxWidthContainer>
  );
};

export default UserSharedCard;

const styles = StyleSheet.create({

  // Footer
  button: {
    flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between', backgroundColor: 'transparent',
  },
  buttonTextLeft: {
    marginLeft: 6,
  },
  docs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: 28,
  },
});
