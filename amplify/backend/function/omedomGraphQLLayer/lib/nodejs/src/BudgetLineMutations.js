"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBudgetLine = void 0;
const graphql_tag_1 = require("graphql-tag");
const updateBudgetLine = async (client, input) => {
    try {
        const { data } = await client.mutate({
            mutation: graphql_tag_1.default(`mutation UpdateBudgetLine($input: UpdateBudgetLineInput!) {
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
`),
            variables: {
                input,
            },
            fetchPolicy: 'no-cache',
        });
        if (data.updateBudgetLine) {
            return data.updateBudgetLine;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
};
exports.updateBudgetLine = updateBudgetLine;
