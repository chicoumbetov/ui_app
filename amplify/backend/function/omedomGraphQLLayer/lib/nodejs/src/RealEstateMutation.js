"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRealEstateMutation = void 0;
const graphql_tag_1 = require("graphql-tag");
const mutationUpdateRealEstate = /* GraphQL */ `
  mutation UpdateRealEstate(
    $input: UpdateRealEstateInput!
    $condition: ModelRealEstateConditionInput
  ) {
    updateRealEstate(input: $input, condition: $condition) {
      id
      name
      iconUri
      purchaseYear
      type
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
const updateRealEstateMutation = async (client, input) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    await client.mutate({
        mutation: graphql_tag_1.default(mutationUpdateRealEstate),
        variables: {
            input,
        },
        fetchPolicy: 'no-cache',
    });
};
exports.updateRealEstateMutation = updateRealEstateMutation;
