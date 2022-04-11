import { Injectable } from '@angular/core';
import Dexie from 'dexie';

const browserCache: any = new Dexie('app_db');
browserCache.version(1).stores({
  /*
  All cache will be stored in table "Cache" with:
  - key: unique access key to data
  - data: json string of objects
  */
  cache: '++id, key' 
});

@Injectable()
export class BrowserCacheService {

  async getOrSetCache(key: string, useCache: boolean, callback: any): Promise<any> {
    if (useCache) {
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
    browserCache.cache.add({ key: key, data: JSON.stringify(data) });
  }

  async removeCache(key: string): Promise<void> {
    browserCache.cache.where('key').equals(key).delete();
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
