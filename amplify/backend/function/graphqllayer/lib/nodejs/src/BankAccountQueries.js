"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listBankAccountsByBIConnectionId = exports.getBankAccountByBIId = void 0;
const graphql_tag_1 = require("graphql-tag");
const getBankAccountByBIId = async (client, biId) => {
    try {
        const { data } = await client.query({
            query: graphql_tag_1.default(`query ListBankAccountByBiId(
    $biId: Int
  ) {
    listBankAccountByBiId(
      biId: $biId
    ) {
      items {
        id
        bank
        accountOwner
        iban
        bic
        balance
        biId
        biConnectionId
        biState
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
                biId,
            },
            fetchPolicy: 'no-cache',
        });
        if (data.listBankAccountByBiId.items.length > 0) {
            return data.listBankAccountByBiId.items[0];
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
};
exports.getBankAccountByBIId = getBankAccountByBIId;
const listBankAccountsByBIConnectionId = async (client, biConnectionId) => {
    try {
        const { data } = await client.query({
            query: graphql_tag_1.default(`query ListBankAccountByBiConnectionId(
    $biConnectionId: Int
  ) {
    listBankAccountByBiConnectionId(
      biConnectionId: $biConnectionId
      limit: 1000
    ) {
      items {
        id
        bank
        accountOwner
        iban
        bic
        balance
        biId
        biConnectionId
        biState
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
                biConnectionId,
            },
            fetchPolicy: 'no-cache',
        });
        if (data.listBankAccountByBiConnectionId.items.length > 0) {
            return data.listBankAccountByBiConnectionId.items;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
};
exports.listBankAccountsByBIConnectionId = listBankAccountsByBIConnectionId;
