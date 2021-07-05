import { DocumentNode } from 'apollo-link';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
import moment from 'moment';
import { useMemo } from 'react';
import * as Notifications from 'expo-notifications';
import {
  ListNotificationsByUserQuery,
  ListNotificationsByUserQueryVariables,
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
      fetchPolicy: 'cache-and-network',
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
    let count = notifications?.length || 0;
    if (user?.privateProfile?.notificationLastSeenAt) {
      const notificationLastSeenAtDate = DateUtils.parseToDateObj(
        user.privateProfile.notificationLastSeenAt,
      );
      count = notifications ? notifications?.reduce(
        (countReduced, item) => {
          if (item) {
            const itemDate = DateUtils.parseToDateObj(item.createdAt);
            return countReduced + (itemDate > notificationLastSeenAtDate ? 1 : 0);
          }
          return countReduced;
        },
        0,
      ) : 0;
    }
    Notifications.setBadgeCountAsync(count);
    return count;
  }, [
    user, notifications,
  ]);
}
