import { DocumentNode } from 'apollo-link';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
import { getBankAccount, getRealEstate, listBankAccounts } from '../graphql/queries';
import {
  BankAccount,
  DeleteBankAccountMutation, DeleteBankAccountMutationVariables,
  DeleteBudgetLineMutation,
  DeleteBudgetLineMutationVariables,
  GetBankAccountQuery,
  GetBankAccountQueryVariables,
  GetRealEstateQuery,
  GetRealEstateQueryVariables,
  ListBankAccountsQuery,
  ListBankAccountsQueryVariables,
  OnCreateBankAccountSubscription,
  OnCreateRealEstateSubscription,
  OnCreateRealEstateSubscriptionVariables,
} from '../API';
import { useUser } from './UserContext';
import * as subscriptions from '../graphql/subscriptions';
import * as mutations from '../graphql/mutations';

const getBankAccountQuery = <DocumentNode>gql(getBankAccount);
export function useGetBankAccount(id: string) {
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<GetBankAccountQuery, GetBankAccountQueryVariables>(getBankAccountQuery, {
    variables: {
      id,
    },
    fetchPolicy: 'cache-and-network',
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
  // console.log('ouiouiuiuiuiui', data);
  return {
    loading, data, fetchMore, refetch,
  };
}

export function useDeleteBankAccount() {
  const [deleteBankAccount] = useMutation<DeleteBankAccountMutation,
  DeleteBankAccountMutationVariables>(gql(mutations.deleteBankAccount),
    {
      update: (cache, { data: mutationData }) => {
        if (mutationData) {
          const { deleteBankAccount: newData } = mutationData;
          if (newData) {
            // Read query from cache
            const cacheData = cache.readQuery<ListBankAccountsQuery, ListBankAccountsQueryVariables>({
              query: listBankAccountQuery,
            });

            // Add newly created item to the cache copy
            if (cacheData && cacheData.listBankAccounts && cacheData.listBankAccounts.items) {
              cacheData
                .listBankAccounts
                .items = cacheData
                  .listBankAccounts
                  ?.items
                  ?.filter((item) => item?.id !== newData.id);

              // Overwrite the cache with the new results
              cache.writeQuery<ListBankAccountsQuery, ListBankAccountsQueryVariables>({
                query: listBankAccountQuery,
                data: cacheData,
              });
            }
          }
        }
      },
    });
  return deleteBankAccount;
}
