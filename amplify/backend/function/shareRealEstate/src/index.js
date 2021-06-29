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
const SendMail_1 = require("/opt/nodejs/src/SendMail");
const PendingInvitationQueries_1 = require("/opt/nodejs/src/PendingInvitationQueries");
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
                const realEstate = await RealEstateMutation_1.getRealEstate(appSyncClient, realEstateId.S);
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
                        await SendMail_1.sendTemplateEmail(email.S, 'TemplateMailAdminAvecCompte');
                    }
                    else {
                        const shared = realEstate.shared || [];
                        const exists = shared.find((share) => {
                            if (share === user.id) {
                                return true;
                            }
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
                    await SendMail_1.sendTemplateEmail(email.S, 'TemplateMailLectureAvecCompte', { name: 'pierre' });
                    await PendingInvitationQueries_1.deletePendingInvitations(appSyncClient, {
                        id: id.S,
                        _version: _version.N,
                    });
                }
            }
            else if (type.S === 'Admin') {
                await SendMail_1.sendTemplateEmail(email.S, 'TemplateMailAdminSansCompteV2', { name: 'jhon' });
            }
            else {
                await SendMail_1.sendTemplateEmail(email.S, 'TemplateMailLectureSansCompte');
            }
        }
    }, Promise.resolve());
    return Promise.resolve('Successfully processed DynamoDB record');
};
