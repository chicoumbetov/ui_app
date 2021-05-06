/**
 *
 *
 * @author: David-Julian Buch
 */

export class CacheEntry {
  uri: string;

  path?: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  async getPath(): Promise<string | undefined> {
    const { uri } = this;
    return uri;
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

  }
}
