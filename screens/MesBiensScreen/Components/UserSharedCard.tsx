import { CheckBox, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { View } from 'react-native';

import Card from '../../../components/Card';

import MaxWidthContainer from '../../../components/MaxWidthContainer';
import { useGetUser } from '../../../src/API/User';
import ActivityIndicator from '../../../components/ActivityIndicator';

import AutoAvatar from '../../../components/AutoAvatar';
import { useUser } from '../../../src/API/UserContext';

type MonBudgetProps = { idUser?: string,
  admin?: boolean,
  email?: string,
  supprimer?: boolean,
  onCheck?: (checked: boolean) => void };

const UserSharedCard = (props: MonBudgetProps) => {
  const {
    idUser, supprimer = false, admin, email, onCheck,
  } = props;
  // const theme = useTheme();
  const [checked, setChecked] = useState(false);

  const { user, loading } = useGetUser(idUser);
  // console.log('idUser', email);
  let name : string;
  if (user) {
    name = `${user.firstname} ${user.lastname}`;
  }
  const thisUser = useUser();
  let isCurrentUser = false;
  if (user && user.id === thisUser.user?.id) {
    isCurrentUser = true;
  }
  return (

    <MaxWidthContainer
      withScrollView="keyboardAware"
      outerViewProps={{
        showsVerticalScrollIndicator: false,
        style: {
          backgroundColor: 'transparent',
          marginBottom: 15,
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
            paddingTop: 20,
            borderWidth: checked ? (1) : (0),
            borderColor: 'red',
          }}
        >
          <AutoAvatar
            avatarInfo={user?.avatarUri || 'default::WaitUser'}
            style={{
              height: 50,
              width: 50,
              marginRight: 12,
              marginBottom: 10,
              borderRadius: 25,
              overflow: 'hidden',
            }}
          />
          {supprimer && !isCurrentUser && (
          <View style={{ justifyContent: 'center', paddingHorizontal: 14, width: 50 }}>
            <CheckBox
              checked={checked}
              status="danger"
              onChange={(nextChecked) => {
                if (onCheck) {
                  onCheck(nextChecked);
                  setChecked(nextChecked);
                }
              }}
            />
          </View>
          )}
          <View style={{ flexDirection: 'column' }}>
            <Text category="p1" status="basic">
              {name || email}
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
