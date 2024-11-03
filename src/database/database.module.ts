import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { customerDatabaseConfig } from 'src/configs/datasource.config';

@Module({
  imports: [TypeOrmModule.forRoot(customerDatabaseConfig)],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
