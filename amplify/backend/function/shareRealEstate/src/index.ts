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
import { sendEmail } from '/opt/nodejs/src/SendMail';

exports.handler = (event) => {
  //eslint-disable-line
  console.log(JSON.stringify(event, null, 2));
  const appSyncClient = getAppSyncClient(process.env);

  event.Records.forEach(async (record) => {
    if (record.eventName === 'INSERT') {
      console.log(record.dynamodb.NewImage.email.S);
      const user = await getUserByEmail(appSyncClient, record.dynamodb.NewImage.email.S);
      if (user) {
        console.log(record.dynamodb.NewImage.type.S);
        if (record.dynamodb.NewImage.type.S === 'Admin') {
          await updateRealEstateMutation(appSyncClient, {
            variables: {
              input: {
                id: record.dynamodb.NewImage.realEstateId.S,
                admins: [
                  user.id,
                ],
              },
            },
          });
        } else {
          await updateRealEstateMutation(appSyncClient, {
            variables: {
              input: {
                id: record.dynamodb.NewImage.realEstateId.S,
                shared: [
                  user.id,
                ],
              },
            },
          });
        }

        sendEmail(record.dynamodb.NewImage.email.S, 'Pirate');
      }
    }
  });
  return Promise.resolve('Successfully processed DynamoDB record');
};
