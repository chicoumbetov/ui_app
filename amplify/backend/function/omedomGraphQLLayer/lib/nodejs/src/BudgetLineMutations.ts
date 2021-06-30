import gql from 'graphql-tag';
import {
  UpdateBudgetLineInput,
  UpdateBudgetLineMutation,
  UpdateBudgetLineMutationVariables,
} from '../../../../../../../src/API';
import { AppSyncClient } from './AppSyncClient';

const updateBudgetLine = async (client: AppSyncClient, input: UpdateBudgetLineInput) => {
  try {
    const { data } = await client.mutate<
    UpdateBudgetLineMutation,
    UpdateBudgetLineMutationVariables
    >({
      mutation: gql(`mutation UpdateBudgetLine($input: UpdateBudgetLineInput!) {
    updateBudgetLine(input: $input) {
      id
      realEstateId
      type
      category
      amount
      frequency
      nextDueDate
      infoCredit {
        borrowedCapital
        loadStartDate
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
    }
  }
`), // use your graphql query here
      variables: {
        input,
      },
      fetchPolicy: 'no-cache',
    });
    if (data.updateBudgetLine) {
      return data.updateBudgetLine;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export {
  updateBudgetLine,
};
