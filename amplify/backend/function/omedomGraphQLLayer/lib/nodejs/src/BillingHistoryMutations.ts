import gql from 'graphql-tag';
import {
  CreateBillingHistoryInput,
  CreateBillingHistoryMutation,
  CreateBillingHistoryMutationVariables,
  UpdateBillingHistoryInput,
  UpdateBillingHistoryMutation,
  UpdateBillingHistoryMutationVariables,
} from '../../../../../../../src/API';
import { AppSyncClient } from './AppSyncClient';

export enum SubscriptionType {
  Trial = 'Trial',
  OneToTwo = 'OneToTwo',
  ThreeToFive = 'ThreeToFive',
  MoreThanFive = 'MoreThanFive',
}

export const createBillingHistoryQuery = /* GraphQL */ `
  mutation CreateBillingHistory(
    $input: CreateBillingHistoryInput!
    $condition: ModelBillingHistoryConditionInput
  ) {
    createBillingHistory(input: $input, condition: $condition) {
      id
      userId
      createdAt
      nextRenewDate
      subscription
      amount
      paid
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;
export const updateBillingHistoryQuery = /* GraphQL */ `
  mutation UpdateBillingHistory(
    $input: UpdateBillingHistoryInput!
    $condition: ModelBillingHistoryConditionInput
  ) {
    updateBillingHistory(input: $input, condition: $condition) {
      id
      userId
      createdAt
      nextRenewDate
      subscription
      amount
      paid
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;

const updateBillingHistory = async (client: AppSyncClient, input: UpdateBillingHistoryInput) => {
  try {
    const { data } = await client.mutate<
    UpdateBillingHistoryMutation,
    UpdateBillingHistoryMutationVariables
    >({
      mutation: gql(updateBillingHistoryQuery), // use your graphql query here
      variables: {
        input,
      },
      fetchPolicy: 'no-cache',
    });
    if (data.updateBillingHistory) {
      return data.updateBillingHistory;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const createBillingHistory = async (client: AppSyncClient, input: CreateBillingHistoryInput) => {
  try {
    const { data } = await client.mutate<
    CreateBillingHistoryMutation,
    CreateBillingHistoryMutationVariables
    >({
      mutation: gql(createBillingHistoryQuery), // use your graphql query here
      variables: {
        input,
      },
      fetchPolicy: 'no-cache',
    });
    if (data.createBillingHistory) {
      return data.createBillingHistory;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export {
  updateBillingHistory,
  createBillingHistory,
};
