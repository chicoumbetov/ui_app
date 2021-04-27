import React, { useState, useEffect, useRef } from 'react';
import {
  Image,
  SafeAreaView, SectionList, StyleSheet, Text, TouchableOpacity, View, Platform,
} from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

import { AntDesign } from '@expo/vector-icons';
import notificationsDATA from '../../../mockData/notificationsDATA';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationsPage = () => {
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
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      // console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
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
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.faq}>Notifications</Text>
      </View>
      <SectionList
        sections={questions}
        keyExtractor={(item, index) => item.id + index + item.isChecked}
        renderItem={({ item, section: { index, isChecked } }) => (

          <View style={styles.item} key={index}>
            {isChecked
                  && (
                  <Text style={{
                    fontSize: 11,
                    paddingHorizontal: 20,
                    paddingTop: 9,
                    height: 199,
                    lineHeight: 23.8,
                  }}
                  >
                    {item}
                    {notification && notification.request.content.body}
                  </Text>
                  )}
          </View>
        )}
        renderSectionHeader={({
          section: {
            title, id, index, isChecked,
          },
        }) =>
        // console.log('isChecked', isChecked);
        // eslint-disable-next-line implicit-arrow-linebreak
          (
            <View style={isChecked ? (styles.headerUp) : (styles.headerDown)}>
              <Image
                source={require('../../../assets/Icones_omedom/logements/icones_log1.png')}
                style={{
                  height: 40, width: 40, borderRadius: 40, backgroundColor: 'white',
                }}
              />
              <Text style={styles.headerText} key={index}>
                {title}
                {notification && notification.request.content.title}
              </Text>
              <TouchableOpacity onPress={() => pressHandler(id)} key={index + isChecked}>
                {
                          isChecked
                            ? <AntDesign name="up" color="white" size={13} />
                            : <AntDesign name="right" color="white" size={13} />
                        }
              </TouchableOpacity>

            </View>
          )}
      />
    </SafeAreaView>
  );
};

export default NotificationsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  faq: {
    marginTop: 12,
    marginBottom: 49,
    fontSize: 24,
    fontWeight: '600',
    fontStyle: 'normal',
    fontFamily: 'HouschkaRoundedMedium',
    letterSpacing: 0,
    color: '#000000',
  },
  item: {

  },
  headerDown: {
    padding: 22,
    marginBottom: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 7,
    backgroundColor: '#5fc4ee',
    shadowColor: 'rgba(199, 199, 199, 0.5)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  headerUp: {
    padding: 22,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 7,
    backgroundColor: '#37a3de',
    shadowColor: 'rgba(199, 199, 199, 0.5)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  headerText: {
    fontSize: 16,
    color: '#fff',
    width: 220,
  },
  title: {
    fontSize: 24,
  },
});
