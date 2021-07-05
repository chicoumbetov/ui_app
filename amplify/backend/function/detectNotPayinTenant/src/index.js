"use strict";
/* Amplify Params - DO NOT EDIT
    API_OMEDOM_GRAPHQLAPIENDPOINTOUTPUT
    API_OMEDOM_GRAPHQLAPIIDOUTPUT
    ENV
    REGION
Amplify Params - DO NOT EDIT */
Object.defineProperty(exports, "__esModule", { value: true });
const AppSyncClient_1 = require("/opt/nodejs/src/AppSyncClient");
const BudgetLineDeadlineQueries_1 = require("/opt/nodejs/src/BudgetLineDeadlineQueries");
const aws = require('aws-sdk');
const lambda = new aws.Lambda({
    region: process.env.REGION,
});
const AppSyncClient = AppSyncClient_1.default(process.env);
exports.handler = async () => {
    // on récupère toutes les budget line
    const date = new Date();
    date.setDate(date.getDate() - 10);
    const currentDateMinus10Days = date.toISOString().substr(0, 10);
    const list = await BudgetLineDeadlineQueries_1.listBudgetLineDeadlinesLoyer(AppSyncClient, currentDateMinus10Days, currentDateMinus10Days);
    if (list) {
        const map = list.map(async (budgetLineDeadline) => {
            // eslint-disable-next-line no-underscore-dangle
            if (budgetLineDeadline._deleted !== true) {
                const { realEstate, tenantId, } = budgetLineDeadline;
                // on envoie une notif
                lambda.invoke({
                    FunctionName: process.env.FUNCTION_SENDNOTIFICATION_NAME,
                    Payload: JSON.stringify({
                        userIds: realEstate.admins,
                        title: 'Loyer impayé',
                        body: `Le paiement du loyer pour votre bien ${realEstate.name} à 10 jours de retard, ou alors vous avez oublié d'affecter le mouvement bancaire correspondant au paiement.`,
                        data: {
                            realEstateId: realEstate.id,
                            tenantId,
                        },
                        type: 'retardLoyer',
                    }, null, 2),
                    InvocationType: 'Event',
                });
            }
        });
        await Promise.all(map);
    }
    const response = {
        statusCode: 200,
        //  Uncomment below to enable CORS requests
        //  headers: {
        //      "Access-Control-Allow-Origin": "*",
        //      "Access-Control-Allow-Headers": "*"
        //  },
        body: JSON.stringify('Done!'),
    };
    return response;
};
