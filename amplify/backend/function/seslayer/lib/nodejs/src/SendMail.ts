const AWS = require('aws-sdk');

const SES_CONFIG = {
  accessKeyId: 'AKIAWVY6TCCQIKMQNSS7',
  secretAccessKey: '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',
  region: 'eu-west-3',
};

const AWS_SES = new AWS.SES(SES_CONFIG);

export function sendEmail(recipientEmail, name) {
  const params = {
    Source: 'no-reply@app.omedom.com',
    Destination: {
      ToAddresses: [
        recipientEmail,
      ],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: 'This is the body of my email!',
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Hell o, ${name}!`,
      },
    },
  };
  return AWS_SES.sendEmail(params).promise();
}

export function sendTemplateEmail(recipientEmail, template: string) {
  const params = {
    Source: 'no-reply@app.omedom.com',
    Template: template,
    Destination: {
      ToAddresses: [
        recipientEmail,
      ],
    },
    TemplateData: '{"name":"pedro"}',
  };
  return AWS_SES.sendTemplatedEmail(params).promise();
}
