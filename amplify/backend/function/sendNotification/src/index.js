"use strict";
/* Amplify Params - DO NOT EDIT
    API_OMEDOM_GRAPHQLAPIENDPOINTOUTPUT
    API_OMEDOM_GRAPHQLAPIIDOUTPUT
    ENV
    REGION
Amplify Params - DO NOT EDIT */
Object.defineProperty(exports, "__esModule", { value: true });
const AppSyncClient_1 = require("/opt/nodejs/src/AppSyncClient");
const UserQueries_1 = require("/opt/nodejs/src/UserQueries");
const SendMail_1 = require("/opt/nodejs/src/SendMail");
const expo_server_sdk_1 = require("expo-server-sdk");
const NotificationMutation_1 = require("/opt/nodejs/src/NotificationMutation");
const NotificationTicketsMutation_1 = require("/opt/nodejs/src/NotificationTicketsMutation");
const UserMutation_1 = require("/opt/nodejs/src/UserMutation");
const AppSyncClient = AppSyncClient_1.default(process.env);
const expo = new expo_server_sdk_1.Expo();
const uniqueValues = (a) => {
    const seen = {};
    return a.filter((item) => {
        if (Object.prototype.hasOwnProperty.call(seen, item)) {
            return false;
        }
        seen[item] = true;
        return true;
    });
};
exports.handler = async (event) => {
    console.log(event);
    let tokenList = [];
    const emails = [];
    const { title, body, data, type, } = event;
    const tokensByUserId = {};
    const userIds = uniqueValues(event.userIds);
    // on boucle sur tous les user
    const map = userIds.map(async (userId) => {
        // on recupere les infos du user
        // eslint-disable-next-line no-await-in-loop
        const user = await UserQueries_1.getUserById(AppSyncClient, userId);
        if (user) {
            if (user.expoToken && user.expoToken.length > 0) {
                tokensByUserId[userId] = {
                    tokens: user.expoToken,
                    toUpdate: false,
                    // eslint-disable-next-line no-underscore-dangle
                    _version: user._version,
                };
            }
            const params = user.privateProfile.notificationParams
                && user.privateProfile.notificationParams[type];
            // on ajoute la notif dans AppSync
            const newNotification = await NotificationMutation_1.createNotificationMutation(AppSyncClient, {
                userId,
                title,
                body,
                data: JSON.stringify(data),
                type,
            });
            // on verifie s'il veut recevoir les notifs push ou email
            if (params && params.email) {
                emails.push(user.email);
            }
            if (params && params.push && user.expoToken && user.expoToken.length > 0) {
                tokenList = tokenList.concat(user.expoToken
                    .filter((token) => expo_server_sdk_1.Expo.isExpoPushToken(token))
                    .map((token) => ({
                    userId,
                    token,
                    notificationId: newNotification?.data?.createNotification?.id,
                })));
            }
        }
    });
    await Promise.all(map);
    // on envoie la notification push
    if (tokenList.length > 0) {
        const chunks = expo.chunkPushNotifications(tokenList.map(({ token, notificationId }) => ({
            to: token,
            title,
            body,
            data: {
                ...data,
                notificationId,
            },
        })));
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
            }
            catch (error) {
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
                UserMutation_1.updateUser(AppSyncClient, {
                    id: userId,
                    expoToken: value.tokens,
                    // eslint-disable-next-line no-underscore-dangle
                    _version: value._version,
                });
            }
        });
        await Promise.all(updates);
        // on enregistre le ticket dans AppSync
        await NotificationTicketsMutation_1.createNotificationTicketsMutation(AppSyncClient, {
            expoTokens: tokenList,
            ticketIds: tickets.map(({ id }) => id),
        });
    }
    // on envoie le mail
    if (emails.length > 0) {
        await SendMail_1.sendBulkTemplateEmail(emails, 'TemplateNotification', { title, body });
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
