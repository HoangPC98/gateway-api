import { Global, Module } from '@nestjs/common';
import { CacheProvider } from './cache.provider';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { AppConfigService } from 'src/configs/app.config.service';

@Global()
@Module({
  providers: [
    CacheProvider,
    {
      provide: CACHE_MANAGER,
      useValue: {},
    },
    AppConfigService,
  ],
  exports: [CacheProvider, CACHE_MANAGER],
})
export class MyCacheModule {}
