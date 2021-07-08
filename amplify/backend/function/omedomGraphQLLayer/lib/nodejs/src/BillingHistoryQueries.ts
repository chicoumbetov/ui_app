import gql from 'graphql-tag';
import {
  ListBillingHistoriesByUserQuery,
  ListBillingHistoriesByUserQueryVariables, ListBillingHistorysQuery,
  ListBillingHistorysQueryVariables,
} from '../../../../../../../src/API';
import { AppSyncClient } from './AppSyncClient';

const listBillingHistories = async (
  client: AppSyncClient,
  variables: ListBillingHistorysQueryVariables,
) => {
  try {
    const { data } = await client.query<
    ListBillingHistorysQuery,
    ListBillingHistorysQueryVariables
    >({
      query: gql(`query ListBillingHistorys(
          $id: ID
          $nextRenewDate: ModelStringKeyConditionInput
          $filter: ModelBillingHistoryFilterInput
          $limit: Int
          $nextToken: String
          $sortDirection: ModelSortDirection
        ) {
          listBillingHistorys(
            id: $id
            nextRenewDate: $nextRenewDate
            filter: $filter
            limit: $limit
            nextToken: $nextToken
            sortDirection: $sortDirection
          ) {
            items {
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
            nextToken
            startedAt
          }
        }
      `),
      variables,
      fetchPolicy: 'no-cache',
    });
    if (data.listBillingHistorys.items.length > 0) {
      return data.listBillingHistorys.items;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const listBillingHistoriesByUser = async (
  client: AppSyncClient,
  variables: ListBillingHistoriesByUserQueryVariables,
) => {
  try {
    const { data } = await client.query<
    ListBillingHistoriesByUserQuery,
    ListBillingHistoriesByUserQueryVariables
    >({
      query: gql(`query ListBillingHistoriesByUser(
          $userId: ID
          $createdAt: ModelStringKeyConditionInput
          $sortDirection: ModelSortDirection
          $filter: ModelBillingHistoryFilterInput
          $limit: Int
          $nextToken: String
        ) {
          listBillingHistoriesByUser(
            userId: $userId
            createdAt: $createdAt
            sortDirection: $sortDirection
            filter: $filter
            limit: $limit
            nextToken: $nextToken
          ) {
            items {
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
            nextToken
            startedAt
          }
        }
      `),
      variables,
      fetchPolicy: 'no-cache',
    });
    if (data.listBillingHistoriesByUser.items.length > 0) {
      return data.listBillingHistoriesByUser.items;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export {
  listBillingHistories,
  listBillingHistoriesByUser,
};
