import gql from 'graphql-tag';
import {
  CreateRealEstateBankAccountInput,
  CreateRealEstateBankAccountMutation,
  CreateRealEstateBankAccountMutationVariables,
  UpdateRealEstateBankAccountInput,
  UpdateRealEstateBankAccountMutation,
  UpdateRealEstateBankAccountMutationVariables,
} from '../../../../../../../src/API';
import { AppSyncClient } from './AppSyncClient';

const createRealEstateBankAccount = async (
  client: AppSyncClient,
  input: CreateRealEstateBankAccountInput,
) => {
  try {
    const { data } = await client.mutate<
    CreateRealEstateBankAccountMutation,
    CreateRealEstateBankAccountMutationVariables
    >({
      mutation: gql(`mutation CreateRealEstateBankAccount(
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
  }`), // use your graphql query here
      variables: {
        input,
      },
      fetchPolicy: 'no-cache',
    });
    if (data.createRealEstateBankAccount) {
      return data.createRealEstateBankAccount;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};
const updateRealEstateBankAccount = async (
  client: AppSyncClient,
  input: UpdateRealEstateBankAccountInput,
) => {
  try {
    const { data } = await client.mutate<
    UpdateRealEstateBankAccountMutation,
    UpdateRealEstateBankAccountMutationVariables
    >({
      mutation: gql(`mutation UpdateRealEstateBankAccount(
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
  }`), // use your graphql query here
      variables: {
        input,
      },
      fetchPolicy: 'no-cache',
    });
    if (data.updateRealEstateBankAccount) {
      return data.updateRealEstateBankAccount;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export {
  createRealEstateBankAccount,
  updateRealEstateBankAccount,
};
