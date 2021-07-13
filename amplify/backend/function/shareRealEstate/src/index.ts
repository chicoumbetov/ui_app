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
import { sendBulkTemplateEmail, sendTemplateEmail } from '/opt/nodejs/src/SendMail';
import { deletePendingInvitations } from '/opt/nodejs/src/PendingInvitationQueries';

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
      const {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        email, type, realEstateId, id, _version,
      } = record.dynamodb.NewImage;
      console.log(record.dynamodb.NewImage);
      const user = await getUserByEmail(appSyncClient, email.S);
      console.log('user :', user);
      if (user) {
        const realEstate = await getRealEstate(appSyncClient, realEstateId.S);
        if (realEstate) {
          console.log('realEstate :', realEstate);
          if (type.S === 'Admin') {
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
            // partage de bien a une personne avec compte et en admin
            const title = `Bonjour,\n
                  ,un Utilisateur de l'application OMEDOM  vous a nommé comme administrateur de son bien immobilier.`;
            const body = 'Connectez-vous sur l\'application OMEDOM pour le découvrir et effectuer votre gestion.';
            await sendTemplateEmail(email.S, 'TemplateMailAdminAvecCompte', { title, body });
          } else {
            const shared = realEstate.shared || [];
            const exists = shared.find((share) => {
              if (share === user.id) {
                return true;
              }
              return false;
            });
            if (exists === undefined || !exists) {
              shared.push(user.id);
            }
            await updateRealEstateMutation(appSyncClient, {
              id: record.dynamodb.NewImage.realEstateId.S,
              shared,
              // eslint-disable-next-line no-underscore-dangle
              _version: realEstate._version,
            });
          }

          // partage de bien a une personne avec compte et en shared
          const title = `Bonjour,\n
        ,un Utilisateur de l'application OMEDOM vous a donné l'accès à son bien immobilier.`;
          const body = 'Connectez-vous sur l\'application OMEDOM pour le découvrir et effectuer votre gestion.';
          await sendTemplateEmail(email.S, 'TemplateMailAdminAvecCompte', { title, body });
          await deletePendingInvitations(appSyncClient, {
            id: id.S,
            _version: _version.N,
          });
        }
      } else if (type.S === 'Admin') {
        // partage de bien a une personne sans compte et en Admin
        const title = `Bonjour,\n
        ,un Utilisateur de l'application OMEDOM vous a donné l'accès à son bien immobilier.`;
        const body = 'Vous pouvez  télécharger et découvrir l\'application OMEDOM en cliquant sur le bouton ci-dessous.';
        await sendTemplateEmail(email.S, 'TemplateMailAdminSansCompte', { title, body });
      } else {
        // partage de bien a une personne sans compte et en shared
        const title = `Bonjour,\n
        ,un Utilisateur de l'application OMEDOM vous a donné l'accès à son bien immobilier.`;
        const body = 'Vous pouvez  télécharger et découvrir l\'application OMEDOM en cliquant sur le bouton ci-dessous.';
        await sendTemplateEmail(email.S, 'TemplateMailAdminSansCompte', { title, body });
      }
    }
  }, Promise.resolve());
  return Promise.resolve('Successfully processed DynamoDB record');
};
