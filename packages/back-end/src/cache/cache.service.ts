import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManage: Cache) {}
  async cacheSet(key: string, value: string, ttl?: number) {
    return await this.cacheManage.set(key, value, ttl || 60000);
  }

  async cacheGet(key: string) {
    return await this.cacheManage.get(key);
  }
}
