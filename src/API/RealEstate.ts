import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
import { DocumentNode } from 'apollo-link';

import { useEffect } from 'react';
import {
  Address,
  BudgetLineType,
  CompanyType,
  CreateRealEstateMutation,
  CreateRealEstateMutationVariables,
  DeleteRealEstateMutation,
  DeleteRealEstateMutationVariables,
  Frequency,
  GetRealEstateQueryVariables,
  ListRealEstatesQuery,
  ListRealEstatesQueryVariables,
  ModelBankMovementConnection,
  ModelBudgetLineConnection,
  ModelBudgetLineDeadlineConnection,
  ModelDocumentConnection,
  ModelPendingInvitationConnection,
  ModelRealEstateBankAccountConnection,
  OnCreateRealEstateSubscription,
  OnCreateRealEstateSubscriptionVariables,
  RealEstate,
  RealEstateType,
  TaxType,
  TenantInfo,
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
  typeImpot?: TaxType | null,
  budgetLines?: ModelBudgetLineConnection | null,
  bankMovements?: ModelBankMovementConnection | null,
  budgetLineDeadlines?: ModelBudgetLineDeadlineConnection | null,
  documents?: ModelDocumentConnection | null,
  admins: Array< string >,
  shared?: Array< string > | null,
  pendingInvitations?: ModelPendingInvitationConnection | null,
  address?: Address | null,
  tenants?: Array<TenantInfo | null > | null,
  bankAccounts?: ModelRealEstateBankAccountConnection | null,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
};

export type GetRealEstateQuery = {
  getRealEstate?: {
    __typename: 'RealEstate',
    id: string,
    name: string,
    iconUri: string,
    purchaseYear?: number | null,
    type?: RealEstateType | null,
    ownName?: boolean | null,
    company?: CompanyType | null,
    detentionPart?: number | null,
    typeImpot?: TaxType | null,
    budgetLines?: {
      __typename: 'ModelBudgetLineConnection',
      items?: Array< {
        __typename: 'BudgetLine',
        id: string,
        realEstateId: string,
        type: BudgetLineType,
        category: string,
        amount: number,
        frequency: Frequency,
        nextDueDate?: string | null,
        infoCredit?: {
          __typename: 'MortgageLoanInfo',
          borrowedCapital: number,
          loadStartDate?: string | null,
          duration?: number | null,
          interestRate?: number | null,
          assuranceRate?: number | null,
          amortizationTable?: Array< {
            __typename: 'AmortizationTable',
            dueDate?: string | null,
            amount?: number | null,
            interest?: number | null,
            assurance?: number | null,
            amortizedCapital?: number | null,
          } | null > | null,
        } | null,
        tenantId?: string | null,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    documents?: {
      __typename: 'ModelDocumentConnection',
      items?: Array< {
        __typename: 'Document',
        id: string,
        realEstateId: string,
        name: string,
        s3file: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
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
      id: string,
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
      items?: Array< {
        __typename: 'RealEstateBankAccount',
        id: string,
        realEstateId: string,
        bankAccountId: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

const listRealEstatesQuery = <DocumentNode>gql(`query ListRealEstates(
    $filter: ModelRealEstateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRealEstates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        iconUri
        purchaseYear
        type
        ownName
        company
        detentionPart
        typeImpot
        admins
        shared
        address {
          address
          additionalAddress
          postalCode
          city
          country
        }
        tenants {
          id
          amount
          rentalCharges
          managementFees
          lastname
          firstname
          email
          startDate
          endDate
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        pendingInvitations {
          nextToken
          startedAt
        }
        documents {
          nextToken
          startedAt
        }
         budgetLines {
        items {
          id
          realEstateId
          type
          category
          amount
          frequency
          nextDueDate
          tenantId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      budgetLineDeadlines {
        items {
          id
          realEstateId
          bankMouvementId
          budgetLineId
          type
          category
          amount
          frequency
          date
          tenantId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
        bankAccounts {
          nextToken
          startedAt
        }
        bankMovements {
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`);

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
  const [createRealEstate, { loading: mutationLoading }] = useMutation<
  CreateRealEstateMutation,
  CreateRealEstateMutationVariables
  >(gql(mutations.createRealEstate), {
    update: (cache, { data: mutationData }) => {
      if (mutationData) {
        const { createRealEstate: newData } = mutationData;
        if (newData) {
          // Read query from cache
          const cacheData = cache.readQuery<
          ListRealEstatesQuery,
          ListRealEstatesQueryVariables>({
            query: listRealEstatesQuery,
          });

          // Add newly created item to the cache copy
          if (cacheData && cacheData.listRealEstates
              && cacheData.listRealEstates.items) {
            cacheData.listRealEstates.items.push(newData);

            // Overwrite the cache with the new results
            cache.writeQuery<
            ListRealEstatesQuery,
            ListRealEstatesQueryVariables>({
              query: listRealEstatesQuery,
              data: cacheData,
            });
          }
        }
      }
    },
  });
  return { createRealEstate, mutationLoading };
}

export function useUpdateRealEstateMutation() {
  const getRealEstatesQuery = <DocumentNode>gql(getRealEstate);
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const [updateRealEstate, { loading: mutationLoading }] = useMutation<UpdateRealEstateMutation,
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
  return { updateRealEstate, mutationLoading };
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
    loading, bienget: <RealEstate>data?.getRealEstate, fetchMore, refetch,
  };
}

export function useDeleteRealEstateMutation() {
  const [deleteRealEstate] = useMutation<DeleteRealEstateMutation,
  DeleteRealEstateMutationVariables>(gql(mutations.deleteBudgetLine));
  return deleteRealEstate;
}
