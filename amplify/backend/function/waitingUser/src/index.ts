/* Amplify Params - DO NOT EDIT
	API_OMEDOMREST_APIID
	API_OMEDOMREST_APINAME
	API_OMEDOM_GRAPHQLAPIENDPOINTOUTPUT
	API_OMEDOM_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { getUserByEmail } from '/opt/nodejs/src/UserQueries';
import getAppSyncClient from '/opt/nodejs/src/AppSyncClient';
import { updateRealEstateMutation } from '/opt/nodejs/src/RealEstateMutation';
import { getRealEstate } from '/opt/nodejs/src/RealEstateQueries';
import { listPendingInvitationsByEmail } from '/opt/nodejs/src/PendingInvitationQueries';
import { listBillingHistoriesByUser } from '/opt/nodejs/src/BillingHistoryQueries';
import { createBillingHistory, SubscriptionType } from '/opt/nodejs/src/BillingHistoryMutations';
import * as moment from 'moment';

exports.handler = async (event) => {
  //eslint-disable-line
  console.log(JSON.stringify(event, null, 2));
  console.log('cest moi', process.env);
  const appSyncClient = getAppSyncClient(process.env);
  await event.Records.reduce(async (promise, record) => {
    if (record.eventName === 'INSERT') {
      const { email } = record.dynamodb.NewImage;
      // This line will wait for the last async function to finish.
      // The first iteration uses an already resolved Promise
      // so, it will immediately continue.
      await promise;
      const invitations = await listPendingInvitationsByEmail(appSyncClient, email.S);
      console.log('par ici', invitations);
      if (invitations) {
        invitations.reduce(async (prom, invitation) => {
          await prom;
          const user = await getUserByEmail(appSyncClient, email.S);
          const realEstate = await getRealEstate(appSyncClient, invitation.realEstateId);
          if (user && realEstate) {
            if (invitation.type === 'Admin') {
              const { admins } = realEstate;
              const exists = admins.find((admin) => {
                if (admin === user.id) {
                  return true;
                }
                return false;
              });
              if (!exists) {
                admins.push(user.id);
              }

              const billingHistory = await listBillingHistoriesByUser(appSyncClient, {
                userId: user.id,
              });
              if (billingHistory === false || billingHistory.length <= 0) {
                await createBillingHistory(appSyncClient, {
                  userId: user.id,
                  nextRenewDate: moment().add(45, 'days').format('YYYY-MM-DD'),
                  subscription: SubscriptionType.Trial,
                  amount: 0,
                  paid: true,
                });
              }

              await updateRealEstateMutation(appSyncClient, {
                id: realEstate.id,
                admins,
                // eslint-disable-next-line no-underscore-dangle
                _version: realEstate._version,
              });
              console.log('admins', admins);
            } else {
              const shared = realEstate.shared || [];
              const exists = shared.find((share) => {
                if (share === user.id) {
                  return true;
                }
                return false;
              });
              if (exists === undefined) {
                shared.push(user.id);
              }
              await updateRealEstateMutation(appSyncClient, {
                id: realEstate.id,
                shared,
                // eslint-disable-next-line no-underscore-dangle
                _version: realEstate._version,
              });
            }
          }
        }, Promise.resolve());
      }
    }
  }, Promise.resolve());
  return Promise.resolve('Successfully processed DynamoDB record');
};
