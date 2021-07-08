import { DocumentNode } from 'apollo-link';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
import { WatchQueryFetchPolicy } from 'apollo-client/core/watchQueryOptions';
import { listBillingHistoriesByUser } from '../graphql/queries';
import {
  CreateBillingHistoryMutation,
  CreateBillingHistoryMutationVariables,
  ListBillingHistoriesByUserQuery,
  ListBillingHistoriesByUserQueryVariables,
} from '../API';
import * as mutations from '../graphql/mutations';

const listBillingHistoriesByUserQuery = <DocumentNode>gql(listBillingHistoriesByUser);

export function useBillingHistoriesList(
  variables: ListBillingHistoriesByUserQueryVariables,
  fetchPolicy:WatchQueryFetchPolicy = 'cache-first',
) {
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<
  ListBillingHistoriesByUserQuery,
  ListBillingHistoriesByUserQueryVariables
  >(
    listBillingHistoriesByUserQuery,
    {
      variables,
      fetchPolicy,
    },
  );

  return {
    loading, billingHistories: data?.listBillingHistoriesByUser?.items, fetchMore, refetch,
  };
}

export function useCreateBillingHistory() {
  const [createBillingHistory, { loading: mutationLoading }] = useMutation<
  CreateBillingHistoryMutation,
  CreateBillingHistoryMutationVariables
  >(gql(mutations.createBillingHistory),
    {
      update: (cache, { data: mutationData }) => {
        if (mutationData) {
          const { createBillingHistory: newData } = mutationData;
          if (newData) {
            // Read query from cache
            const cacheData = cache.readQuery<
            ListBillingHistoriesByUserQuery,
            ListBillingHistoriesByUserQueryVariables
            >({
              query: listBillingHistoriesByUserQuery,
              variables: {
                userId: newData.userId,
              },
            });

            // Add newly created item to the cache copy
            if (cacheData && cacheData.listBillingHistoriesByUser?.items) {
              cacheData?.listBillingHistoriesByUser?.items?.unshift(newData);

              // Overwrite the cache with the new results
              cache.writeQuery<
              ListBillingHistoriesByUserQuery,
              ListBillingHistoriesByUserQueryVariables
              >({
                query: listBillingHistoriesByUserQuery,
                variables: {
                  userId: newData.userId,
                },
                data: cacheData,
              });
            }
          }
        }
      },

    });
  return { createBillingHistory, mutationLoading };
}
