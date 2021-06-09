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
    fetchPolicy: 'no-cache',
  });
};

const getRealEstate = async (client: AppSyncClient, id : string): Promise<false |
{
  __typename: 'RealEstate',
  id?: string,
  name?: string,
  admins?: Array< string >,
  shared?: Array< string > | null,
  _version?: number,
  _deleted?: boolean | null,
  _lastChangedAt?: number,
  createdAt?: string,
  updatedAt?: string,
} | null> => {
  const { data } = await client.query<GetRealEstateQuery, GetRealEstateQueryVariables>({
    query: gql(getRealEstateQuery),
    variables: {
      id,
    },
    fetchPolicy: 'no-cache',
  });
  return data.getRealEstate;
};

export {
  updateRealEstateMutation,
  getRealEstate,
};
