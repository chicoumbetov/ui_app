import gql from 'graphql-tag';
import {
  CreateBankAccountInput,
  CreateBankAccountMutation,
  CreateBankAccountMutationVariables,
  UpdateBankAccountInput,
  UpdateBankAccountMutation,
  UpdateBankAccountMutationVariables,
} from '../../../../../../../src/API';
import { AppSyncClient } from './AppSyncClient';

const createBankAccount = async (client: AppSyncClient, input: CreateBankAccountInput) => {
  try {
    const { data } = await client.mutate<
    CreateBankAccountMutation,
    CreateBankAccountMutationVariables
    >({
      mutation: gql(`mutation CreateBankAccount(
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
  }`), // use your graphql query here
      variables: {
        input,
      },
      fetchPolicy: 'no-cache',
    });
    if (data.createBankAccount) {
      return data.createBankAccount;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};
const updateBankAccount = async (client: AppSyncClient, input: UpdateBankAccountInput) => {
  try {
    const { data } = await client.mutate<
    UpdateBankAccountMutation,
    UpdateBankAccountMutationVariables
    >({
      mutation: gql(`mutation UpdateBankAccount(
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
  }`), // use your graphql query here
      variables: {
        input,
      },
      fetchPolicy: 'no-cache',
    });
    if (data.updateBankAccount) {
      return data.updateBankAccount;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export {
  createBankAccount,
  updateBankAccount,
};
