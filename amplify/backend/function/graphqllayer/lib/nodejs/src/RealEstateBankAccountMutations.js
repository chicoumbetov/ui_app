"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRealEstateBankAccount = exports.createRealEstateBankAccount = void 0;
const graphql_tag_1 = require("graphql-tag");
const createRealEstateBankAccount = async (client, input) => {
    try {
        const { data } = await client.mutate({
            mutation: graphql_tag_1.default(`mutation CreateRealEstateBankAccount(
    $input: CreateRealEstateBankAccountInput!
  ) {
    createRealEstateBankAccount(input: $input) {
      id
      realEstateId
      bankAccountId
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
        if (data.createRealEstateBankAccount) {
            return data.createRealEstateBankAccount;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
};
exports.createRealEstateBankAccount = createRealEstateBankAccount;
const updateRealEstateBankAccount = async (client, input) => {
    try {
        const { data } = await client.mutate({
            mutation: graphql_tag_1.default(`mutation UpdateRealEstateBankAccount(
    $input: UpdateRealEstateBankAccountInput!
    $condition: ModelRealEstateBankAccountConditionInput
  ) {
    updateRealEstateBankAccount(input: $input, condition: $condition) {
      id
      realEstateId
      bankAccountId
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
        if (data.updateRealEstateBankAccount) {
            return data.updateRealEstateBankAccount;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
};
exports.updateRealEstateBankAccount = updateRealEstateBankAccount;
