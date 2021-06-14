import { DocumentNode } from 'apollo-link';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
import { useEffect } from 'react';
import {
  getBankAccount,
  getRealEstateBankAccount,
  listBankAccounts,
  listRealEstateBankAccounts,
} from '../graphql/queries';
import {
  BankAccount,
  CreateRealEstateBankAccountMutation, CreateRealEstateBankAccountMutationVariables,
  DeleteRealEstateMutation,
  DeleteRealEstateMutationVariables,
  GetBankAccountQuery,
  GetBankAccountQueryVariables,
  GetRealEstateBankAccountQuery,
  GetRealEstateBankAccountQueryVariables,
  ListBankAccountsQuery,
  ListBankAccountsQueryVariables,
  ListRealEstateBankAccountsQuery,
  ListRealEstateBankAccountsQueryVariables,
  OnCreateRealEstateBankAccountSubscription,
  OnCreateRealEstateSubscription,
  OnCreateRealEstateSubscriptionVariables,
  RealEstateBankAccount,
} from '../API';
import { useUser } from './UserContext';
import * as subscriptions from '../graphql/subscriptions';
import * as mutations from '../graphql/mutations';

export function useGetRealEstateBankAccount(id: string) {
  const getRealEstateBankAccountQuery = <DocumentNode>gql(getRealEstateBankAccount);
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<GetRealEstateBankAccountQuery, GetRealEstateBankAccountQueryVariables>(getRealEstateBankAccountQuery, {
    variables: {
      id,
    },
  });

  return {
    loading, bankAccount: <RealEstateBankAccount>data?.getRealEstateBankAccount, fetchMore, refetch,
  };
}

export function useRealEstateBankAccountList() {
  const {
    loading, data, fetchMore, refetch, subscribeToMore,
  } = useQuery<ListRealEstateBankAccountsQuery, ListRealEstateBankAccountsQueryVariables>(listRealEstateBankAccounts);
  const { user } = useUser();

  useEffect(() => {
    let unsubscribe = () => {};
    if (user?.id) {
      unsubscribe = subscribeToMore<OnCreateRealEstateBankAccountSubscription,
      OnCreateRealEstateBankAccountSubscription>({
        document: gql(subscriptions.onCreateRealEstate),
        variables: {
          admins: user?.id,
        },
        updateQuery: (prev, { subscriptionData }) => {
          console.log(prev);
          console.log(subscriptionData);
        },
      });
    }
    return () => {
      unsubscribe();
    };
  }, [user]);

  return {
    loading, data, fetchMore, refetch,
  };
}
export function useCreateRealEstateBankAccount() {
  const [createRealEstateBankAccount] = useMutation<CreateRealEstateBankAccountMutation,
  CreateRealEstateBankAccountMutationVariables>(gql(mutations.createRealEstateBankAccount));
  return createRealEstateBankAccount;
}
