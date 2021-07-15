"use strict";
/* Amplify Params - DO NOT EDIT
    API_OMEDOMREST_APIID
    API_OMEDOMREST_APINAME
    API_OMEDOM_GRAPHQLAPIENDPOINTOUTPUT
    API_OMEDOM_GRAPHQLAPIIDOUTPUT
    ENV
    REGION
Amplify Params - DO NOT EDIT */
Object.defineProperty(exports, "__esModule", { value: true });
const UserQueries_1 = require("/opt/nodejs/src/UserQueries");
const AppSyncClient_1 = require("/opt/nodejs/src/AppSyncClient");
const RealEstateMutation_1 = require("/opt/nodejs/src/RealEstateMutation");
const RealEstateQueries_1 = require("/opt/nodejs/src/RealEstateQueries");
const SendMail_1 = require("/opt/nodejs/src/SendMail");
const PendingInvitationQueries_1 = require("/opt/nodejs/src/PendingInvitationQueries");
const BillingHistoryQueries_1 = require("/opt/nodejs/src/BillingHistoryQueries");
const BillingHistoryMutations_1 = require("/opt/nodejs/src/BillingHistoryMutations");
const moment = require("moment");
exports.handler = async (event) => {
    //eslint-disable-line
    console.log(JSON.stringify(event, null, 2));
    const appSyncClient = AppSyncClient_1.default(process.env);
    await event.Records.reduce(async (promise, record) => {
        // This line will wait for the last async function to finish.
        // The first iteration uses an already resolved Promise
        // so, it will immediately continue.
        await promise;
        if (record.eventName === 'INSERT') {
            const { 
            // eslint-disable-next-line @typescript-eslint/naming-convention
            email, type, realEstateId, id, _version, } = record.dynamodb.NewImage;
            console.log(record.dynamodb.NewImage);
            const user = await UserQueries_1.getUserByEmail(appSyncClient, email.S);
            console.log('user :', user);
            if (user) {
                const realEstate = await RealEstateQueries_1.getRealEstate(appSyncClient, realEstateId.S);
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
                        await RealEstateMutation_1.updateRealEstateMutation(appSyncClient, {
                            id: realEstateId.S,
                            admins,
                            // eslint-disable-next-line no-underscore-dangle
                            _version: realEstate._version,
                        });
                        console.log('admins :', admins);
                        const billingHistory = await BillingHistoryQueries_1.listBillingHistoriesByUser(appSyncClient, {
                            userId: user.id,
                        });
                        if (billingHistory === false || billingHistory.length <= 0) {
                            await BillingHistoryMutations_1.createBillingHistory(appSyncClient, {
                                userId: user.id,
                                nextRenewDate: moment().add(45, 'days').format('YYYY-MM-DD'),
                                subscription: BillingHistoryMutations_1.SubscriptionType.Trial,
                                amount: 0,
                                paid: true,
                            });
                        }
                        // partage de bien a une personne avec compte et en admin
                        const title = `Bonjour,\n
                  ,un Utilisateur de l'application OMEDOM  vous a nommé comme administrateur de son bien immobilier.`;
                        const body = 'Connectez-vous sur l\'application OMEDOM pour le découvrir et effectuer votre gestion.';
                        await SendMail_1.sendTemplateEmail(email.S, 'TemplateMailAdminAvecCompte', { title, body });
                    }
                    else {
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
                        await RealEstateMutation_1.updateRealEstateMutation(appSyncClient, {
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
                    await SendMail_1.sendTemplateEmail(email.S, 'TemplateMailAdminAvecCompte', { title, body });
                    await PendingInvitationQueries_1.deletePendingInvitations(appSyncClient, {
                        id: id.S,
                        _version: _version.N,
                    });
                }
            }
            else if (type.S === 'Admin') {
                // partage de bien a une personne sans compte et en Admin
                const title = `Bonjour,\n
        ,un Utilisateur de l'application OMEDOM vous a donné l'accès à son bien immobilier.`;
                const body = 'Vous pouvez  télécharger et découvrir l\'application OMEDOM en cliquant sur le bouton ci-dessous.';
                await SendMail_1.sendTemplateEmail(email.S, 'TemplateMailAdminSansCompteV2', { title, body });
            }
            else {
                // partage de bien a une personne sans compte et en shared
                const title = `Bonjour,\n
        ,un Utilisateur de l'application OMEDOM vous a donné l'accès à son bien immobilier.`;
                const body = 'Vous pouvez  télécharger et découvrir l\'application OMEDOM en cliquant sur le bouton ci-dessous.';
                await SendMail_1.sendTemplateEmail(email.S, 'TemplateMailAdminSansCompteV2', { title, body });
            }
        }
    }, Promise.resolve());
    return Promise.resolve('Successfully processed DynamoDB record');
};
