"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendBulkTemplateEmail = exports.sendTemplateEmail = exports.sendEmail = void 0;
const AWS = require('aws-sdk');
const SES_CONFIG = {
    accessKeyId: 'AKIAWVY6TCCQIKMQNSS7',
    secretAccessKey: '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',
    region: 'eu-west-3',
};
const AWS_SES = new AWS.SES(SES_CONFIG);
function sendEmail(recipientEmail, name) {
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
exports.sendEmail = sendEmail;
function sendTemplateEmail(recipientEmail, template, data) {
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
exports.sendTemplateEmail = sendTemplateEmail;
function sendBulkTemplateEmail(recipientEmails, template, data) {
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
exports.sendBulkTemplateEmail = sendBulkTemplateEmail;
