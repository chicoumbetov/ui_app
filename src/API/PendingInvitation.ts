import { useMutation, useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { DocumentNode } from 'apollo-link';
import {

  CreatePendingInvitationMutation,
  CreatePendingInvitationMutationVariables,
  DeletePendingInvitationMutation,
  DeletePendingInvitationMutationVariables,
  GetPendingInvitationQuery,
  GetPendingInvitationQueryVariables,
  ListPendingInvitationsQuery,
  ListPendingInvitationsQueryVariables,
  PendingInvitation,
} from '../API';
import * as mutations from '../graphql/mutations';
import {
  getPendingInvitation,
  listPendingInvitations,
} from '../graphql/queries';

export function useCreatePendingInvitationMutation() {
  const [createPendingInvitation, { loading: mutationLoading }] = useMutation<CreatePendingInvitationMutation,
  CreatePendingInvitationMutationVariables>(gql(mutations.createPendingInvitation));
  return { createPendingInvitation, mutationLoading };
}

export function useDeletePendingInvitationMutation() {
  const [deletePendingInvitation, { loading: mutationLoading }] = useMutation<DeletePendingInvitationMutation,
  DeletePendingInvitationMutationVariables>(gql(mutations.deletePendingInvitation));
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
