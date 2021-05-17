import { gql } from 'graphql-tag';
import { useLazyQuery, useMutation } from 'react-apollo';
import { useEffect, useState } from 'react';
import { DocumentNode } from 'apollo-link';
import { useAuth } from '../../utils/CustomHooks';
import {
  CreateUserMutation,
  CreateUserMutationVariables,
  ListUsersQuery,
  ListUsersQueryVariables, SubscriptionType, UpdateUserMutation, UpdateUserMutationVariables,
} from '../API';
import { listUsers } from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { removeNull } from '../../utils/ObjectHelper';

export type UserItem = {
  __typename: 'User',
  id: string,
  owner?: string | null,
  lastname?: string | null,
  firstname?: string | null,
  avatarUri?: string | null,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
  email?: string | null,
  phoneNumber?: string | null,
  optIn?: boolean | null,
  address?: {
    __typename: 'Address',
    address: string,
    additionalAddress?: string | null,
    postalCode: string,
    city: string,
    country: string,
  } | null,
  birthDate?: string | null,
  subscription?: SubscriptionType | null,
};

export default function useCurrentUser() {
  const [user, setUser] = useState<UserItem | null>(null);
  const { user: authUser } = useAuth();
  const listUsersQuery = <DocumentNode>gql(listUsers);
  const [getUser, {
    loading, called, data,
  }] = useLazyQuery<
  ListUsersQuery,
  ListUsersQueryVariables
  >(listUsersQuery, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (authUser) {
      getUser({
        variables: {
          filter: {
            owner: { eq: authUser?.username },
          },
        },
      });
    }
    return () => {
    };
  }, [authUser]);

  useEffect(() => {
    if (data?.listUsers?.items && data?.listUsers?.items.length > 0) {
      setUser(data?.listUsers?.items[0]);
    }
    return () => {
    };
  }, [data]);

  const [createUser] = useMutation<
  CreateUserMutation,
  CreateUserMutationVariables
  >(gql(mutations.createUser));

  const [updateUser] = useMutation<
  UpdateUserMutation,
  UpdateUserMutationVariables
  >(gql(mutations.updateUser), {
    // @ts-ignore
    optimisticResponse: (vars) => ({
      updateUser: {
        __typename: 'User',
        ...user,
        ...vars.input,
        // eslint-disable-next-line no-underscore-dangle
        _version: (vars.input?._version ?? 0) + 1,
      },
    }),
    update: (cache, { data: mutationData }) => {
      console.log(mutationData);
      if (mutationData) {
        const { updateUser: mutationUpdateUser } = mutationData;
        if (mutationUpdateUser) {
          // Read query from cache
          const cacheData = cache.readQuery<ListUsersQuery,
          ListUsersQueryVariables>({
            query: listUsersQuery,
            variables: {
              filter: {
                owner: { eq: authUser?.username },
              },
            },
          });

          // Add newly created item to the cache copy
          if (cacheData && cacheData.listUsers && cacheData.listUsers.items) {
            // @ts-ignore
            cacheData.listUsers.items = [
              ...cacheData.listUsers.items.filter((item) => item?.id !== mutationUpdateUser.id),
              {
                ...user,
                // eslint-disable-next-line no-underscore-dangle
                ...(removeNull(mutationUpdateUser) as UpdateUserMutation),
              },
            ];

            // Overwrite the cache with the new results
            cache.writeQuery<
            ListUsersQuery,
            ListUsersQueryVariables
            >({
              query: listUsersQuery,
              variables: {
                filter: {
                  owner: { eq: authUser?.username },
                },
              },
              data: cacheData,
            });
          }
        }
      }
    },
  });

  return {
    user, loading: loading || !called, createUser, updateUser,
  };
}
