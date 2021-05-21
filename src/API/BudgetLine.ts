import { DocumentNode } from 'apollo-link';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
import { getBudgetLine } from '../graphql/queries';
import {
  CreateBudgetLineMutation, CreateBudgetLineMutationVariables,
  GetBudgetLineQuery,
  GetBudgetLineQueryVariables, UpdateBudgetLineMutation, UpdateBudgetLineMutationVariables,
} from '../API';
import * as mutations from '../graphql/mutations';

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
