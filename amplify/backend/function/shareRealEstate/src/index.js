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
exports.handler = (event) => {
    //eslint-disable-line
    console.log(JSON.stringify(event, null, 2));
    const appSyncClient = AppSyncClient_1.default(process.env);
    event.Records.forEach(async (record) => {
        if (record.eventName === 'INSERT') {
            console.log(record.dynamodb.NewImage.email.S);
            const user = await UserQueries_1.getUserByEmail(appSyncClient, record.dynamodb.NewImage.email.S);
            if (user) {
                console.log(record.dynamodb.NewImage.type.S);
                if (record.dynamodb.NewImage.type.S === 'Admin') {
                    await RealEstateMutation_1.updateRealEstateMutation(appSyncClient, {
                        variables: {
                            input: {
                                id: record.dynamodb.NewImage.realEstateId.S,
                                admins: [
                                    user.id,
                                ],
                            },
                        },
                    });
                }
                else {
                    await RealEstateMutation_1.updateRealEstateMutation(appSyncClient, {
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
                SendMail_1.sendEmail(record.dynamodb.NewImage.email.S, 'Pirate');
            }
        }
    });
    return Promise.resolve('Successfully processed DynamoDB record');
};
