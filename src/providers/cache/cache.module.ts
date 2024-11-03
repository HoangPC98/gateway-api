import { Global, Module } from '@nestjs/common';
import { CacheProvider } from './cache.provider';
import { CacheModule } from '@nestjs/cache-manager';
import { AppConfigService } from 'src/configs/app.config.service';
import * as redisStore from 'cache-manager-redis-store';
@Global()
@Module({
  imports: [
    CacheModule.register({
      useFactory: async () => ({
        isGlobal: true,
        store: redisStore as any,
        host: `${process.env.REDIS_HOST}`,
        port: `${process.env.REDIS_PORT}`,
        // ttl: 1000,
      }),
    }),
  ],
  providers: [
    CacheProvider,
    {
      provide: 'MY_CACHE_PROVIDER',
      useValue: CacheProvider,
    },
    AppConfigService,
  ],
  exports: [CacheProvider, 'MY_CACHE_PROVIDER'],
})
export class MyCacheModule { }
