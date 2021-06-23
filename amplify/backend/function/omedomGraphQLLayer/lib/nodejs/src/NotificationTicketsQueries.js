"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listNotificationTickets = void 0;
const graphql_tag_1 = require("graphql-tag");
const listNotificationTickets = async (client, limit) => {
    try {
        const { data } = await client.query({
            query: graphql_tag_1.default(`query ListNotificationTicketss(
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
  }`),
            variables: {
                limit,
            },
            fetchPolicy: 'no-cache',
        });
        if (data?.listNotificationTicketss?.items && data?.listNotificationTicketss?.items.length > 0) {
            return data?.listNotificationTicketss?.items;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
};
exports.listNotificationTickets = listNotificationTickets;
