/* Amplify Params - DO NOT EDIT
	ENV
	FUNCTION_SENDNOTIFICATION_NAME
	REGION
Amplify Params - DO NOT EDIT */

const aws = require('aws-sdk');

const lambda = new aws.Lambda({
  region: process.env.REGION,
});

exports.handler = async (event) => {
  lambda.invoke({
    FunctionName: process.env.FUNCTION_SENDNOTIFICATION_NAME,
    Payload: JSON.stringify({
      userIds: [
        '5aa225d2-4fe6-42b5-a0ac-01d38e961751',
      ],
      title: 'Titre test',
      body: 'Notif body',
      data: {
        realEstateId: 'XXXX',
      },
      type: 'autre',
    }, null, 2),
    InvocationType: 'Event',
  }, (error, data) => {
    if (error) {
      context.done('error', error);
    }
    if (data.Payload) {
      context.succeed(data.Payload);
    }
  });

  // TODO implement
  const response = {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};
