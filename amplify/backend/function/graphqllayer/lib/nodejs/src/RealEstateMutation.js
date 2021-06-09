"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRealEstate = exports.updateRealEstateMutation = void 0;
const graphql_tag_1 = require("graphql-tag");
const getRealEstateQuery = /* GraphQL */ `
  query GetRealEstate($id: ID!) {
    getRealEstate(id: $id) {
      id
      name
      admins
      shared
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
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
      ownName
      company
      detentionPart
      typeImpot
      budgetLines {
        items {
          id
          realEstateId
          type
          category
          amount
          frequency
          nextDueDate
          tenantId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      bankMovements {
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
      budgetLineDeadlines {
        items {
          id
          realEstateId
          budgetLineId
          type
          category
          amount
          frequency
          date
          tenantId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      documents {
        items {
          id
          realEstateId
          name
          key
          s3file
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      admins
      shared
      pendingInvitations {
        items {
          id
          realEstateId
          email
          type
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      address {
        address
        additionalAddress
        postalCode
        city
        country
      }
      tenants {
        id
        amount
        rentalCharges
        managementFees
        lastname
        firstname
        email
        startDate
        endDate
      }
      bankAccounts {
        items {
          id
          realEstateId
          bankAccountId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
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
        fetchPolicy: 'network-only',
    });
};
exports.updateRealEstateMutation = updateRealEstateMutation;
const getRealEstate = async (client, id) => {
    const { data } = await client.query({
        query: graphql_tag_1.default(getRealEstateQuery),
        variables: {
            id
        },
        fetchPolicy: 'no-cache',
    });
    return data.getRealEstate;
};
exports.getRealEstate = getRealEstate;
