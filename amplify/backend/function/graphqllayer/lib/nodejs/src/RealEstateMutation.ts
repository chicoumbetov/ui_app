import gql from 'graphql-tag';
import {
  GetRealEstateQueryVariables,
  UpdateRealEstateMutation,
  UpdateRealEstateMutationVariables,
    GetRealEstateQuery,
} from '../../../../../../../src/API';
import { AppSyncClient } from './AppSyncClient';
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

const updateRealEstateMutation = async (client: AppSyncClient, input) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  await client.mutate<UpdateRealEstateMutation,
  UpdateRealEstateMutationVariables>({
    mutation: gql(mutationUpdateRealEstate),
    variables: {
      input,
    },
    fetchPolicy: 'network-only',
  });
};

const getRealEstate = async (client: AppSyncClient,id : string): Promise<false |
    {
      __typename: "RealEstate",
      id?: string,
      name?: string,
      admins?: Array< string >,
      shared?: Array< string > | null,
      _version?: number,
      _deleted?: boolean | null,
      _lastChangedAt?: number,
      createdAt?: string,
      updatedAt?: string,
    } | null> =>{

  const { data } = await client.query<GetRealEstateQuery, GetRealEstateQueryVariables>({
    query: gql(getRealEstateQuery),
  variables: {
      id
  },
    fetchPolicy: 'no-cache',
  })
  return data.getRealEstate
}


export {
  updateRealEstateMutation,
  getRealEstate
};


