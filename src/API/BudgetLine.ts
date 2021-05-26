import { DocumentNode } from 'apollo-link';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
import { getBudgetLine, getRealEstate } from '../graphql/queries';
import {
  BudgetLineType,
  CreateBudgetLineMutation,
  CreateBudgetLineMutationVariables,
  Frequency,
  GetBudgetLineQuery,
  GetBudgetLineQueryVariables,
  GetRealEstateQuery, GetRealEstateQueryVariables,
  ListRealEstatesQuery,
  ListRealEstatesQueryVariables,
  MortgageLoanInfo,
  RealEstate,
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

export function useGetBudgetLine(realEstateId: string) {
  const getBudgetLineQuery = <DocumentNode>gql(getBudgetLine);
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<GetBudgetLineQuery, GetBudgetLineQueryVariables>(getBudgetLineQuery, {
    variables: {
      realEstateId,
    },
  });

  return {
    loading, data, fetchMore, refetch,
  };
}

export function useUpdateBudgetLineMutation() {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const [updateBudgetLine] = useMutation<UpdateBudgetLineMutation,
  UpdateBudgetLineMutationVariables>(gql(mutations.updateBudgetLine));
  return updateBudgetLine;
}

export function useCreateBudgetLineMutation() {
  const getRealEstatesQuery = <DocumentNode>gql(getRealEstate);
  const [createBudgetLine] = useMutation<CreateBudgetLineMutation,
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
  return createBudgetLine;
}
