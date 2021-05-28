import { WatchQueryFetchPolicy } from 'apollo-client';
import CryptoJS from 'crypto-js';
import { object } from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { OperationVariables } from '@apollo/react-common';
import { QueryHookOptions } from '@apollo/react-hooks/lib/types';
import { DocumentNode } from 'apollo-link';
import { useLazyQuery } from 'react-apollo';

export const GetFetchPolicy = async (
  query: DocumentNode,
  options?:Object,
  startPolicy: WatchQueryFetchPolicy = 'cache-and-network',
  nextPolicy: WatchQueryFetchPolicy = 'cache-first',
) => {
  const cacheKey = CryptoJS.MD5(JSON.stringify(query) + JSON.stringify(object)).toString();
  const lastTime = await AsyncStorage.getItem(cacheKey);
  const currentTime = Date.now();
  if (lastTime === null || parseInt(lastTime, 10) < currentTime - 15 * 60 * 1000) {
    await AsyncStorage.setItem(cacheKey, String(currentTime));
    return startPolicy;
  }
  return nextPolicy;
};

function useQueryWithNextFetchPolicy<TData = any, TVariables = OperationVariables>(query: DocumentNode, options?: QueryHookOptions<TData, TVariables> & { nextFetchPolicy: WatchQueryFetchPolicy }) {
  const [fetchPolicy, setFetchPolicy] = useState<null | string>(null);
  const [loadingFetchPolicy, setLoadingFetchPolicy] = useState(true);
  const [getData, {
    loading, data, refetch, subscribeToMore, called, fetchMore,
  }] = useLazyQuery(query, options);

  useEffect(() => {
    (async () => {
      const internalFetchPolicy = await GetFetchPolicy(
        query,
        options,
        options?.fetchPolicy,
        options?.nextFetchPolicy,
      );
      setFetchPolicy(internalFetchPolicy);
      setLoadingFetchPolicy(false);
    })();
  }, []);

  useEffect(() => {

  }, [loadingFetchPolicy]);
  return loading, data, refetch, subscribeToMore, called, fetchMore;
}

export default useQueryWithNextFetchPolicy;
