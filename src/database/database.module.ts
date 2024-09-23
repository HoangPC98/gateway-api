import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { customerDatabaseConfig } from "src/configs/database-connection.config";

@Module({
    imports: [
        TypeOrmModule.forRoot(customerDatabaseConfig)
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}
