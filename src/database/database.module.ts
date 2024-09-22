import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { customerDatabaseConfig } from "src/configs/pg-connection.config";
import { DataSource } from "typeorm";

@Module({
    imports: [
        TypeOrmModule.forRoot(customerDatabaseConfig)
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}
