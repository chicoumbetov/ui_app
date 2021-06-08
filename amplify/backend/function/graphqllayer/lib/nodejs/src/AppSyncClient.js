"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const aws_appsync_1 = require("aws-appsync");
require('isomorphic-fetch');
AWS.config.update({ region: process.env.REGION });
const getAppSyncClient = (env) => {
    const config = {
        url: env.API_OMEDOM_GRAPHQLAPIENDPOINTOUTPUT,
        region: env.REGION,
        auth: {
            type: aws_appsync_1.AUTH_TYPE.AWS_IAM,
            credentials: AWS.config.credentials,
        },
        disableOffline: true,
    };
    return new aws_appsync_1.default(config);
};
exports.default = getAppSyncClient;
