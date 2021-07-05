import gql from 'graphql-tag';
import {
  BudgetLine,
  BudgetLineType,
  ListRealEstatesQuery,
} from '../../../../../../../src/API';
import { AppSyncClient } from './AppSyncClient';

export type ListBudgetLineDeadlinesQueryVariables = {
  startDate?: string | null,
  endDate?: string | null,
};

export type BudgetLineDeadline = {
  __typename: 'BudgetLineDeadline',
  id: string,
  realEstateId: string,
  bankMouvementId?: string | null,
  type: BudgetLineType,
  category: string,
  amount: number,
  date?: string | null,
  tenantId?: string | null,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
  realEstate?: {
    __typename: 'RealEstate',
    id: string,
    name: string,
    admins: Array< string >,
  }
};

export type ListBudgetLineDeadlinesQuery = {
  listRealEstates?: {
    __typename: 'ModelRealEstateConnection',
    items?: Array< {
      __typename: 'RealEstate',
      budgetLineDeadlines?: {
        __typename: 'ModelBudgetLineDeadlineConnection',
        items?: Array<BudgetLineDeadline | null> | null,
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
    }>,
  } | null,
};

const listBudgetLineDeadlinesLoyer = async (
  client: AppSyncClient,
  startDate: string,
  endDate: string,
) => {
  try {
    const { data } = await client.query<
    ListBudgetLineDeadlinesQuery,
    ListBudgetLineDeadlinesQueryVariables
    >({
      query: gql(`query ListRealEstates($startDate: String, $endDate: String) {
  listRealEstates(limit: 1000) {
    items {
      budgetLineDeadlines(date: {between: [$startDate, $endDate]}, limit: 1000, filter:{category:{eq:"loyer"}, bankMouvementId:{attributeExists:false}}) {
        items {
          id
          realEstateId
          realEstate {
            id
            name
            admins
          }
          type
          category
          amount
          bankMouvementId
          date
          tenantId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
    }
  }
}
`),
      variables: {
        startDate,
        endDate,
      },
      fetchPolicy: 'no-cache',
    });
    if (data.listRealEstates.items.length > 0) {
      return data.listRealEstates.items.reduce(
        (global, item) => global.concat(item.budgetLineDeadlines.items),
        [],
      ) as Array<BudgetLineDeadline | null>;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export {
  listBudgetLineDeadlinesLoyer,
};
