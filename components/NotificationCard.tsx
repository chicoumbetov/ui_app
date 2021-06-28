import { View } from 'react-native';
import { Icon as IconUIKitten, Text } from '@ui-kitten/components';
import React from 'react';
import moment from 'moment';
import MaisonVert from '../assets/Omedom_Icons_svg/Logement/maison_verte.svg';
import Card from './Card';
import { Notification } from '../src/API';
import { useUpdateNotification } from '../src/API/Notification';

type NotificationCardProps = {
  notification: Notification;
};

const NotificationCard = (props: NotificationCardProps) => {
  const { notification } = props;
  const { updateNotification } = useUpdateNotification();
  const onPress = () => {
    updateNotification({
      variables: {
        input: {
          id: notification.id,
          clicked: true,
          createdAt: notification.createdAt,
          // eslint-disable-next-line no-underscore-dangle
          _version: notification._version,
        },
      },
    });
  };

  return (
    <Card
      onPress={onPress}
      style={{
        marginTop: 27,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: notification.clicked ? '#FFFFFF' : '#37a3de',
      }}
    >

      <View style={{ marginRight: 10 }}>
        <MaisonVert height={42} width={44} />
      </View>
      <View style={{ flex: 1, flexDirection: 'column', marginRight: 10 }}>
        <Text
          category="h5"
          status="basic"
          style={{ flex: 1, flexWrap: 'wrap' }}
        >
          {notification.title}
        </Text>
        <Text
          category="p2"
          status="basic"
          style={{ flex: 1, flexWrap: 'wrap' }}
        >
          {notification.body}
        </Text>
        <Text
          category="c1"
          appearance="hint"
          style={{ flex: 1, flexWrap: 'wrap' }}

        >
          {`${moment(notification.createdAt).format('DD/MM/YYYY à HH:mm')}`}
        </Text>
      </View>
      <IconUIKitten
        name="arrow-ios-forward"
        fill="#b5b5b5"
        style={{
          height: 20, width: 20, marginRight: 5, alignItems: 'center',
        }}
      />
    </Card>
  );
};

export default NotificationCard;
