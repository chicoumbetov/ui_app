"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listBudgetLines = void 0;
const graphql_tag_1 = require("graphql-tag");
const listBudgetLines = async (client, startDate, endDate) => {
    try {
        const { data } = await client.query({
            query: graphql_tag_1.default(`query ListRealEstates($startDate: String, $endDate: String) {
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
            return data.listRealEstates.items.reduce((global, item) => global.concat(item.budgetLines.items), []);
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
};
exports.listBudgetLines = listBudgetLines;
