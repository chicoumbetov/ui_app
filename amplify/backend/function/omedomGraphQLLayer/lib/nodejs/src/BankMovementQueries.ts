import gql from 'graphql-tag';
import {
  ListBankMovementsByBiIdQuery,
  ListBankMovementsByBiIdQueryVariables,
} from '../../../../../../../src/API';
import { AppSyncClient } from './AppSyncClient';

const getBankMovementsByBiId = async (client: AppSyncClient, biId: number) => {
  try {
    const { data } = await client.query<
    ListBankMovementsByBiIdQuery,
    ListBankMovementsByBiIdQueryVariables
    >({
      query: gql(`query ListBankMovementsByBiId(
    $biId: Int
    $sortDirection: ModelSortDirection
    $filter: ModelBankMovementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBankMovementsByBiId(
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
    if (data?.listBankMovementsByBiId?.items && data?.listBankMovementsByBiId?.items.length > 0) {
      return data?.listBankMovementsByBiId?.items;
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
