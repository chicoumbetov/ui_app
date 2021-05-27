import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
import { DocumentNode } from 'apollo-link';

import { useEffect } from 'react';
import {
  CompanyType,
  CreateRealEstateMutation,
  CreateRealEstateMutationVariables, GetRealEstateQuery, GetRealEstateQueryVariables,
  ListRealEstatesQuery,
  ListRealEstatesQueryVariables,
  OnCreateRealEstateSubscription, OnCreateRealEstateSubscriptionVariables, RealEstate,
  RealEstateType,
  UpdateRealEstateMutation,
  UpdateRealEstateMutationVariables,
} from '../API';
import { getRealEstate, listRealEstates } from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';
import { useUser } from './UserContext';

export type RealEstateItem = {
  __typename: 'RealEstate',
  id: string,
  name: string,
  iconUri: string,
  purchaseYear?: number | null,
  type?: RealEstateType | null,
  ownName?: boolean | null,
  company?: CompanyType | null,
  detentionPart?: number | null,
  budgetLines?: {
    __typename: 'ModelBudgetLineConnection',
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
  documents?: {
    __typename: 'ModelDocumentConnection',
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
  admins: Array< string >,
  shared?: Array< string > | null,
  pendingInvitations?: Array< string > | null,
  address?: {
    __typename: 'Address',
    address: string,
    additionalAddress?: string | null,
    postalCode: string,
    city: string,
    country: string,
  } | null,
  tenants?: Array< {
    __typename: 'TenantInfo',
    amount: number,
    rentalCharges?: number | null,
    managementFees?: number | null,
    lastname: string,
    firstname: string,
    email: string,
    startDate: string,
    endDate?: string | null,
  } | null > | null,
  bankAccounts?: {
    __typename: 'ModelRealEstateBankAccountConnection',
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
};

const listRealEstatesQuery = <DocumentNode>gql(listRealEstates);

export function useRealEstateList() {
  const {
    loading, data, fetchMore, refetch, subscribeToMore,
  } = useQuery<ListRealEstatesQuery, ListRealEstatesQueryVariables>(listRealEstatesQuery);
  const { user } = useUser();

  useEffect(() => {
    let unsubscribe = () => {};
    if (user?.id) {
      unsubscribe = subscribeToMore<OnCreateRealEstateSubscription,
      OnCreateRealEstateSubscriptionVariables>({
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

export function useCreateRealEstateMutation() {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const [createRealEstate] = useMutation<
  CreateRealEstateMutation,
  CreateRealEstateMutationVariables
  >(gql(mutations.createRealEstate));
  return createRealEstate;
}

export function useUpdateRealEstateMutation() {
  const getRealEstatesQuery = <DocumentNode>gql(getRealEstate);
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const [updateRealEstate] = useMutation<UpdateRealEstateMutation,
  UpdateRealEstateMutationVariables>(gql(mutations.updateRealEstate), {
    update: (cache, { data: mutationData }) => {
      if (mutationData) {
        const { updateRealEstate: newData } = mutationData;
        if (newData) {
          // Read query from cache
          const cacheData = cache.readQuery<GetRealEstateQuery, GetRealEstateQueryVariables>({
            query: getRealEstatesQuery,
            variables: {
              id: newData.id,
            },
          });

          // Add newly created item to the cache copy
          if (cacheData && cacheData.getRealEstate) {
            cacheData.getRealEstate = newData;

            // Overwrite the cache with the new results
            cache.writeQuery<GetRealEstateQuery, GetRealEstateQueryVariables>({
              query: getRealEstatesQuery,
              variables: {
                id: newData.id,
              },
              data: cacheData,
            });
          }
        }
      }
    },
  });
  return updateRealEstate;
}

export function useGetRealEstate(id: string) {
  const getRealEstatesQuery = <DocumentNode>gql(getRealEstate);
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<GetRealEstateQuery, GetRealEstateQueryVariables>(getRealEstatesQuery, {
    variables: {
      id,
    },
    fetchPolicy: 'cache-and-network',
  });

  return {
    loading, bien: <RealEstate>data?.getRealEstate, fetchMore, refetch,
  };
}
