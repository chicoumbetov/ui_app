import gql from 'graphql-tag';
import {
  UpdateUserInput,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from '../../../../../../../src/API';
import { AppSyncClient } from './AppSyncClient';

const updateUser = async (client: AppSyncClient, input: UpdateUserInput) => {
  try {
    const { data } = await client.mutate<
    UpdateUserMutation,
    UpdateUserMutationVariables
    >({
      mutation: gql(`
  mutation UpdateUser(
    $input: UpdateUserInput!
  ) {
    updateUser(input: $input) {
      id
  }
`), // use your graphql query here
      variables: {
        input,
      },
      fetchPolicy: 'no-cache',
    });
    if (data.updateUser) {
      return data.updateUser;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};
export {
  updateUser,
};
