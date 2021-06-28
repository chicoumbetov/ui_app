import gql from 'graphql-tag';
import {
  CreateNotificationMutation,
  CreateNotificationMutationVariables,
  CreateNotificationInput,
} from '../../../../../../../src/API';
import { AppSyncClient } from './AppSyncClient';

const mutationCreateNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
  ) {
    createNotification(input: $input) {
      id
    }
  }
`;

const createNotificationMutation = async (
  client: AppSyncClient,
  input: CreateNotificationInput,
) => {
  await client.mutate<CreateNotificationMutation,
  CreateNotificationMutationVariables>({
    mutation: gql(mutationCreateNotification),
    variables: {
      input,
    },
    fetchPolicy: 'no-cache',
  });
};

export {
  createNotificationMutation,
};
