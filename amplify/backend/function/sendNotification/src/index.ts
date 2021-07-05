/* Amplify Params - DO NOT EDIT
	API_OMEDOM_GRAPHQLAPIENDPOINTOUTPUT
	API_OMEDOM_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { NotificationParams } from '../../../../../src/API';
import getAppSyncClient from '/opt/nodejs/src/AppSyncClient';
import { getUserById } from '/opt/nodejs/src/UserQueries';
import { sendBulkTemplateEmail } from '/opt/nodejs/src/SendMail';
import { Expo } from 'expo-server-sdk';
import { createNotificationMutation } from '/opt/nodejs/src/NotificationMutation';
import { createNotificationTicketsMutation } from '/opt/nodejs/src/NotificationTicketsMutation';
import { updateUser } from '/opt/nodejs/src/UserMutation';

type SendNotificationEvent = {
  userIds: string[],
  title?: string,
  body?: string,
  data?: Object
  type: Exclude<keyof NotificationParams, '__typename'>
};

const AppSyncClient = getAppSyncClient(process.env);
const expo = new Expo();

const uniqueValues = <T extends string | number>(a: T[]) => {
  const seen: { [key: string]: boolean } = {};
  return a.filter((item) => {
    if (Object.prototype.hasOwnProperty.call(seen, item)) {
      return false;
    }
    seen[item] = true;
    return true;
  });
};

exports.handler = async (event: SendNotificationEvent) => {
  console.log(event);
  let tokenList: { userId: string, token: string }[] = [];
  const emails: string[] = [];
  const {
    title, body, data, type,
  } = event;

  const tokensByUserId: {
    [key: string]: { tokens: string[], toUpdate: boolean, _version: number };
  } = {};

  const userIds = uniqueValues(event.userIds);

  // on boucle sur tous les user
  const map = userIds.map(async (userId) => {
    // on recupere les infos du user
    // eslint-disable-next-line no-await-in-loop
    const user = await getUserById(AppSyncClient, userId);
    if (user) {
      if (user.expoToken && user.expoToken.length > 0) {
        tokensByUserId[userId] = {
          tokens: user.expoToken,
          toUpdate: false,
          // eslint-disable-next-line no-underscore-dangle
          _version: user._version,
        };
      }
      const params = user.privateProfile.notificationParams[type];

      // on ajoute la notif dans AppSync
      await createNotificationMutation(AppSyncClient, {
        userId,
        title,
        body,
        data: JSON.stringify(data),
        type,
      });

      // on verifie s'il veut recevoir les notifs push ou email
      if (params.email) {
        emails.push(user.email);
      }
      if (params.push && user.expoToken && user.expoToken.length > 0) {
        tokenList = tokenList.concat(
          user.expoToken
            .filter((token) => Expo.isExpoPushToken(token))
            .map((token) => ({ userId, token })),
        );
      }
    }
  });
  await Promise.all(map);

  // on envoie la notification push
  if (tokenList.length > 0) {
    const chunks = expo.chunkPushNotifications([{
      to: tokenList.map(({ token }) => token),
      title,
      body,
      data,
    }]);
    const tickets = [];
    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    // eslint-disable-next-line no-restricted-syntax
    for (const chunk of chunks) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
        // documentation:
        // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
      } catch (error) {
        console.error(error);
      }
    }

    // on vérifie déjà s'il y a des tokens à supprimer
    for (let i = tickets.length - 1; i >= 0; i -= 1) {
      if (tickets[i].status === 'error' && tickets[i]?.details?.error === 'DeviceNotRegistered') {
        // on supprime définitivement ce token
        const currentToken = tokenList[i];
        tokensByUserId[currentToken.userId].toUpdate = true;
        tokensByUserId[currentToken.userId].tokens = tokensByUserId[currentToken.userId].tokens
          .filter((token) => token !== currentToken.token);
        tickets.splice(i, 1);
        tokenList.splice(i, 1);
      }
    }

    // on met à jours les clients
    const updates = Object.entries(tokensByUserId).map(async ([userId, value]) => {
      if (value.toUpdate) {
        updateUser(AppSyncClient, {
          id: userId,
          expoToken: value.tokens,
          // eslint-disable-next-line no-underscore-dangle
          _version: value._version,
        });
      }
    });

    await Promise.all(updates);

    // on enregistre le ticket dans AppSync
    await createNotificationTicketsMutation(AppSyncClient, {
      expoTokens: tokenList,
      ticketIds: tickets.map(({ id }) => id),
    });
  }

  // on envoie le mail
  if (emails.length > 0) {
    await sendBulkTemplateEmail(emails, 'TemplateNotification', { title, body });
  }

  const response = {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify('Done!'),
  };
  return response;
};
