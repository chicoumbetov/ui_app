import { DocumentNode } from 'apollo-link';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
import {
  getBankMovement, listBankMovementsByBiId,
} from '../graphql/queries';
import {
  BankMovement,
  GetBankMovementsByBankAccountIdQuery,
  GetBankMovementsByBankAccountIdQueryVariables,
  GetBankMovementQuery,
  GetBankMovementQueryVariables,
  UpdateBankMovementMutation,
  UpdateBankMovementMutationVariables,
  ListRealEstatesQuery,
  ListRealEstatesQueryVariables,
  ListBankMovementsByBiIdQuery,
  ListBankMovementsByBiIdQueryVariables,
  RealEstateType,
  CompanyType,
  TaxType, InvitationType, BudgetLineType, Frequency,
} from '../API';
import * as mutations from '../graphql/mutations';
import { useUser } from './UserContext';

const getBankMovementsByBankAccountIdQuery = <DocumentNode>gql(`query GetBankMovementsByBankAccountId(
    $bankAccountId: ID
$date: ModelStringKeyConditionInput
$sortDirection: ModelSortDirection
$filter: ModelBankMovementFilterInput
$limit: Int
$nextToken: String
) {
  getBankMovementsByBankAccountId(
      bankAccountId: $bankAccountId
  date: $date
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
      ignored
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

export function useGetBankMovementsByBankAccountId(bankAccountId: string) {
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<
  GetBankMovementsByBankAccountIdQuery,
  GetBankMovementsByBankAccountIdQueryVariables
  >(getBankMovementsByBankAccountIdQuery, {
    variables: {
      bankAccountId,
    },
  });

  return {
    loading,
    bankMouvement: <BankMovement[]>data?.getBankMovementsByBankAccountId?.items,
    fetchMore,
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
            GetBankMovementQuery,
            GetBankMovementQueryVariables
            >({
              query: getBankMovementQuery,
              variables: {
                id: newData.id,
              },
            });

            // Add newly created item to the cache copy
            if (cacheData && cacheData.getBankMovement) {
              cacheData.getBankMovement = newData;
              // Overwrite the cache with the new results
              cache.writeQuery<
              GetBankMovementQuery,
              GetBankMovementQueryVariables
              >({
                query: getBankMovementQuery,
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
  id: string,
  start: string,
  end: string
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

const listBankMovementsByRealEstateQuery = <DocumentNode>gql(`query listBankMovementsByRealEstateQuery(
$id: ID!
$start: String!
$end: String!) {
  getRealEstate(id: $id) {
    bankMovements(sortDirection: DESC, date: {between: [$start, $end]}, filter: {ignored: {ne: true}}) {
      items {
        _deleted
        _lastChangedAt
        _version
        amount
        bankAccountId
        date
        description
        ignored
      }
      nextToken
      startedAt
    }
  }
}
`);
export function useListBankMovement(id: string, start: string, end: string) {
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<GetMovementByRealEstateQuery, GetMovementByRealEstateQueryVariables>(listBankMovementsByRealEstateQuery, {
    variables: {
      id,
      start,
      end,
    },
  });
  console.log('non non ', data);
  return {
    loading, data, fetchMore, refetch,
  };
}
