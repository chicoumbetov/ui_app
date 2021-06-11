"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRealEstatesByBankAccount = void 0;
const graphql_tag_1 = require("graphql-tag");
const listRealEstatesByBankAccount = async (client, bankAccountId) => {
    try {
        const { data } = await client.query({
            query: graphql_tag_1.default(`query ListRealEstatesByBankAccount(
    $bankAccountId: ID
  ) {
    listRealEstatesByBankAccount(
      bankAccountId: $bankAccountId
      limit: 1000
    ) {
      items {
        id
        realEstateId
        bankAccountId
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }`),
            variables: {
                bankAccountId,
            },
            fetchPolicy: 'no-cache',
        });
        if (data.listRealEstatesByBankAccount.items.length > 0) {
            return data.listRealEstatesByBankAccount.items;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
};
exports.listRealEstatesByBankAccount = listRealEstatesByBankAccount;
