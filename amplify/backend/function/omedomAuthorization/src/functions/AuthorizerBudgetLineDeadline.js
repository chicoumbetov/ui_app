const checkAuthorization = require("../helpers/authorizer");

const authorizerBudgetLineDeadline = (params, authFields) => {
  return checkAuthorization({
    authModel: {
      key: params.prev.result.realEstateId
        ? params.prev.result.realEstateId
        : params.arguments.realEstateId,
      tableName: process.env.API_OMEDOMAPI_REALESTATETABLE_NAME,
      authFields,
    },
    identity: params.identity,
  });
};

module.exports = authorizerBudgetLineDeadline;
