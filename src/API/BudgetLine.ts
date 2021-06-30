import { DocumentNode } from 'apollo-link';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
import { getBudgetLine, getRealEstate } from '../graphql/queries';
import {
  BudgetLineType,
  CreateBudgetLineMutation,
  CreateBudgetLineMutationVariables, DeleteBudgetLineMutation, DeleteBudgetLineMutationVariables,
  Frequency,
  GetBudgetLineQuery,
  GetBudgetLineQueryVariables,
  GetRealEstateQuery, GetRealEstateQueryVariables,
  ListRealEstatesQuery,
  ListRealEstatesQueryVariables,
  MortgageLoanInfo,
  RealEstate,
  BudgetLine,
  TenantInfo,
  UpdateBudgetLineMutation,
  UpdateBudgetLineMutationVariables,
} from '../API';
import * as mutations from '../graphql/mutations';

export type BudgetLineItem = {
  __typename: 'BudgetLine',
  id?: string,
  realEstateId?: string,
  type?: BudgetLineType,
  category?: string | null,
  amount?: number | null,
  rentalCharges?: number | null,
  managementFees?: number | null,
  frequency: Frequency,
  nextDueDate?: string | null,
  infoCredit?: MortgageLoanInfo,
  _version?: number,
  _deleted?: boolean | null,
  _lastChangedAt?: number,
  createdAt?: string,
  updatedAt?: string,
  realEstate?: RealEstate,
  tenants: TenantInfo
};

export function useGetBudgetLine(id: string) {
  const getBudgetLineQuery = <DocumentNode>gql(getBudgetLine);
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<GetBudgetLineQuery, GetBudgetLineQueryVariables>(getBudgetLineQuery, {
    variables: {
      id,
    },
  });

  return {
    loading, budgetLine: <BudgetLine>data?.getBudgetLine, fetchMore, refetch,
  };
}

export function useUpdateBudgetLineMutation() {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const [updateBudgetLine, { loading: mutationLoading }] = useMutation<UpdateBudgetLineMutation,
  UpdateBudgetLineMutationVariables>(gql(mutations.updateBudgetLine));
  return { updateBudgetLine, mutationLoading };
}

export function useDeleteBudgetLineMutation() {
  const getRealEstatesQuery = <DocumentNode>gql(getRealEstate);
  const [deleteBudgetLine] = useMutation<DeleteBudgetLineMutation,
  DeleteBudgetLineMutationVariables>(gql(mutations.deleteBudgetLine),
    {
      update: (cache, { data: mutationData }) => {
        if (mutationData) {
          const { deleteBudgetLine: newData } = mutationData;
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
  return deleteBudgetLine;
}

export function useCreateBudgetLineMutation() {
  const getRealEstatesQuery = <DocumentNode>gql(getRealEstate);
  const [createBudgetLine, { loading: mutationLoading }] = useMutation<CreateBudgetLineMutation,
  CreateBudgetLineMutationVariables>(gql(mutations.createBudgetLine),
    {
      update: (cache, { data: mutationData }) => {
        if (mutationData) {
          const { createBudgetLine: newData } = mutationData;
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
              cacheData.getRealEstate.budgetLines?.items?.push(newData);

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
  return { createBudgetLine, mutationLoading };
}
