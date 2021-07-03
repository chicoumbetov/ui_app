import gql from 'graphql-tag';
import {
  GetBankAccountQuery, GetBankAccountQueryVariables,
  ListBankAccountsByBiConnectionIdQuery,
  ListBankAccountsByBiConnectionIdQueryVariables,
  ListBankAccountsByBiIdQueryVariables,
} from '../../../../../../../src/API';
import { AppSyncClient } from './AppSyncClient';

type ListBankAccountsByBiIdQuery = {
  listBankAccountsByBiId?: {
    __typename: 'ModelBankAccountConnection',
    items?: Array< {
      __typename: 'BankAccount',
      id: string,
      bank?: string | null,
      name?: string | null,
      iban?: string | null,
      bic?: string | null,
      balance: number,
      biId: number,
      biConnectionId: number,
      biState?: string | null,
      accountOwner?: string | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      realEstates?: {
        __typename: 'ModelRealEstateBankAccountConnection',
        items?: Array< {
          __typename: 'RealEstateBankAccount',
          realEstate?: {
            __typename: 'RealEstate',
            id: string,
            name: string,
            admins: Array< string >,
            iconUri: string,
          }
        } | null > | null,
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

const getBankAccountsByBIId = async (client: AppSyncClient, biId: number) => {
  try {
    const { data } = await client.query<
    ListBankAccountsByBiIdQuery,
    ListBankAccountsByBiIdQueryVariables
    >({
      query: gql(`query ListBankAccountsByBiId(
    $biId: Int
  ) {
    listBankAccountsByBiId(
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
        realEstates {
          items {
            realEstate {
              id
              name
              admins
              iconUri
            }
          }
        }
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
    if (data.listBankAccountsByBiId.items.length > 0) {
      return data.listBankAccountsByBiId.items[0];
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const getBankAccountsById = async (client: AppSyncClient, id: string) => {
  try {
    const { data } = await client.query<
    GetBankAccountQuery,
    GetBankAccountQueryVariables
    >({
      query: gql(`query GetBankAccount(
    $id: Int
  ) {
    getBankAccount(
      id: $id
    ) {
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
  }`), // use your graphql query here
      variables: {
        id,
      },
      fetchPolicy: 'no-cache',
    });
    if (data.getBankAccount) {
      return data.getBankAccount;
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
    ListBankAccountsByBiConnectionIdQuery,
    ListBankAccountsByBiConnectionIdQueryVariables
    >({
      query: gql(`query ListBankAccountsByBiConnectionId(
    $biConnectionId: Int
  ) {
    listBankAccountsByBiConnectionId(
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
    if (data.listBankAccountsByBiConnectionId.items.length > 0) {
      return data.listBankAccountsByBiConnectionId.items;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export {
  getBankAccountsByBIId,
  getBankAccountsById,
  listBankAccountsByBIConnectionId,
};
