import gql from 'graphql-tag';
import {
  GetUserQuery,
  GetUserQueryVariables,
  UserByEmailQuery,
  UserByEmailQueryVariables,
} from '../../../../../../../src/API';
import { AppSyncClient } from './AppSyncClient';

const getUserById = async (client: AppSyncClient, id: string): Promise<false |
    {
      __typename: 'User',
      id: string,
      biToken?: string | null
    } | null> => {
  const { data } = await client.query<GetUserQuery, GetUserQueryVariables>({
    query: gql(`query GetUser($id: ID!) {
        getUser(id: $id) {
          id
          biToken
        }
      }`), // use your graphql query here
    variables: {
      id,
    },
    fetchPolicy: 'no-cache',
  });
  if (data.getUser) {
    return data.getUser;
  }
  return false;
};

const getUserByEmail = async (client: AppSyncClient, email: string): Promise<false |
{
  __typename: 'User',
  id: string,
  lastname?: string | null,
  firstname?: string | null,
  email?: string | null,
  expoToken?: Array< string > | null,
} | null> => {
  const { data } = await client.query<UserByEmailQuery, UserByEmailQueryVariables>({
    query: gql(`query UserByEmail(
    $email: AWSEmail
  ) {
    userByEmail(
      email: $email
    ) {
      items {
        id
        lastname
        firstname
        email
        expoToken
      }
      nextToken
      startedAt
    }
  }`), // use your graphql query here
    variables: {
      email,
    },
    fetchPolicy: 'no-cache',
  });
  if (data.userByEmail.items.length > 0) {
    return data.userByEmail.items[0];
  }
  return false;
};

export {
  getUserById,
  getUserByEmail,
};
