import { useMutation, useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { DocumentNode } from 'apollo-link';
import {

  CreatePendingInvitationMutation,
  CreatePendingInvitationMutationVariables,
  DeletePendingInvitationMutation,
  DeletePendingInvitationMutationVariables,
  GetPendingInvitationQuery,
  GetPendingInvitationQueryVariables, GetRealEstateQueryVariables,
  ListPendingInvitationsQuery,
  ListPendingInvitationsQueryVariables,
  PendingInvitation,
} from '../API';
import * as mutations from '../graphql/mutations';
import {
  getPendingInvitation,
  listPendingInvitations,
} from '../graphql/queries';
import { getRealEstateQuery, GetRealEstateQuery } from './RealEstate';

export function useCreatePendingInvitationMutation() {
  const [createPendingInvitation, { loading: mutationLoading }] = useMutation<CreatePendingInvitationMutation,
  CreatePendingInvitationMutationVariables>(gql(mutations.createPendingInvitation));
  return { createPendingInvitation, mutationLoading };
}

export function useDeletePendingInvitationMutation() {
  const [deletePendingInvitation, { loading: mutationLoading }] = useMutation<DeletePendingInvitationMutation,
  DeletePendingInvitationMutationVariables>(gql(mutations.deletePendingInvitation), {
    update: (cache, { data: mutationData }) => {
      if (mutationData) {
        const { deletePendingInvitation: newData } = mutationData;
        if (newData) {
          // Read query from cache
          const cacheData = cache.readQuery<GetRealEstateQuery, GetRealEstateQueryVariables>({
            query: getRealEstateQuery,
            variables: {
              id: newData.realEstateId,
            },
          });

          // Add newly created item to the cache copy
          if (cacheData && cacheData.getRealEstate && cacheData.getRealEstate.pendingInvitations) {
            cacheData
              .getRealEstate
              .pendingInvitations
              .items = cacheData
                .getRealEstate
                .pendingInvitations
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
  return { deletePendingInvitation, mutationLoading };
}

export function useGetPendingInvitation(id: string) {
  const getPendingInvitationQuery = <DocumentNode>gql(getPendingInvitation);
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<GetPendingInvitationQuery, GetPendingInvitationQueryVariables>(getPendingInvitationQuery, {
    variables: {
      id,
    },
  });

  return {
    loading, pendingInvitations: <PendingInvitation>data?.getPendingInvitation, fetchMore, refetch,
  };
}

const listPendingInvitationsQuery = <DocumentNode>gql(listPendingInvitations);

export function usePendingInvitationsList() {
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<ListPendingInvitationsQuery, ListPendingInvitationsQueryVariables>(listPendingInvitationsQuery);

  return {
    loading, pendingInvitations: data?.listPendingInvitations?.items, fetchMore, refetch,
  };
}
