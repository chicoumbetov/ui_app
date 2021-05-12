import React, { useState, useEffect, useRef } from 'react';
import {
  SectionList, StyleSheet, View, Platform, TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

import { Text, useTheme } from '@ui-kitten/components';
import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
import notificationsDATA from '../../mockData/notificationsDATA';
import MaisonVert from '../../assets/Omedom_Icons_svg/Logement/maison_verte.svg';
import MaxWidthContainer from '../../components/MaxWidthContainer';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationsPage = () => {
  const theme = useTheme();
  const [questions, setQuestions] = useState(notificationsDATA);

  // Taken from doc. Adopt on needs
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Test notification! 📬',
        body: 'Notif itselft',
        data: { data: questions },
      },
      trigger: { seconds: 1 },
    });
  }

  // detect which one is clicked
  const pressHandler = (id: number) => {
    const temp = questions.map((question) => {
      if (id === question.id) {
        return { ...question, isChecked: !question.isChecked };
      }
      return question;
    });

    // handle promise of notifications. probably needs to be adopted on needs.
    // Taken from official documentation
    try {
      const notif = async () => {
        await schedulePushNotification();
      };
    } catch (e) {
      console.log('Notification error: ', e);
    }

    setQuestions(temp);
  };

  // Taken from documentation. Probably need to adopt.
  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        // alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      // console.log(token);
    } else {
      // alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  // notification lifecycle
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      // console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <MaxWidthContainer outerViewProps={{
      style: {
        backgroundColor: '#efefef',
        paddingHorizontal: 24,
        paddingTop: 34,
      },
    }}
    >
      <View>
        <Text category="h1" style={styles.faq}>Notifications</Text>
      </View>
      <SectionList
        sections={questions}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (

          <View style={styles.headerDown}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <MaisonVert height={40} width={40} style={{ marginRight: 10 }} />
              <Text category="h6" status="control" style={{ width: 200 }}>
                {item}
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
        )}
      />
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
