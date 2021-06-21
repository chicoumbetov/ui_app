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
  await lambda.invoke({
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
  }).promise();
};
