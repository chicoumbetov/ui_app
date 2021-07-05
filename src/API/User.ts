import { useMutation, useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { DocumentNode } from 'apollo-link';
import { useRealEstateList } from './RealEstate';
import {
  GetUserQuery, GetUserQueryVariables,
  ListUsersQuery,
  ListUsersQueryVariables,
  ModelUserFilterInput, User, UserByEmailQuery, UserByEmailQueryVariables,
} from '../API';
import {
  getRealEstate, getUser, listUsers, userByEmail,
} from '../graphql/queries';

const listUsersQuery = <DocumentNode>gql(listUsers);

export function useGetUserByIDList(userList: string[]) {
  let listUser : ModelUserFilterInput;
  const RealEstate = useRealEstateList();
  // const getPendingInvitation = useGetPendingInvitation(idRealEstate);

  const {
    loading, data, fetchMore, refetch,
  } = useQuery<ListUsersQuery, ListUsersQueryVariables>(listUsersQuery, {
    variables: {
      filter: {
        or: userList.map((userId) => ({
          id: {
            eq: userId,
          },
        })),
      },
    },
  });
  return { userList: data };
}

export function useGetUserByEmail(email: string) {
  const getUserQuery = <DocumentNode>gql(userByEmail);
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<UserByEmailQuery, UserByEmailQueryVariables>(getUserQuery, {
    variables: {
      email,
    },
    fetchPolicy: 'cache-and-network',
  });

  return {
    loading, user: <User[]>data?.userByEmail?.items, fetchMore, refetch,
  };
}

export function useGetUser(id: string) {
  const getUserQuery = <DocumentNode>gql(`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      lastname
      firstname
      avatarUri
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`);
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<GetUserQuery, GetUserQueryVariables>(getUserQuery, {
    variables: {
      id,
    },
    fetchPolicy: 'cache-and-network',
  });

  return {
    loading, user: <User>data?.getUser, fetchMore, refetch,
  };
}
