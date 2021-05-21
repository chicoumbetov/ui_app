import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
import { DocumentNode } from 'apollo-link';

import {
  CompanyType,
  CreateRealEstateMutation,
  CreateRealEstateMutationVariables, GetRealEstateQuery, GetRealEstateQueryVariables,
  ListRealEstatesQuery,
  ListRealEstatesQueryVariables,
  RealEstateType,
  UpdateRealEstateMutation,
  UpdateRealEstateMutationVariables,
} from '../API';
import { getRealEstate, listRealEstates } from '../graphql/queries';
import * as mutations from '../graphql/mutations';

export type RealEstateItem = {
  __typename: 'RealEstate',
  id: string,
  name: string,
  iconUri: string,
  purchaseYear?: number | null,
  type?: RealEstateType | null,
  ownName?: boolean | null,
  company?: CompanyType | null,
  detentionPart?: number | null,
  budgetLines?: {
    __typename: 'ModelBudgetLineConnection',
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
  documents?: {
    __typename: 'ModelDocumentConnection',
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
  admins: Array< string >,
  shared?: Array< string > | null,
  pendingInvitations?: Array< string > | null,
  address?: {
    __typename: 'Address',
    address: string,
    additionalAddress?: string | null,
    postalCode: string,
    city: string,
    country: string,
  } | null,
  tenants?: Array< {
    __typename: 'TenantInfo',
    amount: number,
    rentalCharges?: number | null,
    managementFees?: number | null,
    lastname: string,
    firstname: string,
    email: string,
    startDate: string,
    endDate?: string | null,
  } | null > | null,
  bankAccounts?: {
    __typename: 'ModelRealEstateBankAccountConnection',
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
};

export function useRealEstateList() {
  const listRealEstatesQuery = <DocumentNode>gql(listRealEstates);
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<ListRealEstatesQuery, ListRealEstatesQueryVariables>(listRealEstatesQuery);

  return {
    loading, data, fetchMore, refetch,
  };
}
export function createRealEstateMutation() {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const [createRealEstate] = useMutation<
  CreateRealEstateMutation,
  CreateRealEstateMutationVariables
  >(gql(mutations.createRealEstate));
  return createRealEstate;
}

export function updateRealEstateMutation() {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const [updateRealEstate] = useMutation<UpdateRealEstateMutation,
  UpdateRealEstateMutationVariables>(gql(mutations.updateRealEstate));
  return updateRealEstate;
}

export function useGetRealEstate(id: string) {
  const getRealEstatesQuery = <DocumentNode>gql(getRealEstate);
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<GetRealEstateQuery, GetRealEstateQueryVariables>(getRealEstatesQuery, {
    variables: {
      id,
    },
  });

  return {
    loading, data, fetchMore, refetch,
  };
}
