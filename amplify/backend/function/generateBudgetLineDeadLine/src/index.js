"use strict";
/* Amplify Params - DO NOT EDIT
    API_OMEDOM_GRAPHQLAPIENDPOINTOUTPUT
    API_OMEDOM_GRAPHQLAPIIDOUTPUT
    ENV
    REGION
Amplify Params - DO NOT EDIT */
Object.defineProperty(exports, "__esModule", { value: true });
const AppSyncClient_1 = require("/opt/nodejs/src/AppSyncClient");
const BudgetLineQueries_1 = require("/opt/nodejs/src/BudgetLineQueries");
const BudgetLineMutations_1 = require("/opt/nodejs/src/BudgetLineMutations");
const BudgetLineDeadlineMutations_1 = require("/opt/nodejs/src/BudgetLineDeadlineMutations");
const DateUtils_1 = require("./DateUtils");
const moment = require("moment");
const aws = require('aws-sdk');
const lambda = new aws.Lambda({
    region: process.env.REGION,
});
var BudgetLineType;
(function (BudgetLineType) {
    BudgetLineType["Expense"] = "Expense";
    BudgetLineType["Income"] = "Income";
})(BudgetLineType || (BudgetLineType = {}));
const AppSyncClient = AppSyncClient_1.default(process.env);
exports.handler = async () => {
    // on récupère toutes les budget line
    const date = new Date();
    const currentDate = date.toISOString().substr(0, 10);
    date.setDate(date.getDate() + 3);
    const currentDatePlus3Days = date.toISOString().substr(0, 10);
    const list = await BudgetLineQueries_1.listBudgetLines(AppSyncClient, currentDate, currentDatePlus3Days);
    if (list) {
        const map = list.map(async (budgetLine) => {
            // eslint-disable-next-line no-underscore-dangle
            if (budgetLine._deleted !== true) {
                const { realEstateId, id, type, category, amount, frequency, tenantId, rentalCharges, managementFees, householdWaste, infoCredit: budgetLineInfoCredit, 
                // eslint-disable-next-line @typescript-eslint/naming-convention
                _version, } = budgetLine;
                let infoCredit = null;
                let nextDueDate;
                if (budgetLineInfoCredit && budgetLineInfoCredit.amortizationTable) {
                    // on cherche les infos de l'échéance actuelle
                    const currentIndex = budgetLineInfoCredit.amortizationTable.findIndex((item) => item.dueDate === budgetLine.nextDueDate);
                    if (currentIndex > -1) {
                        infoCredit = {
                            amount: -budgetLineInfoCredit.amortizationTable[currentIndex].amount,
                            interest: -budgetLineInfoCredit.amortizationTable[currentIndex].interest,
                            assurance: -budgetLineInfoCredit.amortizationTable[currentIndex].assurance,
                        };
                        // on récupère la prochaine date d'échéance
                        if (currentIndex < budgetLineInfoCredit.amortizationTable.length - 1) {
                            nextDueDate = budgetLineInfoCredit.amortizationTable[currentIndex + 1].dueDate;
                        }
                        else {
                            // le crédit est fini, on passe la date à null car il n'y a plus d'échéance suivante
                            nextDueDate = null;
                        }
                    }
                }
                // on creer la budgetLineDeadline
                const newBudgetLineDeadline = {
                    realEstateId,
                    budgetLineId: id,
                    type,
                    category,
                    amount,
                    frequency,
                    date: budgetLine.nextDueDate,
                    infoCredit,
                    tenantId,
                    rentalCharges,
                    managementFees,
                    householdWaste,
                };
                await BudgetLineDeadlineMutations_1.createBudgetLineDeadline(AppSyncClient, newBudgetLineDeadline);
                const oldDueDate = budgetLine.nextDueDate;
                // on calcule la prochaine échéance
                if (nextDueDate === undefined) {
                    nextDueDate = DateUtils_1.default.addMonths(budgetLine.nextDueDate, DateUtils_1.default.frequencyToMonths(frequency));
                }
                // on envoie une notif
                if (budgetLine.type === BudgetLineType.Expense) {
                    lambda.invoke({
                        FunctionName: process.env.FUNCTION_SENDNOTIFICATION_NAME,
                        Payload: JSON.stringify({
                            userIds: budgetLine.realEstate.admins,
                            title: 'Nouvelle dépense',
                            body: `Une dépense pour votre bien ${budgetLine.realEstate.name} arrive à échéance le ${moment(oldDueDate).format('DD/MM/YYYY')}.`,
                            data: {
                                realEstateId: budgetLine.realEstateId,
                                budgetLineId: budgetLine.id,
                            },
                            type: 'echeanceFacture',
                        }, null, 2),
                        InvocationType: 'Event',
                    }, (error) => {
                        if (error) {
                            console.error('Notification error', error);
                        }
                    });
                }
                // on update la budgetLine
                await BudgetLineMutations_1.updateBudgetLine(AppSyncClient, {
                    id,
                    nextDueDate,
                    _version,
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
