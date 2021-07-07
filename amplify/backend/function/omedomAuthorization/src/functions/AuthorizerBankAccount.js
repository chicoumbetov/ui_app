const checkAuthorization = require('../helpers/authorizer');

const authorizerBankAccount = (params, authFields) => checkAuthorization({
  connectionModel: {
    key: params?.arguments?.input
      ? params?.arguments?.input.id
      : params?.arguments?.id,
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

module.exports = authorizerBankAccount;
