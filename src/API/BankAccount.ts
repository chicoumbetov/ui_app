import { DocumentNode } from 'apollo-link';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { getBankAccount, listBankAccounts } from '../graphql/queries';
import {
  BankAccount,
  GetBankAccountQuery,
  GetBankAccountQueryVariables,
  ListBankAccountsQuery,
  ListBankAccountsQueryVariables,
  OnCreateBankAccountSubscription,
  OnCreateRealEstateSubscription,
  OnCreateRealEstateSubscriptionVariables,
} from '../API';
import { useUser } from './UserContext';
import * as subscriptions from '../graphql/subscriptions';

const getBankAccountQuery = <DocumentNode>gql(getBankAccount);
export function useGetBankAccount(id: string) {
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<GetBankAccountQuery, GetBankAccountQueryVariables>(getBankAccountQuery, {
    variables: {
      id,
    },
  });

  return {
    loading, bankAccount: <BankAccount>data?.getBankAccount, fetchMore, refetch,
  };
}
const listBankAccountQuery = <DocumentNode>gql(listBankAccounts);
export function useBankAccountList() {
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<ListBankAccountsQuery, ListBankAccountsQueryVariables>(listBankAccountQuery);

  return {
    loading, data, fetchMore, refetch,
  };
}
