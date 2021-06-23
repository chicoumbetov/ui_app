import gql from 'graphql-tag';
import {
  ListRealEstatesByBankAccountQuery,
  ListRealEstatesByBankAccountQueryVariables,
} from '../../../../../../../src/API';
import { AppSyncClient } from './AppSyncClient';

const listRealEstatesByBankAccount = async (client: AppSyncClient, bankAccountId: string) => {
  try {
    const { data } = await client.query<
    ListRealEstatesByBankAccountQuery,
    ListRealEstatesByBankAccountQueryVariables
    >({
      query: gql(`query ListRealEstatesByBankAccount(
    $bankAccountId: ID
  ) {
    listRealEstatesByBankAccount(
      bankAccountId: $bankAccountId
      limit: 1000
    ) {
      items {
        id
        realEstateId
        bankAccountId
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
        bankAccountId,
      },
      fetchPolicy: 'no-cache',
    });
    if (data.listRealEstatesByBankAccount.items.length > 0) {
      return data.listRealEstatesByBankAccount.items;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export {
  listRealEstatesByBankAccount,
};
