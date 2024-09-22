import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { customerDatabaseConfig } from './configs/pg-connection.config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule
  ],
  providers: [AppService],
})
export class AppModule {}
