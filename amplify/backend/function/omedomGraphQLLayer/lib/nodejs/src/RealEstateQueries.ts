import gql from 'graphql-tag';
import {
  GetRealEstateQueryVariables,
  GetRealEstateQuery,
  ModelRealEstateFilterInput,
  RealEstateType,
  CompanyType,
  TaxType,
  RentalType,
  InvitationType, BankMovementStatus, BudgetLineType, Frequency,
} from '../../../../../../../src/API';
import { AppSyncClient } from './AppSyncClient';

export type ListRealEstatesQueryVariables = {
  filter?: ModelRealEstateFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRealEstatesQuery = {
  listRealEstates?: {
    __typename: 'ModelRealEstateConnection',
    items?: Array< {
      __typename: 'RealEstate',
      id: string,
      name: string,
      admins: Array< string >,
      shared?: Array< string > | null,
      purchasePrice?: number | null,
      notaryFee?: number | null,
      _deleted?: boolean | null,
      budgetLineDeadlines?: {
        __typename: 'ModelBudgetLineDeadlineConnection',
        items?: Array< {
          __typename: 'BudgetLineDeadline',
          id: string,
          realEstateId: string,
          bankMouvementId?: string | null,
          budgetLineId: string,
          type: BudgetLineType,
          category: string,
          amount: number,
          rentalCharges?: number | null,
          managementFees?: number | null,
          householdWaste?: number | null,
          rentalType?: RentalType | null,
          frequency: Frequency,
          date?: string | null,
          tenantId?: string | null,
          _version: number,
          _deleted?: boolean | null,
          _lastChangedAt: number,
          createdAt: string,
          updatedAt: string,
          infoCredit?: {
            __typename: 'MortgageLoanDeadlineInfo',
            amount?: number | null,
            interest?: number | null,
            assurance?: number | null,
          } | null,
        } | null > | null,
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export const listRealEstatesQuery = /* GraphQL */ `
  query ListRealEstates(
    $filter: ModelRealEstateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRealEstates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        admins
        shared
        _deleted
        purchasePrice
        notaryFee
        budgetLineDeadlines(limit:1000) {
          items {
            id
            realEstateId
            bankMouvementId
            budgetLineId
            type
            category
            amount
            rentalCharges
            managementFees
            householdWaste
            rentalType
            frequency
            date
            tenantId
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            infoCredit {
              amount
              interest
              assurance
            }
          }
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;

const listRealEstates = async (
  client: AppSyncClient,
  variables : ListRealEstatesQueryVariables,
) => {
  const { data } = await client.query<ListRealEstatesQuery, ListRealEstatesQueryVariables>({
    query: gql(listRealEstatesQuery),
    variables,
    fetchPolicy: 'no-cache',
  });
  return data?.listRealEstates?.items || false;
};

const getRealEstateQuery = /* GraphQL */ `
  query GetRealEstate($id: ID!) {
    getRealEstate(id: $id) {
      id
      name
      admins
      shared
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;

const getRealEstate = async (client: AppSyncClient, id : string): Promise<false |
{
  __typename: 'RealEstate',
  id?: string,
  name?: string,
  admins?: Array< string >,
  shared?: Array< string > | null,
  _version?: number,
  _deleted?: boolean | null,
  _lastChangedAt?: number,
  createdAt?: string,
  updatedAt?: string,
} | null> => {
  const { data } = await client.query<GetRealEstateQuery, GetRealEstateQueryVariables>({
    query: gql(getRealEstateQuery),
    variables: {
      id,
    },
    fetchPolicy: 'no-cache',
  });
  return data.getRealEstate;
};

export {
  getRealEstate,
  listRealEstates,
};
