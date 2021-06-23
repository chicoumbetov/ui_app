"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotificationTicketsMutation = exports.createNotificationTicketsMutation = void 0;
const graphql_tag_1 = require("graphql-tag");
const mutationCreateNotificationTicket = /* GraphQL */ `
  mutation CreateNotificationTickets(
    $input: CreateNotificationTicketsInput!
  ) {
    createNotificationTickets(input: $input) {
      id
    }
  }
`;
const createNotificationTicketsMutation = async (client, input) => {
    await client.mutate({
        mutation: graphql_tag_1.default(mutationCreateNotificationTicket),
        variables: {
            input,
        },
        fetchPolicy: 'no-cache',
    });
};
exports.createNotificationTicketsMutation = createNotificationTicketsMutation;
const mutationDeleteNotificationTicket = /* GraphQL */ `
 mutation DeleteNotificationTickets(
    $input: DeleteNotificationTicketsInput!
  ) {
    deleteNotificationTickets(input: $input) {
      id
    }
  }
`;
const deleteNotificationTicketsMutation = async (client, input) => {
    await client.mutate({
        mutation: graphql_tag_1.default(mutationDeleteNotificationTicket),
        variables: {
            input,
        },
        fetchPolicy: 'no-cache',
    });
};
exports.deleteNotificationTicketsMutation = deleteNotificationTicketsMutation;
