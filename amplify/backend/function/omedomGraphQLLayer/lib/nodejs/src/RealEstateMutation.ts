import gql from 'graphql-tag';
import {
  UpdateRealEstateMutation,
  UpdateRealEstateMutationVariables,
} from '../../../../../../../src/API';
import { AppSyncClient } from './AppSyncClient';

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

export {
  updateRealEstateMutation,
};
