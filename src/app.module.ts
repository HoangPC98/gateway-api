import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './services/auth/auth.module';
import { LoggerModule } from './common/logger/module';
import { ILoggerService } from './common/logger/adapter';
import { AppConfigService } from './configs/app.config.service';
import { LoggerService } from './common/logger/service';
import { AppConfigModule } from './configs/app.config.module';
import { MyCacheModule } from './providers/cache/cache.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    AppConfigModule,
    LoggerModule.regisProviders({
      provide: ILoggerService,
      useFactory: () => {
        return new LoggerService('GatewayAPI', 'info');
      },
      inject: [AppConfigService],
    }),
  ],
  providers: [AppService],
  exports: [LoggerModule],
})
export class AppModule {}
