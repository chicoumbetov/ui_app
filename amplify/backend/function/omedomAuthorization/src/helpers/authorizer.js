const readModel = require('./readModel');

const checkAuthorization = async ({
  identity,
  authModel,
  connectionModel = undefined,
}) => {
  try {
    let connectionDataSet;
    if (connectionModel) {
      connectionDataSet = await readModel({
        key: connectionModel.key,
        tableName: connectionModel.tableName,
        keyName: connectionModel.keyName,
        indexName: connectionModel.indexName,
      });
    }

    let isAuthorized;
    if (connectionDataSet) {
      for (const data of connectionDataSet) {
        const authDataSet = await readModel({
          tableName: authModel.tableName,
          key: data[authModel.connectionField],
          keyName: authModel.keyName ? authModel.keyName : 'id',
          indexName: authModel.indexName ? authModel.indexName : undefined,
        });
        for (const authField of authModel.authFields) {
          if (!isAuthorized) {
            if (typeof authDataSet[0][authField] === 'string') {
              isAuthorized = authDataSet[0][authField] === identity.sub;
            } else if (authDataSet[0][authField]) {
              isAuthorized = authDataSet[0][authField].some(
                (userID) => userID === identity.sub,
              );
            }
          }
        }
      }
    } else if (authModel.key) {
      const authDataSet = await readModel({
        tableName: authModel.tableName,
        key: authModel.key,
        keyName: authModel.keyName ? authModel.keyName : 'id',
        indexName: authModel.indexName ? authModel.indexName : undefined,
      });

      for (const authField of authModel.authFields) {
        if (!isAuthorized) {
          if (typeof authDataSet[0][authField] === 'string') {
            isAuthorized = authDataSet[0][authField] === identity.sub;
          } else if (authDataSet[0][authField]) {
            isAuthorized = authDataSet[0][authField].some(
              (userID) => userID === identity.sub,
            );
          }
        }
      }
    } else {
      isAuthorized = false;
    }
    return isAuthorized;
  } catch (error) {
    console.log('Error from checkAuthorization:', error);
  }
};

module.exports = checkAuthorization;
