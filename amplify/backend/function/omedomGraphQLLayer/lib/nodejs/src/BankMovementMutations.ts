import gql from 'graphql-tag';
import {
  CreateBankMovementInput,
  CreateBankMovementMutation,
  CreateBankMovementMutationVariables,
  UpdateBankMovementInput,
  UpdateBankMovementMutation,
  UpdateBankMovementMutationVariables,
} from '../../../../../../../src/API';
import { AppSyncClient } from './AppSyncClient';

const createBankMovement = async (client: AppSyncClient, input: CreateBankMovementInput) => {
  try {
    const { data } = await client.mutate<
    CreateBankMovementMutation,
    CreateBankMovementMutationVariables
    >({
      mutation: gql(`mutation CreateBankMovement(
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
  }`), // use your graphql query here
      variables: {
        input,
      },
      fetchPolicy: 'no-cache',
    });
    if (data.createBankMovement) {
      return data.createBankMovement;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};
const updateBankMovement = async (client: AppSyncClient, input: UpdateBankMovementInput) => {
  try {
    const { data } = await client.mutate<
    UpdateBankMovementMutation,
    UpdateBankMovementMutationVariables
    >({
      mutation: gql(`mutation UpdateBankMovement(
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
  }`), // use your graphql query here
      variables: {
        input,
      },
      fetchPolicy: 'no-cache',
    });
    if (data.updateBankMovement) {
      return data.updateBankMovement;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export {
  createBankMovement,
  updateBankMovement,
};
