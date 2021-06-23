"use strict";
/* Amplify Params - DO NOT EDIT
    API_OMEDOM_GRAPHQLAPIENDPOINTOUTPUT
    API_OMEDOM_GRAPHQLAPIIDOUTPUT
    ENV
    REGION
Amplify Params - DO NOT EDIT */
Object.defineProperty(exports, "__esModule", { value: true });
const AppSyncClient_1 = require("/opt/nodejs/src/AppSyncClient");
const expo_server_sdk_1 = require("expo-server-sdk");
const NotificationTicketsQueries_1 = require("/opt/nodejs/src/NotificationTicketsQueries");
const NotificationTicketsMutation_1 = require("/opt/nodejs/src/NotificationTicketsMutation");
const UserQueries_1 = require("/opt/nodejs/src/UserQueries");
const UserMutation_1 = require("/opt/nodejs/src/UserMutation");
const AppSyncClient = AppSyncClient_1.default(process.env);
const expo = new expo_server_sdk_1.Expo();
exports.handler = async () => {
    // on récupère les tickets
    const list = await NotificationTicketsQueries_1.listNotificationTickets(AppSyncClient, 1000);
    if (list) {
        const map = list.map(async (ticket) => {
            // eslint-disable-next-line no-underscore-dangle
            if (ticket && !ticket._deleted) {
                const receiptIdChunks = expo.chunkPushNotificationReceiptIds(ticket.ticketIds);
                let i = 0;
                // Like sending notifications, there are different strategies you could use
                // to retrieve batches of receipts from the Expo service.
                // eslint-disable-next-line no-restricted-syntax
                for (const chunk of receiptIdChunks) {
                    try {
                        // eslint-disable-next-line no-await-in-loop
                        const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
                        console.log(receipts);
                        // The receipts specify whether Apple or Google successfully received the
                        // notification and information about an error, if one occurred.
                        // eslint-disable-next-line guard-for-in,no-restricted-syntax
                        for (const receiptId in receipts) {
                            const receipt = receipts[receiptId];
                            if (receipt.status === 'error'
                                && receipt.details?.error === 'DeviceNotRegistered') {
                                // on supprime le token
                                const { userId, token } = ticket.expoTokens[i];
                                // eslint-disable-next-line no-await-in-loop
                                const user = await UserQueries_1.getUserById(AppSyncClient, userId);
                                if (user) {
                                    // eslint-disable-next-line no-await-in-loop
                                    await UserMutation_1.updateUser(AppSyncClient, {
                                        id: userId,
                                        expoToken: user.expoToken.filter((tok) => tok !== token),
                                        // eslint-disable-next-line no-underscore-dangle
                                        _version: user._version,
                                    });
                                }
                            }
                            i += 1;
                        }
                    }
                    catch (error) {
                        console.error(error);
                    }
                }
                await NotificationTicketsMutation_1.deleteNotificationTicketsMutation(AppSyncClient, 
                // eslint-disable-next-line no-underscore-dangle
                { id: ticket.id, _version: ticket._version });
            }
        });
        await Promise.all(map);
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
