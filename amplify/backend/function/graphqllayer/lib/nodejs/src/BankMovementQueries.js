"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBankMovementsByBiId = void 0;
const graphql_tag_1 = require("graphql-tag");
const getBankMovementsByBiId = async (client, biId) => {
    try {
        const { data } = await client.query({
            query: graphql_tag_1.default(`query ListBankMovementByBiId(
    $biId: Int
    $sortDirection: ModelSortDirection
    $filter: ModelBankMovementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBankMovementByBiId(
      biId: $biId
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        bankAccountId
        realEstateId
        biId
        description
        amount
        budgetLineDeadlineId
        ignored
        date
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }`),
            variables: {
                biId,
            },
            fetchPolicy: 'no-cache',
        });
        if (data?.listBankMovementByBiId?.items && data?.listBankMovementByBiId?.items.length > 0) {
            return data?.listBankMovementByBiId?.items;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
};
exports.getBankMovementsByBiId = getBankMovementsByBiId;
