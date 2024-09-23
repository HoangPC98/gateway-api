import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import * as dotenv from 'dotenv';
import { DataSource } from "typeorm";
dotenv.config();

export const customerDatabaseConfig: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: ['src/database/entities/user-entity/*{.ts,.js}'],
    synchronize: false,
    logging: true,
    // migrationsRun: true,
    migrations: [
        'src/database/migrations/*{.ts,.js}',
    ]
    // cache: {
    //     type: 'redis',
    //     options: {
    //         host: process.env.REDIS_HOST,
    //         port: Number(process.env.REDIS_PORT),
    //         password: process.env.REDIS_PASSWORD,  
    //     },
    // },
}

export default new DataSource({
    ...customerDatabaseConfig,
});
