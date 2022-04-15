import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Dexie from 'dexie';

const browserCache: any = new Dexie('app_db');
browserCache.version(1).stores({
  /*
  All cache will be stored in table "Cache" with:
  - key: unique access key to data
  - createdAt: date of creation of the cache
  - data: json string of objects
  */
  cache: '++id, key, createdAt' 
});

@Injectable()
export class BrowserCacheService {

  constructor (
    private readonly httpClient: HttpClient
  ) { }

  async getOrSetCache(key: string, callback: any): Promise<any> {

    const [dataLastUpdatedAt, cacheLastUpdatedAt]: Date[] = await Promise.all([
      this.getDataLastUpdatedAt(key),
      this.getCacheLastUpdatedAt(key)
    ]);
    if (cacheLastUpdatedAt > dataLastUpdatedAt) {
      try {
        const cache = await browserCache.cache
          .where('key').equals(key)
          .first();
        if (cache) return (JSON.parse(cache.data));
      } catch (e) {
        this.resetBrowserDB();
      }
    }

    const data = await callback();
    this.resetCache(key, data);
    return data;
  }

  async resetCache(key: string, data: any): Promise<void> {
    await this.removeCache(key);
    browserCache.cache.add({ key: key, data: JSON.stringify(data), createdAt: new Date() });
  }

  async removeCache(key: string): Promise<void> {
    browserCache.cache.where('key').equals(key).delete();
  }

  private async getCacheLastUpdatedAt(key: string): Promise<Date> {
    const cache = await browserCache.cache
      .where('key').equals(key)
      .first();
    if (cache) return new Date(cache.createdAt);
    return new Date('1900-01-01');
  }

  private async getDataLastUpdatedAt(key: string): Promise<Date> {
    const lastUpdatedAtStr: any = await (this.httpClient.get(`${key}/last-updated-at`).toPromise());
    return new Date(lastUpdatedAtStr.lastUpdatedAt);
  }

  private resetBrowserDB() {
    browserCache.delete().then(() => {
      browserCache.version(1).stores({
        cache: '++id, key'
      });
      browserCache.open();
    });
  }

}
