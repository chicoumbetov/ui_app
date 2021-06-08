import { useMutation, useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { DocumentNode } from 'apollo-link';
import { GetRealEstateQuery, useRealEstateList } from './RealEstate';
import {
  GetRealEstateQueryVariables, GetUserQuery, GetUserQueryVariables,
  ListUsersQuery,
  ListUsersQueryVariables,
  ModelUserFilterInput, RealEstate, User, UserByEmailQuery, UserByEmailQueryVariables,
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
