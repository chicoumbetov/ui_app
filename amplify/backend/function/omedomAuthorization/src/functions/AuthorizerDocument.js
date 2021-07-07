const checkAuthorization = require('../helpers/authorizer');

const authorizerDocument = (params, authFields) => checkAuthorization({
  authModel: {
    key: params?.prev?.result?.realEstateId
      ? params?.prev?.result?.realEstateId
      : params?.arguments?.realEstateId,
    tableName: process.env.API_OMEDOM_REALESTATETABLE_NAME,
    authFields,
  },
  identity: params.identity,
});

module.exports = authorizerDocument;
