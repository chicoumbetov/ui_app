import { DocumentNode } from 'apollo-link';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
import { getBudgetLine } from '../graphql/queries';
import {
  BudgetLineType,
  CreateBudgetLineMutation,
  CreateBudgetLineMutationVariables,
  Frequency,
  GetBudgetLineQuery,
  GetBudgetLineQueryVariables,
  MortgageLoanInfo,
  RealEstate,
  UpdateBudgetLineMutation,
  UpdateBudgetLineMutationVariables,
} from '../API';
import * as mutations from '../graphql/mutations';

export type BudgetLine = {
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
    loading, data, fetchMore, refetch,
  };
}

export function updateBudgetLineMutation() {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const [updateBudgetLine] = useMutation<UpdateBudgetLineMutation,
  UpdateBudgetLineMutationVariables>(gql(mutations.updateBudgetLine));
  return updateBudgetLine;
}

export function createBudgetLineMutation() {
  const [createBudgetLine] = useMutation<CreateBudgetLineMutation,
  CreateBudgetLineMutationVariables>(gql(mutations.createBudgetLine));
  return createBudgetLine;
}
