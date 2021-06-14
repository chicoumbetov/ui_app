import { DocumentNode } from 'apollo-link';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
import { getBankMovementByBankAccountId, listBankMovements } from '../graphql/queries';
import {
  BankMovement,
  GetBankMovementByBankAccountIdQuery,
  GetBankMovementByBankAccountIdQueryVariables,
  ListBankMovementsQuery,
  ListBankMovementsQueryVariables, UpdateBankMovementMutation, UpdateBankMovementMutationVariables,
} from '../API';
import * as mutations from '../graphql/mutations';

const listBankMouvementsQuery = <DocumentNode>gql(listBankMovements);

export function useBankMouvementList() {
  const {
    loading, data, refetch,
  } = useQuery<ListBankMovementsQuery, ListBankMovementsQueryVariables>(listBankMouvementsQuery);

  return { loading, refetch, bankMouvementList: data };
}

const getBankMovementByBankAccountIdQuery = <DocumentNode>gql(getBankMovementByBankAccountId);

export function useGetBankMovementByBankAccountId(bankAccountId: string) {
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<
  GetBankMovementByBankAccountIdQuery,
  GetBankMovementByBankAccountIdQueryVariables
  >(getBankMovementByBankAccountIdQuery, {
    variables: {
      bankAccountId,
    },
  });

  return {
    loading,
    bankMouvement: <BankMovement[]>data?.getBankMovementByBankAccountId?.items,
    fetchMore,
    refetch,
  };
}

export function useUpdateBankMovement() {
  const [updateBankMovement, { loading: mutationLoading }] = useMutation<
  UpdateBankMovementMutation,
  UpdateBankMovementMutationVariables
  >(gql(mutations.updateBankMovement),
    {
      update: (cache, { data: mutationData }) => {
        if (mutationData) {
          const { updateBankMovementByBankAccountId: newData } = mutationData;
          if (newData) {
            // Read query from cache
            const cacheData = cache.readQuery<
            GetBankMovementByBankAccountIdQuery,
            GetBankMovementByBankAccountIdQueryVariables
            >({
              query: getBankMovementByBankAccountIdQuery,
              variables: {
                id: newData.bankAccountId,
              },
            });

            // Add newly created item to the cache copy
            if (cacheData && cacheData.getBankMovementByBankAccountId) {
              cacheData.getBankMovementByBankAccountId = newData;
              // Overwrite the cache with the new results
              cache.writeQuery<
              GetBankMovementByBankAccountIdQuery,
              GetBankMovementByBankAccountIdQueryVariables
              >({
                query: getBankMovementByBankAccountIdQuery,
                variables: {
                  id: newData.bankAccountId,
                },
                data: cacheData,
              });
            }
          }
        }
      },
    });
  return { updateBankMovement, mutationLoading };
}
