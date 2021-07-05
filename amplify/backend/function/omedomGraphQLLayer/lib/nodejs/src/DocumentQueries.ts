import gql from 'graphql-tag';
import {
  BudgetLineType, CompanyType,
  Frequency, InvitationType, RealEstateType, TaxType,
} from '../../../../../../../src/API';
import { AppSyncClient } from './AppSyncClient';

export type GetDocumentQueryVariables = {
  id: string,
};

export type GetDocumentQuery = {
  getDocument?: {
    __typename: 'Document',
    id: string,
    realEstateId: string,
    realEstate?: {
      __typename: 'RealEstate',
      admins: Array<string>,
      shared?: Array<string> | null,
    }
    name: string,
    key?: string | null,
    s3file: string,
    createdAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    updatedAt: string,
  } | null,
};

const getDocument = async (client: AppSyncClient, id: string) => {
  try {
    const { data } = await client.query<
    GetDocumentQuery,
    GetDocumentQueryVariables
    >({
      query: gql(`
  query GetDocument($id: ID!) {
    getDocument(id: $id) {
      id
      realEstateId
      realEstate {
        admins
        shared
      }
      name
      key
      s3file
      createdAt
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`),
      variables: {
        id,
      },
      fetchPolicy: 'no-cache',
    });
    if (data.getDocument) {
      return data.getDocument;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export {
  getDocument,
};
