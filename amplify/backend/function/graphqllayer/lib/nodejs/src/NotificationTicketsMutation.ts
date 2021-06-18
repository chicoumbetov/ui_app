import gql from 'graphql-tag';
import {
  CreateNotificationTicketsMutation,
  CreateNotificationTicketsMutationVariables,
  CreateNotificationTicketsInput,
  DeleteNotificationTicketsInput,
  DeleteNotificationTicketsMutation,
  DeleteNotificationTicketsMutationVariables,
} from '../../../../../../../src/API';
import { AppSyncClient } from './AppSyncClient';

const mutationCreateNotificationTicket = /* GraphQL */ `
  mutation CreateNotificationTickets(
    $input: CreateNotificationTicketsInput!
  ) {
    createNotificationTickets(input: $input) {
      id
    }
  }
`;

const createNotificationTicketsMutation = async (
  client: AppSyncClient,
  input: CreateNotificationTicketsInput,
) => {
  await client.mutate<CreateNotificationTicketsMutation,
  CreateNotificationTicketsMutationVariables>({
    mutation: gql(mutationCreateNotificationTicket),
    variables: {
      input,
    },
    fetchPolicy: 'no-cache',
  });
};

const mutationDeleteNotificationTicket = /* GraphQL */ `
 mutation DeleteNotificationTickets(
    $input: DeleteNotificationTicketsInput!
  ) {
    deleteNotificationTickets(input: $input) {
      id
    }
  }
`;

const deleteNotificationTicketsMutation = async (
  client: AppSyncClient,
  input: DeleteNotificationTicketsInput,
) => {
  await client.mutate<DeleteNotificationTicketsMutation,
  DeleteNotificationTicketsMutationVariables>({
    mutation: gql(mutationDeleteNotificationTicket),
    variables: {
      input,
    },
    fetchPolicy: 'no-cache',
  });
};

export {
  createNotificationTicketsMutation,
  deleteNotificationTicketsMutation,
};
