import { DocumentNode } from 'apollo-link';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
import { getBudgetLine, getBudgetLineDeadline, getRealEstate } from '../graphql/queries';
import {
  CreateBudgetLineMutation,
  CreateBudgetLineMutationVariables,
  DeleteBudgetLineMutation,
  DeleteBudgetLineMutationVariables,
  GetRealEstateQuery,
  GetRealEstateQueryVariables,
  UpdateBudgetLineMutation,
  UpdateBudgetLineMutationVariables,
  GetBudgetLineDeadlineQuery,
  GetBudgetLineDeadlineQueryVariables,
  BudgetLineDeadline,
  UpdateBudgetLineDeadlineMutation,
  UpdateBudgetLineDeadlineMutationVariables,
  DeleteBudgetLineDeadlineMutation,
  GetBudgetLineQuery,
  GetBudgetLineQueryVariables,
  CreateBudgetLineDeadlineMutation,
  CreateBudgetLineDeadlineMutationVariables, DeleteBudgetLineDeadlineMutationVariables,
} from '../API';
import * as mutations from '../graphql/mutations';

export function useGetBudgetLineDeadLine(id: string) {
  const getBudgetLineDeadLineQuery = <DocumentNode>gql(getBudgetLineDeadline);
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<GetBudgetLineDeadlineQuery, GetBudgetLineDeadlineQueryVariables>(getBudgetLineDeadLineQuery, {
    variables: {
      id,
    },
  });

  return {
    loading, budgetLine: <BudgetLineDeadline>data?.getBudgetLineDeadline, fetchMore, refetch,
  };
}

export function useUpdateBudgetLineDeadlineMutation() {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const [updateBudgetLineDeadline, { loading: mutationLoading }] = useMutation<UpdateBudgetLineDeadlineMutation,
  UpdateBudgetLineDeadlineMutationVariables>(gql(mutations.updateBudgetLineDeadline));
  return { updateBudgetLineDeadline, mutationLoading };
}

export function useDeleteBudgetLineDeadlineMutation() {
  const getRealEstatesQuery = <DocumentNode>gql(getRealEstate);
  const [deleteBudgetLineDeadLine] = useMutation<DeleteBudgetLineDeadlineMutation,
  DeleteBudgetLineDeadlineMutationVariables>(gql(mutations.deleteBudgetLineDeadline),
    {
      update: (cache, { data: mutationData }) => {
        if (mutationData) {
          const { deleteBudgetLineDeadline: newData } = mutationData;
          if (newData) {
            // Read query from cache
            const cacheData = cache.readQuery<GetRealEstateQuery, GetRealEstateQueryVariables>({
              query: getRealEstatesQuery,
              variables: {
                id: newData.realEstateId,
              },
            });

            // Add newly created item to the cache copy
            if (cacheData && cacheData.getRealEstate && cacheData.getRealEstate.budgetLines) {
              cacheData
                .getRealEstate
                .budgetLines
                .items = cacheData
                  .getRealEstate
                  .budgetLines
                  ?.items
                  ?.filter((item) => item?.id !== newData.id);

              // Overwrite the cache with the new results
              cache.writeQuery<GetRealEstateQuery, GetRealEstateQueryVariables>({
                query: getRealEstatesQuery,
                variables: {
                  id: newData.realEstateId,
                },
                data: cacheData,
              });
            }
          }
        }
      },
    });
  return deleteBudgetLineDeadLine;
}

export function useCreateBudgetLineDeadlineMutation() {
  const getRealEstatesQuery = <DocumentNode>gql(getRealEstate);
  const [createBudgetLineDeadLine, { loading: mutationLoading }] = useMutation<CreateBudgetLineDeadlineMutation,
  CreateBudgetLineDeadlineMutationVariables>(gql(mutations.createBudgetLineDeadline),
    {
      update: (cache, { data: mutationData }) => {
        if (mutationData) {
          const { createBudgetLineDeadline: newData } = mutationData;
          if (newData) {
            // Read query from cache
            const cacheData = cache.readQuery<GetRealEstateQuery, GetRealEstateQueryVariables>({
              query: getRealEstatesQuery,
              variables: {
                id: newData.realEstateId,
              },
            });

            // Add newly created item to the cache copy
            if (cacheData && cacheData.getRealEstate) {
              cacheData.getRealEstate.budgetLineDeadlines?.items?.push(newData);

              // Overwrite the cache with the new results
              cache.writeQuery<GetRealEstateQuery, GetRealEstateQueryVariables>({
                query: getRealEstatesQuery,
                variables: {
                  id: newData.realEstateId,
                },
                data: cacheData,
              });
            }
          }
        }
      },
    });
  return { createBudgetLineDeadLine, mutationLoading };
}
