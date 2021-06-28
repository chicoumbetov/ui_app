import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, TouchableOpacity,
} from 'react-native';

import { Text, useTheme } from '@ui-kitten/components';
import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
import { useLinkTo, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import MaisonVert from '../../assets/Omedom_Icons_svg/Logement/maison_verte.svg';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import Button from '../../components/Button';
import { useNotificationsList } from '../../src/API/Notification';
import { ModelSortDirection } from '../../src/API';
import ActivityIndicator from '../../components/ActivityIndicator';
import NotificationCard from '../../components/NotificationCard';
import { useUser } from '../../src/API/UserContext';

const NotificationsPage = () => {
  const linkTo = useLinkTo();
  const navigation = useNavigation();
  const { user, updateUser } = useUser();
  const { loading: loadingNotif, notifications, refetch } = useNotificationsList({
    userId: user?.id,
    sortDirection: ModelSortDirection.DESC,
    createdAt: {
      ge: moment().add(-30, 'days').format('YYYY-MM-DDT00:00:00'),
    },
  });

  React.useEffect(() => navigation.addListener('focus', () => {
    refetch();
    if (updateUser) {
      updateUser({
        privateProfile: {
          notificationLastSeenAt: new Date().toISOString(),
        },
      });
    }
  }), [navigation]);

  useEffect(() => {

  }, [loadingNotif]);

  return (
    <MaxWidthContainer
      withScrollView="simple"
      outerViewProps={{
        style: {
          padding: 25,
        },
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Text category="h1" style={styles.faq}>Notifications</Text>
        <Button
          appearance="ghost"
          style={{ padding: 0 }}
          onPress={() => linkTo('/notifications/parametres')}
          accessoryLeft={(props) => (
            <IconUIKitten
              {...props}
              name="settings-2-outline"
              fill="black"
              style={{ width: 24, height: 24 }}
            />
          )}
        />
      </View>

      {loadingNotif
        ? <ActivityIndicator center margin={10} />
        : notifications?.map(
          (notification) => notification && <NotificationCard notification={notification} />,
        )}
    </MaxWidthContainer>
  );
};

export default NotificationsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 24,
    marginTop: 34,
  },
  faq: {
    marginTop: 12,
    marginBottom: 41,
  },
});
