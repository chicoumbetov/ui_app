"use strict";
/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/
Object.defineProperty(exports, "__esModule", { value: true });
/* Amplify Params - DO NOT EDIT
    API_OMEDOM_GRAPHQLAPIENDPOINTOUTPUT
    API_OMEDOM_GRAPHQLAPIIDOUTPUT
    AUTH_OMEDOMFEE3BFE0_USERPOOLID
    STORAGE_OMEDOM_BUCKETNAME
    ENV
    REGION
Amplify Params - DO NOT EDIT */
const BIApiClient_1 = require("/opt/nodejs/src/BIApiClient");
const AppSyncClient_1 = require("/opt/nodejs/src/AppSyncClient");
const UserQueries_1 = require("/opt/nodejs/src/UserQueries");
const BankAccountQueries_1 = require("/opt/nodejs/src/BankAccountQueries");
const BankAccountMutations_1 = require("/opt/nodejs/src/BankAccountMutations");
const RealEstateBankAccountMutations_1 = require("/opt/nodejs/src/RealEstateBankAccountMutations");
const RealEstateBankAccountQueries_1 = require("/opt/nodejs/src/RealEstateBankAccountQueries");
const DocumentQueries_1 = require("/opt/nodejs/src/DocumentQueries");
const SendMail_1 = require("/opt/nodejs/src/SendMail");
const templateMailQuittance_1 = require("./templateMailQuittance");
const BillingHistoryQueries_1 = require("/opt/nodejs/src/BillingHistoryQueries");
const BillingHistoryMutations_1 = require("/opt/nodejs/src/BillingHistoryMutations");
const moment = require("moment");
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());
// Enable CORS for all methods
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});
const client = BIApiClient_1.default(process.env.ENV);
const AppSyncClient = AppSyncClient_1.default(process.env);
// permet la création d'un utilisateur
app.post('/budgetinsight/create-user', async (req, res) => {
    try {
        const response = await client.createUser();
        res.json({
            ...response.data, success: true,
        });
    }
    catch (e) {
        res.json({
            success: false, error: e,
        });
    }
});
// génère le premier billing history avec la période d'essai
app.post('/budgetinsight/create-trial', async (req, res) => {
    const uuid = req.apiGateway.event.requestContext.identity
        .cognitoAuthenticationProvider.split(':').pop();
    try {
        const billingHistory = await BillingHistoryQueries_1.listBillingHistoriesByUser(AppSyncClient, {
            userId: uuid,
        });
        if (billingHistory === false || billingHistory.length <= 0) {
            await BillingHistoryMutations_1.createBillingHistory(AppSyncClient, {
                userId: uuid,
                nextRenewDate: moment().add(45, 'days').format('YYYY-MM-DD'),
                subscription: BillingHistoryMutations_1.SubscriptionType.Trial,
                amount: 0,
                paid: true,
            });
        }
        res.json({
            success: true,
        });
    }
    catch (e) {
        res.json({
            success: false, error: e,
        });
    }
});
// permet l'envoi de la quittance
app.get('/budgetinsight/send-quittance', async (req, res) => {
    const uuid = req.apiGateway.event.requestContext.identity
        .cognitoAuthenticationProvider.split(':').pop();
    const { DOCUMENT_ID, EMAIL, MOIS, ANNEE, } = req.query;
    try {
        const document = await DocumentQueries_1.getDocument(AppSyncClient, DOCUMENT_ID);
        if (document) {
            if (document.realEstate.admins.indexOf(uuid) > -1
                || (document.realEstate.shared || []).indexOf(uuid) > -1) {
                const data = await s3.getObject({
                    Bucket: process.env.STORAGE_OMEDOM_BUCKETNAME,
                    Key: `public/${document.s3file}`,
                }).promise();
                await SendMail_1.sendEmailWithAttachement(EMAIL, `Votre quittance de loyer - ${MOIS} ${ANNEE}`, templateMailQuittance_1.default.replace('{{mois}}', MOIS).replace('{{annee}}', ANNEE), {
                    filename: document.name,
                    data: data.Body.toString('base64'),
                });
                res.json({
                    success: true,
                });
            }
            else {
                res.json({
                    success: false, error: 'Document introuvable',
                });
            }
        }
        else {
            res.json({
                success: false, error: 'Document introuvable',
            });
        }
    }
    catch (e) {
        res.json({
            success: false, error: e,
        });
    }
});
// permet l'obtention d'une URL de redirection
app.get('/budgetinsight/connect-url', async (req, res) => {
    const uuid = req.apiGateway.event.requestContext.identity
        .cognitoAuthenticationProvider.split(':').pop();
    try {
        const user = await UserQueries_1.getUserById(AppSyncClient, uuid);
        if (user) {
            const redirectUrl = process.env.ENV === 'prod'
                ? 'https://3odmjvn8ga.execute-api.eu-west-3.amazonaws.com/prod/webhooks/create-redirect'
                : 'https://7bh3hwfdw3.execute-api.eu-west-3.amazonaws.com/dev/webhooks/create-redirect';
            const connectUrl = await client.getConnectUrl(user.biToken, redirectUrl, uuid);
            res.json({
                connectUrl, success: true,
            });
        }
        else {
            res.json({
                success: false, error: 'Utilisateur introuvable',
            });
        }
    }
    catch (e) {
        res.json({
            success: false, error: e,
        });
    }
});
app.get('/budgetinsight/create-accounts', async (req, res) => {
    const uuid = req.apiGateway.event.requestContext.identity
        .cognitoAuthenticationProvider.split(':').pop();
    const { CONNECTION_ID, REAL_ESTATE_ID } = req.query;
    // try {
    const user = await UserQueries_1.getUserById(AppSyncClient, uuid);
    if (user) {
        const connection = await client.getConnectionAccounts(user.biToken, CONNECTION_ID);
        // on vérifie que ce soit bien le bon utilisateur BI qui essaye d'ajouter des comptes
        if (connection && connection.id_user === parseInt(user.biUser, 10)) {
            // on boucle sur tous les comptes et on vérifie s'ils existent : on update, sinon on ajoute
            const accounts = await BankAccountQueries_1.listBankAccountsByBIConnectionId(AppSyncClient, CONNECTION_ID);
            const accountIdsList = accounts
                ? Object.fromEntries(accounts.map(({ biId, id, _version }) => [biId, { id, _version }]))
                : {};
            const map = connection.accounts.map(async (account) => {
                if (accountIdsList[account.id]) {
                    // on update
                    const bankAccount = await BankAccountMutations_1.updateBankAccount(AppSyncClient, {
                        id: accountIdsList[account.id].id,
                        bank: connection.connector.name,
                        accountOwner: uuid,
                        name: account.name,
                        iban: account.iban,
                        bic: account.bic,
                        balance: account.balance,
                        biId: account.id,
                        biConnectionId: connection.id,
                        biState: connection.state,
                        // eslint-disable-next-line no-underscore-dangle
                        _version: accountIdsList[account.id]._version,
                    });
                    // on vérifie si le compte était déjà lié au bien sinon on le lie
                    const realEstates = await RealEstateBankAccountQueries_1.listRealEstatesByBankAccount(AppSyncClient, bankAccount.id);
                    const found = realEstates
                        ? realEstates.find((item) => item.realEstateId === REAL_ESTATE_ID) !== undefined
                        : false;
                    if (!found) {
                        await RealEstateBankAccountMutations_1.createRealEstateBankAccount(AppSyncClient, {
                            bankAccountId: bankAccount.id,
                            realEstateId: REAL_ESTATE_ID,
                        });
                    }
                }
                else {
                    // on ajoute
                    const bankAccount = await BankAccountMutations_1.createBankAccount(AppSyncClient, {
                        bank: connection.connector.name,
                        accountOwner: uuid,
                        name: account.name,
                        iban: account.iban,
                        bic: account.bic,
                        balance: account.balance,
                        biId: account.id,
                        biConnectionId: connection.id,
                        biState: connection.state,
                    });
                    await RealEstateBankAccountMutations_1.createRealEstateBankAccount(AppSyncClient, {
                        bankAccountId: bankAccount.id,
                        realEstateId: REAL_ESTATE_ID,
                    });
                }
            });
            await Promise.all(map);
            res.json({
                success: true,
            });
        }
        else {
            res.json({
                success: false, error: 'Utilisateur non autorisé',
            });
        }
    }
    else {
        res.json({
            success: false, error: 'Utilisateur introuvable',
        });
    }
    /* } catch (e) {
      res.json({
        success: false, error: e,
      });
    } */
});
app.get('/budgetinsight/disable-accounts', async (req, res) => {
    const uuid = req.apiGateway.event.requestContext.identity
        .cognitoAuthenticationProvider.split(':').pop();
    const { BANK_ACCOUNT_ID } = req.query;
    // try {
    const bankAccount = await BankAccountQueries_1.getBankAccountsById(AppSyncClient, BANK_ACCOUNT_ID);
    const user = await UserQueries_1.getUserById(AppSyncClient, uuid);
    if (user && bankAccount) {
        const disable = await client.disableBankAccount(user.biToken, bankAccount.biId);
        // on vérifie que ce soit bien le bon utilisateur BI qui essaye d'ajouter des comptes
        if (disable) {
            await BankAccountMutations_1.deleteBankAccount(AppSyncClient, {
                id: bankAccount.id,
                // eslint-disable-next-line no-underscore-dangle
                _version: bankAccount._version,
            });
            res.json({
                success: true,
            });
        }
        else {
            res.json({
                success: false, error: 'Utilisateur non autorisé',
            });
        }
    }
    else {
        res.json({
            success: false, error: 'Utilisateur introuvable',
        });
    }
});
app.listen(3000, () => {
    console.log('App started');
});
// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
