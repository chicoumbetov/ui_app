import { DocumentNode } from 'apollo-link';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
import { WatchQueryFetchPolicy } from 'apollo-client/core/watchQueryOptions';
import { getBankMovement } from '../graphql/queries';
import {
  BankMovement,
  BankMovementStatus,
  GetBankMovementQuery,
  GetBankMovementQueryVariables,
  GetBankMovementsByBankAccountIdQuery,
  GetBankMovementsByBankAccountIdQueryVariables,
  ModelBankMovementBankMovementsByBankAccountCompositeKeyConditionInput,
  ModelBankMovementFilterInput,
  ModelSortDirection,
  UpdateBankMovementMutation,
  UpdateBankMovementMutationVariables,
} from '../API';
import * as mutations from '../graphql/mutations';

const getBankMovementsByBankAccountIdQuery = <DocumentNode>gql(`query GetBankMovementsByBankAccountId(
    $bankAccountId: ID
    $statusDate: ModelBankMovementBankMovementsByBankAccountCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelBankMovementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getBankMovementsByBankAccountId(
      bankAccountId: $bankAccountId
      statusDate: $statusDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
    items {
      id
      bankAccountId
      realEstateId
      biId
      description
      amount
      status
      date
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      realEstate {
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      budgetLineDeadlines {
        items {
          id
          realEstateId
          budgetLineId
          type
          category
          amount
          rentalCharges
          managementFees
          _version
        }
        nextToken
        startedAt
      }
      bankAccount {
        id
        bank
        accountOwner
        name
        iban
        bic
        balance
        biId
        biConnectionId
        biState
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
    nextToken
    startedAt
  }
}
`);

const getBankMovementQuery = <DocumentNode>gql(getBankMovement);

export function useGetBankMovementsByBankAccountId(bankAccountId: string, status: BankMovementStatus, fetchPolicy: WatchQueryFetchPolicy = 'cache-first') {
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<
  GetBankMovementsByBankAccountIdQuery,
  GetBankMovementsByBankAccountIdQueryVariables
  >(getBankMovementsByBankAccountIdQuery, {
    variables: {
      bankAccountId,
      statusDate: {
        beginsWith: {
          status,
        },
      },
      sortDirection: ModelSortDirection.DESC,
    },
    fetchPolicy,
  });

  return {
    loading,
    bankMouvement: <BankMovement[]>data?.getBankMovementsByBankAccountId?.items,
    nextToken: data?.getBankMovementsByBankAccountId?.nextToken,
    startedAt: data?.getBankMovementsByBankAccountId?.startedAt,
    fetchMoreBankMovements: () => (fetchMore({
      variables: {
        nextToken: data?.getBankMovementsByBankAccountId?.nextToken,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          getBankMovementsByBankAccountId: {
            ...prev.getBankMovementsByBankAccountId,
            items: [
              ...prev.getBankMovementsByBankAccountId.items,
              ...fetchMoreResult.getBankMovementsByBankAccountId?.items,
            ],
            nextToken: fetchMoreResult.getBankMovementsByBankAccountId?.nextToken,
            startedAt: fetchMoreResult.getBankMovementsByBankAccountId?.startedAt,
          },
        };
      },
    })),
    nextToken: data?.getBankMovementsByBankAccountId?.nextToken,
    refetch,
  };
}

export function useUpdateBankMovement() {
  const [updateBankMovement, { loading: mutationLoading }] = useMutation<
  UpdateBankMovementMutation,
  UpdateBankMovementMutationVariables
  >(gql(mutations.updateBankMovement),
    {
      update: (cache, { data: mutationData }) => {
        if (mutationData) {
          const { updateBankMovement: newData } = mutationData;
          if (newData) {
            // Read query from cache
            const cacheData = cache.readQuery<
            GetBankMovementsByBankAccountIdQuery,
            GetBankMovementsByBankAccountIdQueryVariables
            >({
              query: getBankMovementsByBankAccountIdQuery,
              variables: {
                bankAccountId: newData.bankAccountId,
              },
            });

            // Add newly created item to the cache copy
            if (cacheData && cacheData.getBankMovementsByBankAccountId?.items) {
              cacheData.getBankMovementsByBankAccountId.items.map((item) => {
                if (item?.id === newData.id) { return newData; } return item;
              });
              // Overwrite the cache with the new results
              cache.writeQuery<
              GetBankMovementsByBankAccountIdQuery,
              GetBankMovementsByBankAccountIdQueryVariables
              >({
                query: getBankMovementsByBankAccountIdQuery,
                variables: {
                  bankAccountId: newData.bankAccountId,
                },
                data: cacheData,
              });
            }
          }
        }
      },
    });
  return { updateBankMovement, mutationLoading };
}

