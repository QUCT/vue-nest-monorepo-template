import * as config from 'config';
import { Module } from '@nestjs/common';
import { AppCacheService } from './cache.service';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import type { RedisClientOptions } from 'redis';
import { Iredis } from 'src/common/interface';

const redis: Iredis = config.get('redis');

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      isGlobal: true,
      socket: {
        host: redis.host,
        port: redis.port,
      },
      username: redis.username,
      password: redis.password,
    }),
  ],
  providers: [AppCacheService],
  exports: [AppCacheService],
})
export class AppCacheModule {}
