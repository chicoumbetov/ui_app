"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listBudgetLineDeadlinesLoyer = void 0;
const graphql_tag_1 = require("graphql-tag");
const listBudgetLineDeadlinesLoyer = async (client, startDate, endDate) => {
    try {
        const { data } = await client.query({
            query: graphql_tag_1.default(`query ListRealEstates($startDate: String, $endDate: String) {
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
            return data.listRealEstates.items.reduce((global, item) => global.concat(item.budgetLineDeadlines.items), []);
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
};
exports.listBudgetLineDeadlinesLoyer = listBudgetLineDeadlinesLoyer;
