/**
 *
 *
 * @author: David-Julian Buch
 */

import * as _ from 'lodash';
import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';

const BASE_DIR = `${FileSystem.cacheDirectory}expo-image-cache/`;

export class CacheEntry {
  uri: string;

  path?: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  async getPath(): Promise<string | undefined> {
    const { uri } = this;
    const { path, exists, tmpPath } = await getCacheEntry(uri);
    if (exists) {
      // console.log('has cache', path);
      return path;
    }
    await FileSystem.downloadAsync(uri, tmpPath);
    await FileSystem.moveAsync({ from: tmpPath, to: path });
    // console.log('has no cache', path);
    return path;
  }
}

export default class CacheManager {
  static entries: { [uri: string]: CacheEntry } = {};

  static get(uri: string): CacheEntry {
    if (!CacheManager.entries[uri]) {
      CacheManager.entries[uri] = new CacheEntry(uri);
    }
    return CacheManager.entries[uri];
  }

  static async clearCache(): Promise<void> {
    await FileSystem.deleteAsync(BASE_DIR, { idempotent: true });
    await FileSystem.makeDirectoryAsync(BASE_DIR);
  }
}

const getCacheEntry = async (uri: string):
Promise<{ exists: boolean; path: string; tmpPath: string }> => {
  const filename = uri.substring(
    uri.lastIndexOf('/'),
    uri.indexOf('?') === -1 ? uri.length : uri.indexOf('?'),
  );
  const ext = filename.indexOf('.') === -1 ? '.jpg' : filename.substring(filename.lastIndexOf('.'));
  const sha1URI = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA1, uri);
  const path = `${BASE_DIR}${sha1URI}${ext}`;
  const tmpPath = `${BASE_DIR}${sha1URI}-${_.uniqueId()}${ext}`;
  try {
    const exists = await FileSystem.getInfoAsync(BASE_DIR);
    if (!exists.exists) {
      await FileSystem.makeDirectoryAsync(BASE_DIR);
    }
  } catch (e) {
    // do nothing
  }
  const info = await FileSystem.getInfoAsync(path);
  const { exists } = info;
  return { exists, path, tmpPath };
};
