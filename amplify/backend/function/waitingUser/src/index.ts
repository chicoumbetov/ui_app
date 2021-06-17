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
import { updateRealEstateMutation, getRealEstate } from '/opt/nodejs/src/RealEstateMutation';
import { listPendingInvitationByEmail } from '/opt/nodejs/src/PendingInvitationQueries';

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
      const invitation = listPendingInvitationByEmail(appSyncClient, email.S);
      console.log('par ici', invitation);
    }
  }, Promise.resolve());
  return Promise.resolve('Successfully processed DynamoDB record');
};