export function useGetBankMouvement(id: string) {
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<GetBankMovementQuery, GetBankMovementQueryVariables>(getBankMovementQuery, {
    variables: {
      id,
    },
    fetchPolicy: 'cache-and-network',
  });

  return {
    loading, bankMovement: <BankMovement>data?.getBankMovement, fetchMore, refetch,
  };
}

export type GetMovementByRealEstateQueryVariables = {
  realEstateId?: string | null,
  statusDate?: ModelBankMovementBankMovementsByBankAccountCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelBankMovementFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetMovementByRealEstateQuery = {
  getRealEstate?: {
    __typename: 'RealEstate',
    bankMovements?: {
      __typename: 'ModelBankMovementConnection',
      items?: Array< {
        __typename: 'BankMovement',
        description?: string | null,
        amount: number,
        ignored?: boolean | null,
        date?: string | null,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,

      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
  } | null,
};

const listBankMovementsByRealEstateQuery = <DocumentNode>gql(`
query listBankMovementsByRealEstateQuery(
    $realEstateId: ID!
    $statusDate: ModelBankMovementBankMovementsByRealEstateCompositeKeyConditionInput
  ) {
  getRealEstate(id: $realEstateId) {
    id
    bankMovements: bankMovements(sortDirection: DESC, statusDate:  $statusDate, limit: 1000) {
      items {
        _deleted
        _lastChangedAt
        _version
        amount
        bankAccountId
        date
        description
        status
      }
      nextToken
      startedAt
    }
  }
}

`);

export function useListBankMovement(realEstateId: string, status: BankMovementStatus, date: string) {
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<
  GetMovementByRealEstateQuery, GetMovementByRealEstateQueryVariables
  >(listBankMovementsByRealEstateQuery, {
    variables: {
      realEstateId,
      statusDate: {
        beginsWith: {
          status,
          date,
        },
      },

    },
  });
  // console.log('useListBankMovement data: ', data, loading);
  return {
    loading, data, fetchMore, refetch,
  };
}

const listBankMovementsByListRealEstateQuery = <DocumentNode>gql(`
query listBankMovementsByRealEstateQuery(
    $statusDate: ModelBankMovementBankMovementsByRealEstateCompositeKeyConditionInput
  ) {
    listRealEstates {
    items {
      id
      iconUri
       positiveMovements: bankMovements(sortDirection: DESC, statusDate:  $statusDate, filter: {amount: {ge: 0}}, limit: 1000) {
            items {
              _deleted
              _lastChangedAt
              _version
              amount
              bankAccountId
              date
              description
              status
            }
            nextToken
            startedAt
          }
       negativeMovements: bankMovements(sortDirection: DESC, statusDate: $statusDate, filter: {amount: {le: 0}}, limit: 1000) {
             items {
                _deleted
                _lastChangedAt
                _version
                amount
                bankAccountId
                date
                description
                status
             }
             nextToken
             startedAt
        }
        
    }
  }
}

`);

export type GetMovementByListRealEstateQuery = {
  listRealEstates?: {
    __typename: 'ModelRealEstateConnection',
    items?: Array< {
      __typename: 'RealEstate',
      id: string,
      iconUri: string,
      positiveMovements?: {
        __typename: 'ModelBankMovementConnection',
        items?: Array< {
          __typename: 'BankMovement',
          description?: string | null,
          amount: number,
          ignored?: boolean | null,
          date?: string | null,
          _version: number,
          _deleted?: boolean | null,
          _lastChangedAt: number,

        } | null > | null,
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      negativeMovements?: {
        __typename: 'ModelBankMovementConnection',
        items?: Array< {
          __typename: 'BankMovement',
          description?: string | null,
          amount: number,
          ignored?: boolean | null,
          date?: string | null,
          _version: number,
          _deleted?: boolean | null,
          _lastChangedAt: number,

        } | null > | null,
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
    } | null >
  }
};

export function useListBankMovementbyListRealEstate(status: BankMovementStatus, dateStart: string, dateEnd: string) {
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<
  GetMovementByListRealEstateQuery, GetMovementByRealEstateQueryVariables
  >(listBankMovementsByListRealEstateQuery, {
    variables: {
      statusDate: {
        between: [{
          status,
          date: dateStart,
        }, {
          status,
          date: dateEnd,
        }],
      },

    },
    fetchPolicy: 'cache-and-network',
  });
  console.log('useListBankMovement data: ', data);
  return {
    loading, data, fetchMore, refetch,
  };
}
