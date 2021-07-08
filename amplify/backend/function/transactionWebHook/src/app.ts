/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
	API_OMEDOM_GRAPHQLAPIENDPOINTOUTPUT
    API_OMEDOM_GRAPHQLAPIIDOUTPUT
    AUTH_OMEDOMC071F696_USERPOOLID
    FUNCTION_SENDNOTIFICATION_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import {
  getBankAccountsByBIId,
  listBankAccountsByBIConnectionId,
} from '/opt/nodejs/src/BankAccountQueries';
import getAppSyncClient from '/opt/nodejs/src/AppSyncClient';
import { createBankAccount, updateBankAccount } from '/opt/nodejs/src/BankAccountMutations';
import { createBankMovement, BankMovementStatus } from '/opt/nodejs/src/BankMovementMutations';
import { TenantInfo } from '../../../../../src/API';
import DateUtils from './DateUtils';

const aws = require('aws-sdk');

const lambda = new aws.Lambda({
  region: process.env.REGION,
});

const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

// declare a new express app
const app = express();
app.use((req, res, next) => {
  delete req.headers['content-encoding']; // should be lowercase
  next();
});
app.use(awsServerlessExpressMiddleware.eventContext());
app.use(bodyParser.json({
  limit: '6MB',
  inflate: true,
}));

// Enable CORS for all methods
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

