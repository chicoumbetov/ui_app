"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBankAccount = exports.updateBankAccount = exports.createBankAccount = void 0;
const graphql_tag_1 = require("graphql-tag");
const createBankAccount = async (client, input) => {
    try {
        const { data } = await client.mutate({
            mutation: graphql_tag_1.default(`mutation CreateBankAccount(
    $input: CreateBankAccountInput!
  ) {
    createBankAccount(input: $input) {
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
                input,
            },
            fetchPolicy: 'no-cache',
        });
        if (data.createBankAccount) {
            return data.createBankAccount;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
};
exports.createBankAccount = createBankAccount;
const updateBankAccount = async (client, input) => {
    try {
        const { data } = await client.mutate({
            mutation: graphql_tag_1.default(`mutation UpdateBankAccount(
    $input: UpdateBankAccountInput!
  ) {
    updateBankAccount(input: $input) {
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
                input,
            },
            fetchPolicy: 'no-cache',
        });
        if (data.updateBankAccount) {
            return data.updateBankAccount;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
};
exports.updateBankAccount = updateBankAccount;
const deleteBankAccount = async (client, input) => {
    try {
        const { data } = await client.mutate({
            mutation: graphql_tag_1.default(`mutation DeleteBankAccount(
    $input: DeleteBankAccountInput!
  ) {
    deleteBankAccount(input: $input) {
      id
      _version
    }
  }`),
            variables: {
                input,
            },
            fetchPolicy: 'no-cache',
        });
        if (data.deleteBankAccount) {
            return data.deleteBankAccount;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
};
exports.deleteBankAccount = deleteBankAccount;
