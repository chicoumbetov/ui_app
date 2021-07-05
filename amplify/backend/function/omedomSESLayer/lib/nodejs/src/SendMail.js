"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendBulkTemplateEmail = exports.sendEmailWithAttachement = exports.sendTemplateEmail = exports.sendEmail = void 0;
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
        TemplateData: JSON.stringify(data),
    };
    return AWS_SES.sendTemplatedEmail(params).promise();
}
exports.sendTemplateEmail = sendTemplateEmail;
function sendEmailWithAttachement(recipientEmail, subject, html, attachment) {
    // send some mail
    return transporter.sendMail({
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
    });
}
exports.sendEmailWithAttachement = sendEmailWithAttachement;
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
