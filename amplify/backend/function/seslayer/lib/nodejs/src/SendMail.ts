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
        Data: `Hello, ${name}!`,
      },
    },
  };
  return AWS_SES.sendEmail(params).promise();
}

export function sendTemplateEmail(recipientEmail: string, template: string, data?: Object) {
  const params = {
    Source: 'no-reply@app.omedom.com',
    Template: template,
    Destination: {
      ToAddresses: [
        recipientEmail,
      ],
    },
    TemplateData: JSON.stringify(data),
  };
  return AWS_SES.sendTemplatedEmail(params).promise();
}

export function sendBulkTemplateEmail(recipientEmails: string[], template: string, data?: Object) {
  const Destinations = recipientEmails.map((email) => ({
    Destination: {
      ToAddresses: [email],
    },
    ReplacementTemplateData: JSON.stringify(data),
  }));

  const params = {
    Source: 'no-reply@app.omedom.com',
    Template: template,
    Destinations,
  };
  return AWS_SES.sendBulkTemplatedEmail(params).promise();
}
