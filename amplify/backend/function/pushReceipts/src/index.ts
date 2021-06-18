/* Amplify Params - DO NOT EDIT
	API_OMEDOM_GRAPHQLAPIENDPOINTOUTPUT
	API_OMEDOM_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import getAppSyncClient from '/opt/nodejs/src/AppSyncClient';
import { Expo } from 'expo-server-sdk';
import { listNotificationTickets } from '/opt/nodejs/src/NotificationTicketsQueries';
import { deleteNotificationTicketsMutation } from '/opt/nodejs/src/NotificationTicketsMutation';

const AppSyncClient = getAppSyncClient(process.env);
const expo = new Expo();

exports.handler = async (event) => {
  // on récupère les tickets

  const list = await listNotificationTickets(AppSyncClient, 1000);

  if (list) {
    const map = list.map(async (ticket) => {
      if (ticket) {
        const receiptIdChunks = expo.chunkPushNotificationReceiptIds(ticket.ticketIds);

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
              const { status, details } = receipts[receiptId];
              if (status === 'error' && details && details?.error === 'DeviceNotRegistered') {
                // on supprime le token
              }
            }
          } catch (error) {
            console.error(error);
          }
        }
        deleteNotificationTicketsMutation(AppSyncClient, { id: ticket.id, _version: ticket._version });
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
