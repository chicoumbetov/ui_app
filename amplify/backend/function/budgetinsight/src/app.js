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
    ENV
    REGION
Amplify Params - DO NOT EDIT */
const BIApiClient_1 = require("/opt/nodejs/src/BIApiClient");
const AWS = require("aws-sdk");
const aws_appsync_1 = require("aws-appsync");
const graphql_tag_1 = require("graphql-tag");
require('isomorphic-fetch');
AWS.config.update({ region: process.env.REGION });
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
const getAppSyncClient = () => {
    const config = {
        url: process.env.API_OMEDOM_GRAPHQLAPIENDPOINTOUTPUT,
        region: process.env.REGION,
        auth: {
            type: aws_appsync_1.AUTH_TYPE.AWS_IAM,
            credentials: AWS.config.credentials,
        },
        disableOffline: true,
    };
    return new aws_appsync_1.default(config);
};
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
// permet l'obtention d'une URL de redirection
app.get('/budgetinsight/connect-url', async (req, res) => {
    const uuid = req.apiGateway.event.requestContext.identity
        .cognitoAuthenticationProvider.split(':').pop();
    try {
        const appSyncClient = getAppSyncClient();
        const { data } = await appSyncClient.query({
            query: graphql_tag_1.default(`query GetUser($id: ID!) {
        getUser(id: $id) {
          id
          biToken
        }
      }`),
            variables: {
                id: uuid,
            },
            fetchPolicy: 'no-cache',
        });
        console.log(data);
        const redirectUrl = await client.getConnectUrl(data.getUser.biToken, uuid);
        res.json({
            redirectUrl, success: true,
        });
    }
    catch (e) {
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
