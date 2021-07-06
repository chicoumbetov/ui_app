import gql from 'graphql-tag';
import {
  ListNotificationsByUserQueryVariables,
} from '../../../../../../../src/API';
import { AppSyncClient } from './AppSyncClient';

type ListNotificationsByUserQuery = {
  listNotificationsByUser?: {
    __typename: 'ModelNotificationConnection',
    items?: Array< {
      __typename: 'Notification',
      id: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export enum ModelSortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

const listNotificationsByUser = async (
  client: AppSyncClient,
  variables: ListNotificationsByUserQueryVariables,
) => {
  try {
    const { data } = await client.query<
    ListNotificationsByUserQuery,
    ListNotificationsByUserQueryVariables
    >({
      query: gql(`query ListNotificationsByUser(
          $userId: ID
      $createdAt: ModelStringKeyConditionInput
      $sortDirection: ModelSortDirection
      $filter: ModelNotificationFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listNotificationsByUser(
          userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
        items {
          id
        }
        nextToken
        startedAt
      }
    }`),
      variables,
      fetchPolicy: 'no-cache',
    });
    if (data?.listNotificationsByUser?.items) {
      return data.listNotificationsByUser?.items;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export {
  listNotificationsByUser,
};
