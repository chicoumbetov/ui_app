"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listBankAccountsByBIConnectionId = exports.getBankAccountsById = exports.getBankAccountsByBIId = void 0;
const graphql_tag_1 = require("graphql-tag");
const getBankAccountsByBIId = async (client, biId) => {
    try {
        const { data } = await client.query({
            query: graphql_tag_1.default(`query ListBankAccountsByBiId(
    $biId: Int
  ) {
    listBankAccountsByBiId(
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
        if (data.listBankAccountsByBiId.items.length > 0) {
            return data.listBankAccountsByBiId.items[0];
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
};
exports.getBankAccountsByBIId = getBankAccountsByBIId;
const getBankAccountsById = async (client, id) => {
    try {
        const { data } = await client.query({
            query: graphql_tag_1.default(`query GetBankAccount(
    $id: Int
  ) {
    getBankAccount(
      id: $id
    ) {
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
  }`),
            variables: {
                id,
            },
            fetchPolicy: 'no-cache',
        });
        if (data.getBankAccount) {
            return data.getBankAccount;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
};
exports.getBankAccountsById = getBankAccountsById;
const listBankAccountsByBIConnectionId = async (client, biConnectionId) => {
    try {
        const { data } = await client.query({
            query: graphql_tag_1.default(`query ListBankAccountsByBiConnectionId(
    $biConnectionId: Int
  ) {
    listBankAccountsByBiConnectionId(
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
        if (data.listBankAccountsByBiConnectionId.items.length > 0) {
            return data.listBankAccountsByBiConnectionId.items;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
};
exports.listBankAccountsByBIConnectionId = listBankAccountsByBIConnectionId;
