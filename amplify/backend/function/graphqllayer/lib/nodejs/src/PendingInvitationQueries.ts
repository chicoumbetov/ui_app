import gql from 'graphql-tag';
import {
  PendingInvitationByEmailQuery,
  PendingInvitationByEmailQueryVariables,
} from '../../../../../../../src/API';
import { AppSyncClient } from './AppSyncClient';

const listPendingInvitationByEmail = async (client: AppSyncClient, pendingEmail: string) => {
  try {
    const { data } = await client.query<
    PendingInvitationByEmailQuery,
    PendingInvitationByEmailQueryVariables
    >({
      query: gql(`query PendingInvitationByEmail(
    $email: String
  ) {
    pendingInvitationByEmail(
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
    if (data) {
      return data;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export {
  listPendingInvitationByEmail,
};
