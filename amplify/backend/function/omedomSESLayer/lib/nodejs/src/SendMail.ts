const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');

const SES_CONFIG = {
  accessKeyId: 'AKIAWVY6TCCQIKMQNSS7',
  secretAccessKey: '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',
  region: 'eu-west-3',
};

const AWS_SES = new AWS.SES(SES_CONFIG);

// create Nodemailer SES transporter
const transporter = nodemailer.createTransport({
  SES: { ses: AWS_SES, aws: AWS },
});

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

export function sendTemplateEmail(recipientEmail: string, template: string, data: Object = {}) {
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

export function sendEmailWithAttachement(
  recipientEmail: string,
  subject: string,
  html: string,
  attachment?: {
    filename: string,
    data: string
  },
) {
  // send some mail
  return transporter.sendMail(
    {
      from: 'no-reply@app.omedom.com',
      to: recipientEmail,
      subject,
      html,
      attachments: [
        {
          filename: attachment.filename,
          content: attachment.data,
          encoding: 'base64',
        },
      ],
    },
  );
}

export function sendBulkTemplateEmail(recipientEmails: string[], template: string, data?: Object) {
  const Destinations = recipientEmails.map((email) => ({
    Destination: {
      ToAddresses: [email],
    },
  }));

  const params = {
    Source: 'no-reply@app.omedom.com',
    Template: template,
    Destinations,
    DefaultTemplateData: JSON.stringify(data),
  };
  return AWS_SES.sendBulkTemplatedEmail(params).promise();
}
