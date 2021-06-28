import { DocumentNode } from 'apollo-link';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
import moment from 'moment';
import { useMemo } from 'react';
import {
  RealEstate,
  ListNotificationsByUserQuery,
  ListNotificationsByUserQueryVariables,
  UpdateBankMovementMutation,
  UpdateBankMovementMutationVariables,
  GetBankMovementQuery,
  GetBankMovementQueryVariables,
  UpdateNotificationMutation, UpdateNotificationMutationVariables, ModelSortDirection,
} from '../API';
import * as mutations from '../graphql/mutations';
import { useUser } from './UserContext';
import DateUtils from '../../utils/DateUtils';

export const listNotificationsByUser = /* GraphQL */ `
  query ListNotificationsByUser(
    $userId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotificationsByUser(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        type
        title
        body
        data
        clicked
        createdAt
        _version
        _deleted
        _lastChangedAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;

const getNotificationQuery = <DocumentNode>gql(listNotificationsByUser);
export function useNotificationsList(
  variables: ListNotificationsByUserQueryVariables,
) {
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<
  ListNotificationsByUserQuery,
  ListNotificationsByUserQueryVariables
  >(
    getNotificationQuery,
    {
      variables,
    },
  );

  return {
    loading, notifications: data?.listNotificationsByUser?.items, fetchMore, refetch,
  };
}

export function useUpdateNotification() {
  const [updateNotification, { loading: mutationLoading }] = useMutation<
  UpdateNotificationMutation,
  UpdateNotificationMutationVariables
  >(gql(mutations.updateNotification),
    {
      update: (cache, { data: mutationData }) => {
        if (mutationData) {
          const { updateNotification: newData } = mutationData;
          if (newData) {
            // Read query from cache
            const cacheData = cache.readQuery<
            ListNotificationsByUserQuery,
            ListNotificationsByUserQueryVariables
            >({
              query: getNotificationQuery,
              variables: {
                userId: newData.userId,
                sortDirection: ModelSortDirection.DESC,
                createdAt: {
                  ge: moment().add(-30, 'days').format('YYYY-MM-DDT00:00:00'),
                },
              },
            });

            // Add newly created item to the cache copy
            if (cacheData && cacheData.listNotificationsByUser?.items) {
              cacheData.listNotificationsByUser
                .items = cacheData.listNotificationsByUser.items?.map(
                  (item) => {
                    if (item && item.id === newData.id) {
                      return newData;
                    }
                    return item;
                  },
                );

              // Overwrite the cache with the new results
              cache.writeQuery<
              ListNotificationsByUserQuery,
              ListNotificationsByUserQueryVariables
              >({
                query: getNotificationQuery,
                variables: {
                  userId: newData.userId,
                  sortDirection: ModelSortDirection.DESC,
                  createdAt: {
                    ge: moment().add(-30, 'days').format('YYYY-MM-DDT00:00:00'),
                  },
                },
                data: cacheData,
              });
            }
          }
        }
      },
    });
  return { updateNotification, mutationLoading };
}

export function useCountUnseenNotification() {
  const { user } = useUser();
  const { notifications } = useNotificationsList({
    userId: user?.id,
    sortDirection: ModelSortDirection.DESC,
    createdAt: {
      ge: moment().add(-30, 'days').format('YYYY-MM-DDT00:00:00'),
    },
  });

  return useMemo(() => {
    if (user?.privateProfile?.notificationLastSeenAt) {
      const notificationLastSeenAtDate = DateUtils.parseToDateObj(
        user.privateProfile.notificationLastSeenAt,
      );
      return notifications ? notifications?.reduce(
        (count, item) => {
          if (item) {
            const itemDate = DateUtils.parseToDateObj(item.createdAt);
            return count + (itemDate > notificationLastSeenAtDate ? 1 : 0);
          }
          return count;
        },
        0,
      ) : 0;
    }
    return notifications?.length || 0;
  }, [
    user, notifications,
  ]);
}
