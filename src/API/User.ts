import { useMutation, useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { DocumentNode } from 'apollo-link';
import { useRealEstateList } from './RealEstate';
import { ListUsersQuery, ListUsersQueryVariables, ModelUserFilterInput } from '../API';
import { listUsers } from '../graphql/queries';

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
