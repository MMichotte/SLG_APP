import { Injectable } from '@nestjs/common';

import { createClient as redisCreateClient } from 'redis';
import env from '@config/env'; 

export const redisClient = redisCreateClient({
  url: `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`
});

@Injectable()
export class RedisService {

  async getOrSetCache(key: string, callback): Promise<any> {
    let data = await redisClient.get(key);
    if (data) return (JSON.parse(data));
    data = await callback();
    redisClient.setEx(key, +env.REDIS_TTL, JSON.stringify(data));
    return data;
  } 

  resetCache(key: string) {
    redisClient.del(key);
  }

}