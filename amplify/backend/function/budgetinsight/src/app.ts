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

import BIApiClient from '/opt/nodejs/src/BIApiClient';
import getAppSyncClient from '/opt/nodejs/src/AppSyncClient';
import { getUserById } from '/opt/nodejs/src/UserQueries';

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

const client = BIApiClient(<'dev' | 'prod'>process.env.ENV);

const AppSyncClient = getAppSyncClient(process.env);

// permet la création d'un utilisateur
app.post('/budgetinsight/create-user', async (req, res) => {
  try {
    const response = await client.createUser();
    res.json({
      ...response.data, success: true,
    });
  } catch (e) {
    res.json({
      success: false, error: e,
    });
  }
});

// permet l'obtention d'une URL de redirection
app.get('/budgetinsight/connect-url', async (req, res) => {
  const uuid = req.apiGateway.event.requestContext.identity
    .cognitoAuthenticationProvider.split(':').pop();

  const { CONNECTION_ID, REAL_ESTATE_ID } = req.query;

  try {
    const user = await getUserById(AppSyncClient, uuid);
    if (user) {
      const connection = await client.getConnectionAccounts(user.biToken, CONNECTION_ID);
      if (connection && connection.id_user === parseInt(user.biUser, 10)) {
        // on vérifie que ce soit bien le bon utilisateur BI qui essaye d'ajouter des comptes

        // on boucle sur tous les comptes et on vérifie s'ils existent : on update, sinon on ajoute

        res.json({
          success: true,
        });
      }
      res.json({
        success: false, error: 'Utilisateur non autorisé',
      });
    } else {
      res.json({
        success: false, error: 'Utilisateur introuvable',
      });
    }
  } catch (e) {
    res.json({
      success: false, error: e,
    });
  }
});

app.get('/budgetinsight/create-accounts', async (req, res) => {
  const uuid = req.apiGateway.event.requestContext.identity
    .cognitoAuthenticationProvider.split(':').pop();

  try {
    const user = await getUserById(AppSyncClient, uuid);
  } catch (e) {
    res.json({
      success: false, error: e,
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