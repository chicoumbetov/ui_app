import gql from 'graphql-tag';
import {
  BudgetLineType,
  Frequency,
  ListRealEstatesQuery,
} from '../../../../../../../src/API';
import { AppSyncClient } from './AppSyncClient';

export type ListBudgetLinesQueryVariables = {
  startDate?: string | null,
  endDate?: string | null,
};

export type ListBudgetLinesQuery = {
  listRealEstates?: {
    __typename: 'ModelRealEstateConnection',
    items?: Array< {
      __typename: 'RealEstate',
      budgetLines?: {
        __typename: 'ModelBudgetLineConnection',
        items?: Array<{
          __typename: 'BudgetLine',
          id: string,
          realEstateId: string,
          type: BudgetLineType,
          category: string,
          amount: number,
          frequency: Frequency,
          nextDueDate: string,
          tenantId?: string | null,
          _version: number,
          _deleted?: boolean | null,
          _lastChangedAt: number,
          createdAt: string,
          updatedAt: string,
          infoCredit?: {
            __typename: 'MortgageLoanInfo',
            borrowedCapital: number,
            loanStartDate?: string | null,
            duration?: number | null,
            interestRate?: number | null,
            assuranceRate?: number | null,
            amortizationTable?: Array< {
              __typename: 'AmortizationTable',
              dueDate?: string | null,
              amount?: number | null,
              interest?: number | null,
              assurance?: number | null,
              amortizedCapital?: number | null,
            } | null > | null,
          } | null,
        } | null> | null,
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
    }>,
  } | null,
};

const listBudgetLines = async (client: AppSyncClient, startDate: string, endDate: string) => {
  try {
    const { data } = await client.query<
    ListRealEstatesQuery,
    ListBudgetLinesQueryVariables
    >({
      query: gql(`query ListRealEstates($startDate: String, $endDate: String) {
  listRealEstates(limit: 1000) {
    items {
      budgetLines(nextDueDate: {between: [$startDate, $endDate]}, limit: 1000) {
        items {
          id
          nextDueDate
          managementFees
          rentalCharges
          _deleted
          amount
          category
          createdAt
          frequency
          householdWaste
          realEstateId
          tenantId
          type
          updatedAt
          infoCredit {
            amortizationTable {
              amortizedCapital
              amount
              assurance
              dueDate
              interest
            }
            assuranceRate
            borrowedCapital
            duration
            interestRate
            loanStartDate
          }
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
        (global, item) => global.concat(item.budgetLines.items),
        [],
      );
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export {
  listBudgetLines,
};
