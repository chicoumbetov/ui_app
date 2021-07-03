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
	AUTH_OMEDOMFEE3BFE0_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import {
  getBankAccountsByBIId,
  listBankAccountsByBIConnectionId,
} from '/opt/nodejs/src/BankAccountQueries';
import getAppSyncClient from '/opt/nodejs/src/AppSyncClient';
import {
  createBankAccount,
  updateBankAccount,
} from '/opt/nodejs/src/BankAccountMutations';
import { createBankMovement } from '/opt/nodejs/src/BankMovementMutations';

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

  const canSendNotifications = false;
  if (account.realEstates.realEstate) {

  }

  if (account && account !== true) {
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
        await createBankMovement(AppSyncClient, {
          bankAccountId: (account || { id: '' }).id,
          biId: transaction.id,
          description: transaction.original_wording,
          amount: transaction.value,
          date: transaction.date,

        });
      }
    });
    await Promise.all(map);
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
