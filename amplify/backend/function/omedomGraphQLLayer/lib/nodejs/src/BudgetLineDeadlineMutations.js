"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBudgetLineDeadline = void 0;
const graphql_tag_1 = require("graphql-tag");
const createBudgetLineDeadline = async (client, input) => {
    try {
        const { data } = await client.mutate({
            mutation: graphql_tag_1.default(`mutation CreateBudgetLineDeadline(
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
  }`),
            variables: {
                input,
            },
            fetchPolicy: 'no-cache',
        });
        if (data.createBankAccount) {
            return data.createBankAccount;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
};
exports.createBudgetLineDeadline = createBudgetLineDeadline;
