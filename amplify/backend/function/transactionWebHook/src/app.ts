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

import * as sha256 from 'crypto-js/sha256';
import BridgeApiClient from '/opt/nodejs/src/BIApiClient';

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

const client = BridgeApiClient(<'dev' | 'prod'>process.env.ENV);

const getCredentials = (cognitoAuthenticationProvider: string) => {
  const uuid = cognitoAuthenticationProvider.split(':').pop();
  const email = `${uuid}@bridge-api.omedom.com`;
  const password = sha256(client.clientId + uuid).toString();
  return {
    email,
    password,
    uuid,
  };
};

// permet la création d'un utilisateur
app.post('/budgetinsight/create-user', async (req, res) => {
  const uuid = req.apiGateway.event.requestContext.identity
    .cognitoAuthenticationProvider.split(':').pop();

  try {
    const response = await client.createUser();
    res.json({
      uuid, bridgeApiUser: response.data.uuid, success: true,
    });
  } catch (e) {
    res.json({
      success: false, error: e,
    });
  }
});

// permet l'obtention d'une URL de redirection
app.get('/bridgeapi/bridge-url', async (req, res) => {
  try {
    const redirectUrl = await client.getBridgeUrl(req.query.context);
    res.json({
      redirectUrl, success: true,
    });
    res.json({
      success: false, error: 'Cannot login',
    });
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
