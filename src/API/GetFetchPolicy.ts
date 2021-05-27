import { WatchQueryFetchPolicy } from 'apollo-client';
import CryptoJS from 'crypto-js';
import { object } from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GetFetchPolicy = async (
  query: string,
  options:Object,
  startPolicy: WatchQueryFetchPolicy = 'cache-and-network',
  nextPolicy: WatchQueryFetchPolicy = 'cache-first',
) => {
  const cacheKey = CryptoJS.MD5(query + JSON.stringify(object)).toString();
  const lastTime = await AsyncStorage.getItem(cacheKey);
  const currentTime = Date.now();
  if (lastTime === null || parseInt(lastTime, 10) < currentTime - 15 * 60 * 1000) {
    await AsyncStorage.setItem(cacheKey, String(currentTime));
    return startPolicy;
  }
  return nextPolicy;
};

export default GetFetchPolicy;
