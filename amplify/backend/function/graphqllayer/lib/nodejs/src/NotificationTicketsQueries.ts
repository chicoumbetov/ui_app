import gql from 'graphql-tag';
import {
  ListNotificationTicketssQuery,
  ListNotificationTicketssQueryVariables,
} from '../../../../../../../src/API';
import { AppSyncClient } from './AppSyncClient';

const listNotificationTickets = async (client: AppSyncClient, limit: number) => {
  try {
    const { data } = await client.query<
    ListNotificationTicketssQuery,
    ListNotificationTicketssQueryVariables
    >({
      query: gql(`query ListNotificationTicketss(
    $filter: ModelNotificationTicketsFilterInput
    $limit: Int
  ) {
    listNotificationTicketss(
      filter: $filter
      limit: $limit
    ) {
      items {
        id
        expoTokens {
          userId
          token
        }
        ticketIds
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }`), // use your graphql query here
      variables: {
        limit,
      },
      fetchPolicy: 'no-cache',
    });
    if (data?.listNotificationTicketss?.items && data?.listNotificationTicketss?.items.length > 0) {
      return data?.listNotificationTicketss?.items;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export {
  listNotificationTickets,
};
