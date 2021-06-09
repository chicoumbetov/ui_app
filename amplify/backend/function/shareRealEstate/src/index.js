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
            const { email, type, realEstateId } = record.dynamodb.NewImage;
            const user = await UserQueries_1.getUserByEmail(appSyncClient, email.S);
            const realEstate = await RealEstateMutation_1.getRealEstate(appSyncClient, realEstateId.S);
            if (user && realEstate) {
                console.log('realEstate :', realEstate);
                if (type.S === 'Admin') {
                    const admins = realEstate.admins;
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
                        _version: realEstate._version,
                    });
                }
                else {
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
                    await RealEstateMutation_1.updateRealEstateMutation(appSyncClient, {
                        id: record.dynamodb.NewImage.realEstateId.S,
                        shared,
                        _version: realEstate._version,
                    });
                }
                await SendMail_1.sendEmail(email.S, 'Pirate');
            }
        }
    }, Promise.resolve());
    return Promise.resolve('Successfully processed DynamoDB record');
};
