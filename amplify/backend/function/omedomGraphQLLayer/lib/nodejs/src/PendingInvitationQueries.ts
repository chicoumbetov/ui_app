import gql from 'graphql-tag';
import {
  DeletePendingInvitationInput,
  DeletePendingInvitationMutation,
  DeletePendingInvitationMutationVariables,
  PendingInvitationsByEmailQuery,
  PendingInvitationsByEmailQueryVariables,
  UpdateRealEstateBankAccountInput,
  UpdateRealEstateBankAccountMutation,
  UpdateRealEstateBankAccountMutationVariables,
} from '../../../../../../../src/API';
import { AppSyncClient } from './AppSyncClient';

const listPendingInvitationsByEmail = async (client: AppSyncClient, pendingEmail: string) => {
  try {
    const { data } = await client.query<
    PendingInvitationsByEmailQuery,
    PendingInvitationsByEmailQueryVariables
    >({
      query: gql(`query PendingInvitationsByEmail(
    $email: String
  ) {
    pendingInvitationsByEmail(
      email: $email
    ) {
      items {
        id
        realEstateId
        email
        type
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
        email: pendingEmail,
      },
      fetchPolicy: 'no-cache',
    });
    console.log('la data: ', data);
    if (data.pendingInvitationsByEmail.items.length > 0) {
      return data.pendingInvitationsByEmail.items;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const deletePendingInvitations = async (
  client: AppSyncClient,
  input: DeletePendingInvitationInput,
) => {
  try {
    const { data } = await client.mutate<
    DeletePendingInvitationMutation,
    DeletePendingInvitationMutationVariables
    >({
      mutation: gql(`
  mutation DeletePendingInvitation(
    $input: DeletePendingInvitationInput!
    $condition: ModelPendingInvitationConditionInput
  ) {
    deletePendingInvitation(input: $input, condition: $condition) {
      id
      realEstateId
      email
      type
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`), // use your graphql query here
      variables: {
        input,
      },
      fetchPolicy: 'no-cache',
    });
    if (data.updateRealEstateBankAccount) {
      return data.updateRealEstateBankAccount;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export {
  listPendingInvitationsByEmail,
  deletePendingInvitations,
};
