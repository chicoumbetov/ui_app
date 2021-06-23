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
import { sendTemplateEmail } from '/opt/nodejs/src/SendMail';

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
      const { email, type, realEstateId } = record.dynamodb.NewImage;
      const user = await getUserByEmail(appSyncClient, email.S);
      if (user) {
        const realEstate = await getRealEstate(appSyncClient, realEstateId.S);
        if (realEstate) {
          console.log('realEstate :', realEstate);
          if (type.S === 'Admin') {
            // get admins from chosen realEstate
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

            await updateRealEstateMutation(appSyncClient, {
              id: realEstateId.S,
              admins,
              // eslint-disable-next-line no-underscore-dangle
              _version: realEstate._version,
            });
            await sendTemplateEmail(email.S, 'TemplateMailAdminAvecCompte');
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
              id: record.dynamodb.NewImage.realEstateId.S,
              shared,
              // eslint-disable-next-line no-underscore-dangle
              _version: realEstate._version,
            });
          }

          await sendTemplateEmail(email.S, 'TemplateMailLectureAvecCompte');
        }
      } else if (type.S === 'Admin') {
        await sendTemplateEmail(email.S, 'TemplateMailAdminSansCompteV2');
      } else {
        await sendTemplateEmail(email.S, 'TemplateMailLectureSansCompte');
      }
    }
  }, Promise.resolve());
  return Promise.resolve('Successfully processed DynamoDB record');
};
