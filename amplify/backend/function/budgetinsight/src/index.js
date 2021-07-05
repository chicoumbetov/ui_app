const awsServerlessExpress = require('aws-serverless-express');
const serverApp = require('./app');
const server = awsServerlessExpress.createServer(serverApp);
exports.handler = (event, context) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};
