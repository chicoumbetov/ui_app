import gql from 'graphql-tag';
import {
  ListBankAccountByBiConnectionIdQuery, ListBankAccountByBiConnectionIdQueryVariables,
  ListBankAccountByBiIdQuery,
  ListBankAccountByBiIdQueryVariables,
} from '../../../../../../../src/API';
import { AppSyncClient } from './AppSyncClient';

const getBankAccountByBIId = async (client: AppSyncClient, biId: number) => {
  try {
    const { data } = await client.query<
    ListBankAccountByBiIdQuery,
    ListBankAccountByBiIdQueryVariables
    >({
      query: gql(`query ListBankAccountByBiId(
    $biId: Int
  ) {
    listBankAccountByBiId(
      biId: $biId
    ) {
      items {
        id
        bank
        accountOwner
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
      nextToken
      startedAt
    }
  }`), // use your graphql query here
      variables: {
        biId,
      },
      fetchPolicy: 'no-cache',
    });
    if (data.listBankAccountByBiId.items.length > 0) {
      return data.listBankAccountByBiId.items[0];
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const listBankAccountsByBIConnectionId = async (client: AppSyncClient, biConnectionId: number) => {
  try {
    const { data } = await client.query<
    ListBankAccountByBiConnectionIdQuery,
    ListBankAccountByBiConnectionIdQueryVariables
    >({
      query: gql(`query ListBankAccountByBiConnectionId(
    $biConnectionId: Int
  ) {
    listBankAccountByBiConnectionId(
      biConnectionId: $biConnectionId
      limit: 1000
    ) {
      items {
        id
        bank
        accountOwner
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
      nextToken
      startedAt
    }
  }`), // use your graphql query here
      variables: {
        biConnectionId,
      },
      fetchPolicy: 'no-cache',
    });
    if (data.listBankAccountByBiConnectionId.items.length > 0) {
      return data.listBankAccountByBiConnectionId.items;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export {
  getBankAccountByBIId,
  listBankAccountsByBIConnectionId,
};
