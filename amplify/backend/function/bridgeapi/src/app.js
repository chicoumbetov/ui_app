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
const sha256 = require("crypto-js/sha256");
const axios_1 = require("axios");
const BridgeApiKeys_1 = require("./BridgeApiKeys");
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
/** ********************
 * Example get method *
 ********************* */
app.post('/bridgeapi/create-user', async (req, res) => {
    const bridgeApiCredentials = BridgeApiKeys_1.default[process.env.ENV];
    console.log(bridgeApiCredentials);
    const bridgeApiClient = axios_1.default.create({
        baseURL: 'https://sync.bankin.com/v2',
        headers: {
            'Bankin-Version': '2019-02-18',
            'Content-Type': 'application/json',
            'Client-Id': bridgeApiCredentials.clientId,
            'Client-Secret': bridgeApiCredentials.clientSecret,
        },
    });
    const uuid = req.apiGateway.event.requestContext.identity
        .cognitoAuthenticationProvider.split(':').pop();
    const passw = sha256(bridgeApiCredentials.clientId + uuid).toString();
    try {
        const response = await bridgeApiClient.post('/users', {
            email: `${uuid}@bridge-api.omedom.com`,
            password: passw,
        });
        res.json({
            uuid, bridgeApiUser: response.data.uuid,
        });
    }
    catch (e) {
        console.log(e);
    }
});
app.listen(3000, () => {
    console.log('App started');
});
// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