// permet l'obtention d'une URL de redirection
app.get('/webhooks/create-redirect', async (req, res) => {
  const val = JSON.stringify(req.query).replace(/"/g, '\\"');
  res.send(`<html><head></head><body style="align-items: center;display: flex;justify-content: center;font-family: Arial;height: 100vh;margin: 0;"><div>En cours d'ajout ...</div>
<script>if (window.ReactNativeWebView) {window.ReactNativeWebView.postMessage("${val}");} else {parent.postMessage("${val}", "*");}</script></body></html>`);
});

app.post('/webhooks/account-synced', async (req, res) => {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    id, id_connection, name, iban, bic, balance, transactions,
  } = req.body;
  console.log(req.body);
  const AppSyncClient = getAppSyncClient(process.env);

  let account = await getBankAccountsByBIId(AppSyncClient, id);
  let justCreated = false;
  if (!account) {
    account = await createBankAccount(AppSyncClient, {
      name,
      iban,
      bic,
      balance,
      biId: id,
      biConnectionId: id_connection,
    });
    justCreated = true;
  }

  const isBalanceNegative = balance < 0;
  let countNegativeMovements = 0;
  let countPositiveMovements = 0;
  let currentTenants: Array<TenantInfo & {
    realEstateId: string,
    realEstateName: string,
    realEstateAdmins: string[]
  }> = [];
  const date = new Date();

  if (account && account !== true) {
    let recipientList: string[] | false = false;
    const realEstateIds: string[] = [];
    if (!justCreated && account.realEstates.items && account.realEstates.items.length > 0) {
      recipientList = [];
      for (let i = 0; i < account.realEstates.items.length; i += 1) {
        realEstateIds.push(account.realEstates.items[i].realEstate.id);
        recipientList = recipientList.concat(account.realEstates.items[i].realEstate.admins);
        if (account.realEstates.items[i].realEstate.tenants) {
          const tenants = account.realEstates.items[i].realEstate.tenants.filter((tenant) => {
            const bailStartDate = DateUtils.parseToDateObj(tenant?.startDate);
            bailStartDate.setHours(0, 0, 0, 0);
            const bailEndDate = DateUtils.parseToDateObj(tenant?.endDate);
            bailEndDate.setHours(23, 59, 59, 59);
            if (bailStartDate <= date && date <= bailEndDate) {
              return true;
            }
            return false;
          }).map((item) => ({
            ...item,
            realEstateId: account
                && account !== true
                && account.realEstates.items[i].realEstate.id,
            realEstateName: account
                && account !== true
                && account.realEstates.items[i].realEstate.name,
            realEstateAdmins: account
                && account !== true
                && account.realEstates.items[i].realEstate.admins,
          }));
          currentTenants = currentTenants.concat(tenants);
        }
      }
    }
    if (!justCreated) {
      await updateBankAccount(AppSyncClient, {
        id: account.id,
        balance,
        // eslint-disable-next-line no-underscore-dangle
        _version: account._version,
      });
    }
    const map = transactions.map(async (transaction) => {
      if (!transaction.coming && transaction.active
          && !transaction.deleted && account && account !== true) {
        countNegativeMovements += (transaction.value < 0 ? 1 : 0);
        if (transaction.value > 0) {
          countPositiveMovements += 1;
          // on vérifie si le montant d'un loyer ne correspondrait pas
          const foundTenant = currentTenants.find(
            (item) => (Math.abs(item.amount - transaction.value) / item.amount <= 0.05),
          );
          if (foundTenant) {
            // on notifie
            lambda.invoke({
              FunctionName: process.env.FUNCTION_SENDNOTIFICATION_NAME,
              Payload: JSON.stringify({
                userIds: foundTenant.realEstateAdmins,
                title: 'Loyer payé',
                body: `Vous venez probablement de recevoir le loyer pour votre bien "${foundTenant.realEstateName}".`,
                data: {
                  realEstateId: foundTenant.realEstateId,
                  bankAccountId: account.id,
                  tenantId: foundTenant.id,
                },
                type: 'loyer',
              }, null, 2),
              InvocationType: 'Event',
            }, (error) => {
              if (error) {
                console.error('Notification error', error);
              }
            });
          }
        }
        await createBankMovement(AppSyncClient, {
          bankAccountId: (account || { id: '' }).id,
          biId: transaction.id,
          description: transaction.original_wording,
          amount: transaction.value,
          date: transaction.date,
          status: BankMovementStatus.Unkown,
        });
      }
    });
    await Promise.all(map);

    if (recipientList) {
      if (countPositiveMovements > 0) {
        lambda.invoke({
          FunctionName: process.env.FUNCTION_SENDNOTIFICATION_NAME,
          Payload: JSON.stringify({
            userIds: recipientList,
            title: countPositiveMovements > 1 ? 'Nouveaux mouvements créditeurs' : 'Nouveau mouvement créditeur',
            body: countPositiveMovements > 1
              ? `Votre compte ${account.bank || ''} ${account.name || ''} ${account.iban} présente de nouveaux mouvements créditeurs.`
              : `Votre compte ${account.bank || ''} ${account.name || ''} ${account.iban} présente un nouveau mouvement créditeur.`,
            data: {
              realEstateIds,
              bankAccountId: account.id,
            },
            type: 'creditBancaire',
          }, null, 2),
          InvocationType: 'Event',
        }, (error) => {
          if (error) {
            console.error('Notification error', error);
          }
        });
      }
      if (countNegativeMovements > 0) {
        lambda.invoke({
          FunctionName: process.env.FUNCTION_SENDNOTIFICATION_NAME,
          Payload: JSON.stringify({
            userIds: recipientList,
            title: countNegativeMovements > 1 ? 'Nouveaux mouvements débiteurs' : 'Nouveau mouvement débiteur',
            body: countNegativeMovements > 1
              ? `Votre compte ${account.bank || ''} ${account.name || ''} ${account.iban} présente de nouveaux mouvements débiteurs.`
              : `Votre compte ${account.bank || ''} ${account.name || ''} ${account.iban} présente un nouveau mouvement débiteur.`,
            data: {
              realEstateIds,
              bankAccountId: account.id,
            },
            type: 'debitBancaire',
          }, null, 2),
          InvocationType: 'Event',
        }, (error) => {
          if (error) {
            console.error('Notification error', error);
          }
        });
      }
      if (isBalanceNegative) {
        lambda.invoke({
          FunctionName: process.env.FUNCTION_SENDNOTIFICATION_NAME,
          Payload: JSON.stringify({
            userIds: recipientList,
            title: 'Solde bancaire négatif',
            body: `Votre compte ${account.bank || ''} ${account.name || ''} ${account.iban} présente un solde négatif.`,
            data: {
              realEstateIds,
              bankAccountId: account.id,
            },
            type: 'soldeNegatif',
          }, null, 2),
          InvocationType: 'Event',
        }, (error) => {
          if (error) {
            console.error('Notification error', error);
          }
        });
      }
    }
  }

  res.sendStatus(200);
});

app.post('/webhooks/connection-synced', async (req, res) => {
  const { connection } = req.body;
  console.log(req.body);
  const AppSyncClient = getAppSyncClient(process.env);

  // on update le statut des comptes de cette connexion
  const accounts = await listBankAccountsByBIConnectionId(AppSyncClient, connection.id);
  if (accounts) {
    const map = accounts.map(async (account) => {
      await updateBankAccount(AppSyncClient, {
        id: account.id,
        biState: connection.state,
        // eslint-disable-next-line no-underscore-dangle
        _version: account._version,
      });
    });
    await Promise.all(map);
  }

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('App started');
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
