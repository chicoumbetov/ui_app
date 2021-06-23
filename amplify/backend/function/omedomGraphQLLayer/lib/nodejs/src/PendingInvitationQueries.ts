import gql from 'graphql-tag';
import {
  PendingInvitationsByEmailQuery,
  PendingInvitationsByEmailQueryVariables,
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

export {
  listPendingInvitationsByEmail,
};
