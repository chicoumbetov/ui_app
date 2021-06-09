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
import { updateRealEstateMutation, getRealEstate  } from '/opt/nodejs/src/RealEstateMutation';
import { sendEmail } from '/opt/nodejs/src/SendMail';

exports.handler = async (event) => {
  //eslint-disable-line
  console.log(JSON.stringify(event, null, 2));
  const appSyncClient = getAppSyncClient(process.env);

  await event.Records.reduce(async (promise, record) => {
    // This line will wait for the last async function to finish.
    // The first iteration uses an already resolved Promise
    // so, it will immediately continue.
    await promise;
    if (record.eventName === 'INSERT') {
      const {email, type, realEstateId} = record.dynamodb.NewImage;
      const user = await getUserByEmail(appSyncClient, email.S);
      const realEstate = await getRealEstate(appSyncClient, realEstateId.S)
      if (user && realEstate) {
        if (type.S === 'Admin') {
          const admins = realEstate.admins;
          const exists = admins.find((admin) =>{
            if (admin === user.id){
              return true;
            }
            return false;
          });
          if (exists === undefined) {
            admins.push(user.id);
          }

          await updateRealEstateMutation(appSyncClient, {
            variables: {
              input: {
                id: realEstateId.S,
                admins
              },
            },
          });
        } else {
          const shared = realEstate.shared || [];
          const exists = shared.find((share) =>{
            if (share === user.id){
              return true;
            }
            return false
          })
          if (exists === undefined) {
            shared.push(user.id);
          }
          await updateRealEstateMutation(appSyncClient, {
            variables: {
              input: {
                id: record.dynamodb.NewImage.realEstateId.S,
                shared
              },
            },
          });
        }

        await sendEmail(email.S, 'Pirate');
      }
    }
  }, Promise.resolve());
  return Promise.resolve('Successfully processed DynamoDB record');
};
