import { DocumentNode } from 'apollo-link';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { getBankMovementByBankAccountId, listBankMovements } from '../graphql/queries';
import {
  BankMovement,
  GetBankMovementQuery,
  GetBankMovementQueryVariables,
  ListBankMovementsQuery,
  ListBankMovementsQueryVariables,
} from '../API';

const listBankMouvementsQuery = <DocumentNode>gql(listBankMovements);

export function useBankMouvementList() {
  const {
    loading, data, fetchMore, refetch, subscribeToMore,
  } = useQuery<ListBankMovementsQuery, ListBankMovementsQueryVariables>(listBankMouvementsQuery);

  return { loading, refetch, bankMouvementList: data };
}

const getBankMovementByBankAccountIdQuery = <DocumentNode>gql(getBankMovementByBankAccountId);

export function getBankMouvementByBiId(id: string) {
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<GetBankMovementQuery, GetBankMovementQueryVariables>(getBankMovementByBankAccountIdQuery, {
    variables: {
      id,
    },
  });

  return {
    loading, bankMouvement: <BankMovement>data?.getBankMovement, fetchMore, refetch,
  };
}
