import * as AWS from 'aws-sdk';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

require('isomorphic-fetch');

AWS.config.update({ region: process.env.REGION });

export type AppSyncClient = AWSAppSyncClient<NormalizedCacheObject>;

const getAppSyncClient = (env) => {
  const config = {
    url: env.API_OMEDOM_GRAPHQLAPIENDPOINTOUTPUT,
    region: env.REGION,
    auth: {
      type: <'AWS_IAM'>AUTH_TYPE.AWS_IAM,
      credentials: AWS.config.credentials,
    },
    disableOffline: true,
  };

  return new AWSAppSyncClient(config);
};

export default getAppSyncClient;
