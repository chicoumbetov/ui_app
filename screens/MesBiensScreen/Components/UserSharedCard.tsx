import { Text } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';

import Card from '../../../components/Card';

import MaxWidthContainer from '../../../components/MaxWidthContainer';
import { useGetUser } from '../../../src/API/User';
import ActivityIndicator from '../../../components/ActivityIndicator';

import AutoAvatar from '../../../components/AutoAvatar';

type MonBudgetProps = { idUser?: string, admin?: boolean, email?: string };

const UserSharedCard = (props: MonBudgetProps) => {
  const {
    idUser, admin, email,
  } = props;
  // const theme = useTheme();

  const { user, loading } = useGetUser(idUser);
  console.log('idUser', email);

  return (

    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
        style: {
          backgroundColor: 'transparent',
          borderRadius: 15,
          shadowColor: 'rgba(190, 190, 190, 0.5)',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowRadius: 2,
          shadowOpacity: 1,
          elevation: 2,
        },
      }}
    >
      {loading ? (
        <ActivityIndicator style={{ marginRight: 10 }} />
      ) : (
        <Card
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 22,
            paddingTop: 28,
          }}
        >
          <AutoAvatar
            avatarInfo={user?.avatarUri || 'default::WaitUser'}
            style={{
              height: 50, width: 50, borderRadius: 50, marginRight: 12, marginBottom: 10,
            }}
          />

          <View style={{ flexDirection: 'column' }}>
            <Text category="p1" status="basic">
              {user?.firstname || email}
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

// const styles = StyleSheet.create({});
