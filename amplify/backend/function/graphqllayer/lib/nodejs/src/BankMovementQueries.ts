import gql from 'graphql-tag';
import {
  ListBankMovementByBiIdQuery,
  ListBankMovementByBiIdQueryVariables,
} from '../../../../../../../src/API';
import { AppSyncClient } from './AppSyncClient';

const getBankMovementsByBiId = async (client: AppSyncClient, biId: number) => {
  try {
    const { data } = await client.query<
    ListBankMovementByBiIdQuery,
    ListBankMovementByBiIdQueryVariables
    >({
      query: gql(`query ListBankMovementByBiId(
    $biId: Int
    $sortDirection: ModelSortDirection
    $filter: ModelBankMovementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBankMovementByBiId(
      biId: $biId
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
      }
      nextToken
      startedAt
    }
  }`), // use your graphql query here
      variables: {
        biId,
      },
      fetchPolicy: 'no-cache',
    });
    if (data?.listBankMovementByBiId?.items && data?.listBankMovementByBiId?.items.length > 0) {
      return data?.listBankMovementByBiId?.items;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export {
  getBankMovementsByBiId,
};
