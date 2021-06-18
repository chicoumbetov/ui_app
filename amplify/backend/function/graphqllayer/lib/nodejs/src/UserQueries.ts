import gql from 'graphql-tag';
import {
  GetUserQuery,
  GetUserQueryVariables, SubscriptionType,
  UserByEmailQuery,
  UserByEmailQueryVariables,
} from '../../../../../../../src/API';
import { AppSyncClient } from './AppSyncClient';

const getUserById = async (client: AppSyncClient, id: string): Promise<false |
{
  __typename: 'User',
  id: string,
  biToken?: string | null,
  biUser?: string | null,
  email?: string | null,
  expoToken?: Array< string > | null,
  privateProfile?: {
    __typename: 'ProfileInfo',
    notificationParams?: {
      __typename: 'NotificationParams',
      echeanceFacture?: {
        __typename: 'NotificationParam',
        push?: boolean | null,
        email?: boolean | null,
      } | null,
      loyer?: {
        __typename: 'NotificationParam',
        push?: boolean | null,
        email?: boolean | null,
      } | null,
      debitBancaire?: {
        __typename: 'NotificationParam',
        push?: boolean | null,
        email?: boolean | null,
      } | null,
      creditBancaire?: {
        __typename: 'NotificationParam',
        push?: boolean | null,
        email?: boolean | null,
      } | null,
      soldeNegatif?: {
        __typename: 'NotificationParam',
        push?: boolean | null,
        email?: boolean | null,
      } | null,
      retardLoyer?: {
        __typename: 'NotificationParam',
        push?: boolean | null,
        email?: boolean | null,
      } | null,
      mauvaiseRenta?: {
        __typename: 'NotificationParam',
        push?: boolean | null,
        email?: boolean | null,
      } | null,
      autre?: {
        __typename: 'NotificationParam',
        push?: boolean | null,
        email?: boolean | null,
      } | null,
    } | null,
  } | null,
  _version: number,
} | null> => {
  try {
    const { data } = await client.query<GetUserQuery, GetUserQueryVariables>({
      query: gql(`query GetUser($id: ID!) {
        getUser(id: $id) {
          id
          email
          biToken
          biUser
          expoToken
          privateProfile {
            notificationParams {
              echeanceFacture {
                push
                email
              }
              loyer {
                push
                email
              }
              debitBancaire {
                push
                email
              }
              creditBancaire {
                push
                email
              }
              soldeNegatif {
                push
                email
              }
              retardLoyer {
                push
                email
              }
              mauvaiseRenta {
                push
                email
              }
              autre {
                push
                email
              }
            }
          }
          _version
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
  } catch (e) {
    console.error(e);
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
  try {
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
  } catch (e) {
    console.error(e);
  }
};

export {
  getUserById,
  getUserByEmail,
};
