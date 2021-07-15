const AWS = require('aws-sdk');

const SES_CONFIG = {
  accessKeyId: 'AKIAWVY6TCCQIKMQNSS7',
  secretAccessKey: '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',
  region: 'eu-west-3',
};

const AWS_SES = new AWS.SES(SES_CONFIG);

export function sendEmail(sourceEmail: string, sujet: string, message: string) {
  const params = {
    Source: 'contact@app.omedom.com',
    Destination: {
      ToAddresses: [
        'amaurydecarv@gmail.com',
      ],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `le body ${message}`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `le sujet ${sujet}`,
      },
    },
  };
  return AWS_SES.sendEmail(params).promise();
}

export function sendTemplateEmail(recipientEmail: string, data?: Object) {
  const params = {
    Source: 'no-reply@app.omedom.com',
    Template: 'TemplateMail',
    Destination: {
      ToAddresses: [
        recipientEmail,
      ],
    },
    TemplateData: JSON.stringify(data),

  };
  return AWS_SES.sendTemplatedEmail(params).promise();
}
