import gql from 'graphql-tag';
import {
  BudgetLineType,
  Frequency,
} from '../../../../../../../src/API';
import { AppSyncClient } from './AppSyncClient';

export type ListBudgetLinesQueryVariables = {
  startDate?: string | null,
  endDate?: string | null,
};

export type BudgetLine = {
  __typename: 'BudgetLine',
  id: string,
  realEstateId: string,
  realEstate?: {
    __typename: 'RealEstate',
    id: string,
    name: string,
    admins: Array< string >,
  }
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
  householdWaste: number,
  managementFees: number,
  rentalCharges: number,
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
};

export type ListBudgetLinesQuery = {
  listRealEstates?: {
    __typename: 'ModelRealEstateConnection',
    items?: Array< {
      __typename: 'RealEstate',
      budgetLines?: {
        __typename: 'ModelBudgetLineConnection',
        items?: Array<BudgetLine | null> | null,
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
    }>,
  } | null,
};

const listBudgetLines = async (client: AppSyncClient, startDate: string, endDate: string) => {
  try {
    const { data } = await client.query<
    ListBudgetLinesQuery,
    ListBudgetLinesQueryVariables
    >({
      query: gql(`query ListRealEstates($startDate: String, $endDate: String) {
  listRealEstates(limit: 1000) {
    items {
      budgetLines(nextDueDate: {between: [$startDate, $endDate]}, limit: 1000) {
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
          frequency
          nextDueDate
          infoCredit {
            borrowedCapital
            loanStartDate
            duration
            interestRate
            assuranceRate
            amortizationTable {
              dueDate
              amount
              interest
              assurance
              amortizedCapital
            }
          }
          tenantId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          householdWaste
          managementFees
          rentalCharges
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
      ) as Array<BudgetLine | null>;
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
