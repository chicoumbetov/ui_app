const checkAuthorization = require("../helpers/authorizer");

const authorizerBankMovement = (params, authFields) => {
  return checkAuthorization({
    connectionModel: {
      key: params.prev.result.bankAccountId
        ? params.prev.result.bankAccountId
        : params.arguments.bankAccountId,
      keyName: "bankAccountId",
      indexName: "realEstatesByBankAccount",
      tableName: process.env.API_OMEDOMAPI_REALESTATEBANKACCOUNTTABLE_NAME,
    },
    authModel: {
      connectionField: "realEstateId",
      tableName: process.env.API_OMEDOMAPI_REALESTATETABLE_NAME,
      authFields,
    },
    identity: params.identity,
  });
};

module.exports = authorizerBankMovement;
