const checkAuthorization = require('../helpers/authorizer');

const authorizerBankMovement = (params, authFields) => checkAuthorization({
  connectionModel: {
    key: params.prev.result.bankAccountId
      ? params.prev.result.bankAccountId
      : params.arguments.bankAccountId,
    keyName: 'bankAccountId',
    indexName: 'realEstatesByBankAccount',
    tableName: process.env.API_OMEDOM_REALESTATEBANKACCOUNTTABLE_NAME,
  },
  authModel: {
    connectionField: 'realEstateId',
    tableName: process.env.API_OMEDOM_REALESTATETABLE_NAME,
    authFields,
  },
  identity: params.identity,
});

module.exports = authorizerBankMovement;
