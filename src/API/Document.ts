import { DocumentNode } from 'apollo-link';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
import ApolloClient from 'apollo-client';
import {
  documentByKey, getDocument, getRealEstate, listDocuments,
} from '../graphql/queries';
import {
  CreateDocumentMutation,
  CreateDocumentMutationVariables,
  DeleteDocumentMutation,
  DeleteDocumentMutationVariables,
  GetDocumentQuery,
  GetDocumentQueryVariables,
  GetRealEstateQuery,
  GetRealEstateQueryVariables,
  Document,
  UpdateDocumentMutation,
  UpdateDocumentMutationVariables,
  RealEstate,
  DocumentByKeyQuery,
  DocumentByKeyQueryVariables,
  ListDocumentsQuery,
  ListDocumentsQueryVariables,
} from '../API';
import * as mutations from '../graphql/mutations';
import { getRealEstateQuery } from './RealEstate';

export type DocumentItem = {
  __typename: 'Document',
  id: string,
  realEstateId: string,
  name: string,
  s3file: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
  realEstate?: RealEstate | null,
};

export function useGetDocument(id: string) {
  const getDocumentQuery = <DocumentNode>gql(getDocument);
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<GetDocumentQuery, GetDocumentQueryVariables>(getDocumentQuery, {
    variables: {
      id,
    },
  });

  return {
    loading, Document: <Document>data?.getDocument, fetchMore, refetch,
  };
}

const listDocumentsQuery = <DocumentNode>gql(listDocuments);

export function useDocumentList() {
  const {
    data,
  } = useQuery<ListDocumentsQuery, ListDocumentsQueryVariables>(listDocumentsQuery);

  return { documentList: data };
}

export async function getDocumentByKey(client: ApolloClient<object>, key: string) {
  const getDocumentQuery = <DocumentNode>gql(documentByKey);
  const documents = await client.query<DocumentByKeyQuery, DocumentByKeyQueryVariables>({
    query: getDocumentQuery,
    variables: {
      key,
    },
    fetchPolicy: 'network-only',
  });

  return documents.data.documentByKey?.items?.pop();
}

export const createDocumentQuery = /* GraphQL */ `
  mutation CreateDocument(
    $input: CreateDocumentInput!
    $condition: ModelDocumentConditionInput
  ) {
    createDocument(input: $input, condition: $condition) {
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
  }
`;

export function useUpdateDocumentMutation() {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const [updateDocument, { loading: mutationLoading }] = useMutation<UpdateDocumentMutation,
  UpdateDocumentMutationVariables>(gql(mutations.updateDocument));
  return { updateDocument, mutationLoading };
}

export function useDeleteDocumentMutation() {
  const [deleteDocument] = useMutation<DeleteDocumentMutation,
  DeleteDocumentMutationVariables>(gql(mutations.deleteDocument),
    {
      update: (cache, { data: mutationData }) => {
        if (mutationData) {
          const { deleteDocument: newData } = mutationData;
          if (newData) {
            // Read query from cache
            const cacheData = cache.readQuery<GetRealEstateQuery, GetRealEstateQueryVariables>({
              query: getRealEstateQuery,
              variables: {
                id: newData.realEstateId,
              },
            });

            // Add newly created item to the cache copy
            if (cacheData && cacheData.getRealEstate && cacheData.getRealEstate.documents) {
              cacheData
                .getRealEstate
                .documents
                .items = cacheData
                  .getRealEstate
                  .documents
                  ?.items
                  ?.filter((item) => item?.id !== newData.id);

              // Overwrite the cache with the new results
              cache.writeQuery<GetRealEstateQuery, GetRealEstateQueryVariables>({
                query: getRealEstateQuery,
                variables: {
                  id: newData.realEstateId,
                },
                data: cacheData,
              });
            }
          }
        }
      },
    });
  return deleteDocument;
}

export function useCreateDocumentMutation() {
  const [createDocument, { loading: mutationLoading }] = useMutation<CreateDocumentMutation,
  CreateDocumentMutationVariables>(gql(createDocumentQuery),
    {
      update: (cache, { data: mutationData }) => {
        if (mutationData) {
          const { createDocument: newData } = mutationData;
          if (newData) {
            // Read query from cache
            const cacheData = cache.readQuery<GetRealEstateQuery, GetRealEstateQueryVariables>({
              query: getRealEstateQuery,
              variables: {
                id: newData.realEstateId,
              },
            });

            // Add newly created item to the cache copy
            if (cacheData && cacheData.getRealEstate) {
              // on fait unshift parce qu'on classe les docs par ordre décroissant de création
              cacheData.getRealEstate.documents?.items?.unshift(newData);

              // Overwrite the cache with the new results
              cache.writeQuery<GetRealEstateQuery, GetRealEstateQueryVariables>({
                query: getRealEstateQuery,
                variables: {
                  id: newData.realEstateId,
                },
                data: cacheData,
              });
            }
          }
        }
      },
    });
  return { createDocument, mutationLoading };
}
