"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBankMovement = exports.createBankMovement = void 0;
const graphql_tag_1 = require("graphql-tag");
const createBankMovement = async (client, input) => {
    try {
        const { data } = await client.mutate({
            mutation: graphql_tag_1.default(`mutation CreateBankMovement(
    $input: CreateBankMovementInput!
  ) {
    createBankMovement(input: $input) {
      id
      bankAccountId
      realEstateId
      biId
      description
      amount
      ignored
      date
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
        if (data.createBankMovement) {
            return data.createBankMovement;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
};
exports.createBankMovement = createBankMovement;
const updateBankMovement = async (client, input) => {
    try {
        const { data } = await client.mutate({
            mutation: graphql_tag_1.default(`mutation UpdateBankMovement(
    $input: UpdateBankMovementInput!
  ) {
    updateBankMovement(input: $input) {
      id
      bankAccountId
      realEstateId
      biId
      description
      amount
      ignored
      date
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
        if (data.updateBankMovement) {
            return data.updateBankMovement;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
};
exports.updateBankMovement = updateBankMovement;
