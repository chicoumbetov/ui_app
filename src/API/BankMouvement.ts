import { DocumentNode } from 'apollo-link';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
import {
  getBankMovement,
  getBankMovementByBankAccountId,
  listBankMovements,
} from '../graphql/queries';
import {
  BankMovement,
  GetBankMovementByBankAccountIdQuery,
  GetBankMovementByBankAccountIdQueryVariables,
  GetBankMovementQuery,
  GetBankMovementQueryVariables,
  GetRealEstateQueryVariables,
  ListBankMovementsQuery,
  ListBankMovementsQueryVariables, RealEstate,
  UpdateBankMovementMutation,
  UpdateBankMovementMutationVariables,
} from '../API';
import * as mutations from '../graphql/mutations';
import { GetRealEstateQuery } from './RealEstate';

const listBankMouvementsQuery = <DocumentNode>gql(listBankMovements);

export function useBankMouvementList() {
  const {
    loading, data, refetch,
  } = useQuery<ListBankMovementsQuery, ListBankMovementsQueryVariables>(listBankMouvementsQuery);

  return { loading, refetch, bankMouvementList: data };
}

const getBankMovementByBankAccountIdQuery = <DocumentNode>gql(`query GetBankMovementByBankAccountId(
    $bankAccountId: ID
$date: ModelStringKeyConditionInput
$sortDirection: ModelSortDirection
$filter: ModelBankMovementFilterInput
$limit: Int
$nextToken: String
) {
  getBankMovementByBankAccountId(
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
      budgetLineDeadline {
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

export function useGetBankMovementByBankAccountId(bankAccountId: string) {
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<
  GetBankMovementByBankAccountIdQuery,
  GetBankMovementByBankAccountIdQueryVariables
  >(getBankMovementByBankAccountIdQuery, {
    variables: {
      bankAccountId,
    },
  });

  return {
    loading,
    bankMouvement: <BankMovement[]>data?.getBankMovementByBankAccountId?.items,
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
