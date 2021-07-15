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
const PendingInvitationQueries_1 = require("/opt/nodejs/src/PendingInvitationQueries");
const BillingHistoryQueries_1 = require("/opt/nodejs/src/BillingHistoryQueries");
const BillingHistoryMutations_1 = require("/opt/nodejs/src/BillingHistoryMutations");
const moment = require("moment");
exports.handler = async (event) => {
    //eslint-disable-line
    console.log(JSON.stringify(event, null, 2));
    console.log('cest moi', process.env);
    const appSyncClient = AppSyncClient_1.default(process.env);
    await event.Records.reduce(async (promise, record) => {
        if (record.eventName === 'INSERT') {
            const { email } = record.dynamodb.NewImage;
            // This line will wait for the last async function to finish.
            // The first iteration uses an already resolved Promise
            // so, it will immediately continue.
            await promise;
            const invitations = await PendingInvitationQueries_1.listPendingInvitationsByEmail(appSyncClient, email.S);
            console.log('par ici', invitations);
            if (invitations) {
                invitations.reduce(async (prom, invitation) => {
                    await prom;
                    const user = await UserQueries_1.getUserByEmail(appSyncClient, email.S);
                    const realEstate = await RealEstateQueries_1.getRealEstate(appSyncClient, invitation.realEstateId);
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
                            await RealEstateMutation_1.updateRealEstateMutation(appSyncClient, {
                                id: realEstate.id,
                                admins,
                                // eslint-disable-next-line no-underscore-dangle
                                _version: realEstate._version,
                            });
                            console.log('admins', admins);
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
