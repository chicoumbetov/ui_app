import gql from 'graphql-tag';
import {
  CreateBudgetLineDeadlineInput,
  CreateBudgetLineDeadlineMutation,
  CreateBudgetLineDeadlineMutationVariables,
} from '../../../../../../../src/API';
import { AppSyncClient } from './AppSyncClient';

const createBudgetLineDeadline = async (
  client: AppSyncClient,
  input: CreateBudgetLineDeadlineInput,
) => {
  try {
    const { data } = await client.mutate<
    CreateBudgetLineDeadlineMutation,
    CreateBudgetLineDeadlineMutationVariables
    >({
      mutation: gql(`mutation CreateBudgetLineDeadline(
    $input: CreateBudgetLineDeadlineInput!
    $condition: ModelBudgetLineDeadlineConditionInput
  ) {
    createBudgetLineDeadline(input: $input, condition: $condition) {
      id
      realEstateId
      bankMouvementId
      budgetLineId
      type
      category
      amount
      frequency
      date
      infoCredit {
        amount
        interest
        assurance
      }
      tenantId
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }`), // use your graphql query here
      variables: {
        input,
      },
      fetchPolicy: 'no-cache',
    });
    if (data.createBankAccount) {
      return data.createBankAccount;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export {
  createBudgetLineDeadline,
};
