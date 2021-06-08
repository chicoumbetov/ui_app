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

// permet l'obtention d'une URL de redirection
app.get('/webhooks/create-redirect', async (req, res) => {
  const val = JSON.stringify(req.query).replace(/"/g, '\\"');
  res.send(`<html><head></head><body style="align-items: center;display: flex;justify-content: center;font-family: Arial;height: 100vh;margin: 0;"><div>En cours d'ajout ...</div>
<script>if (window.ReactNativeWebView) {window.ReactNativeWebView.postMessage("${val}");} else {parent.postMessage("${val}", "*");}</script></body></html>`);
});

app.get('/test', async (req, res) => {
  res.json({ test: true });
});

app.get('*', async (req, res) => {
  res.json(req);
});

app.listen(3000, () => {
  console.log('App started');
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
