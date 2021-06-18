import React, { useState, useRef } from 'react';
import {
  StyleSheet, View, Platform, TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

import { Text, useTheme } from '@ui-kitten/components';
import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
import { useLinkTo } from '@react-navigation/native';
import notificationsDATA from '../../mockData/notificationsDATA';
import MaisonVert from '../../assets/Omedom_Icons_svg/Logement/maison_verte.svg';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationsPage = () => {
  const theme = useTheme();
  const [questions] = useState(notificationsDATA);
  const linkTo = useLinkTo();

  return (
    <MaxWidthContainer
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
      {questions.map((item) => (

        <View
          key={item.id}
          style={styles.headerDown}
        >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <MaisonVert height={40} width={40} style={{ marginRight: 10 }} />
            <Text category="h6" status="control" style={{ width: 200 }}>
              {item.title}
            </Text>
          </View>
          <TouchableOpacity onPress={() => {}}>
            <IconUIKitten
              name="arrow-ios-forward"
              fill={theme['color-success-100']}
              style={{
                height: 16, width: 16, marginRight: 5, marginTop: 8,
              }}
            />
          </TouchableOpacity>
        </View>

      ))}
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
  headerDown: {
    padding: 18,
    marginBottom: 36,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    backgroundColor: '#37a3de',
  },
});
