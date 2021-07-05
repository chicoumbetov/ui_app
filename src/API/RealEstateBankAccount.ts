import { DocumentNode } from 'apollo-link';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
import {
  getRealEstateBankAccount,
} from '../graphql/queries';
import {
  CreateRealEstateBankAccountMutation,
  CreateRealEstateBankAccountMutationVariables,
  DeleteRealEstateBankAccountMutation, DeleteRealEstateBankAccountMutationVariables,
  GetRealEstateBankAccountQuery,
  GetRealEstateBankAccountQueryVariables,
  RealEstateBankAccount,
} from '../API';
import * as mutations from '../graphql/mutations';

export function useGetRealEstateBankAccount(id: string) {
  const getRealEstateBankAccountQuery = <DocumentNode>gql(getRealEstateBankAccount);
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<
  GetRealEstateBankAccountQuery,
  GetRealEstateBankAccountQueryVariables
  >(getRealEstateBankAccountQuery, {
    variables: {
      id,
    },
  });

  return {
    loading, bankAccount: <RealEstateBankAccount>data?.getRealEstateBankAccount, fetchMore, refetch,
  };
}

export function useCreateRealEstateBankAccount() {
  const [createRealEstateBankAccount] = useMutation<CreateRealEstateBankAccountMutation,
  CreateRealEstateBankAccountMutationVariables>(gql(mutations.createRealEstateBankAccount));
  return createRealEstateBankAccount;
}

export function useDeleteRealEstateBankAccount() {
  const [deleteRealEstateBankAccount] = useMutation<DeleteRealEstateBankAccountMutation,
  DeleteRealEstateBankAccountMutationVariables>(gql(mutations.deleteRealEstateBankAccount));
  return deleteRealEstateBankAccount;
}
