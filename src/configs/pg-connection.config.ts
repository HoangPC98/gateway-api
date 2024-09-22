import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import * as dotenv from 'dotenv';
dotenv.config();

export const customerDatabaseConfig: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: 'hoangpc',
    database: process.env.POSTGRES_DB,
    entities: [],
    synchronize: false,
    migrationsRun: true,
    // cache: {
    //     type: 'redis',
    //     options: {
    //         host: process.env.REDIS_HOST,
    //         port: Number(process.env.REDIS_PORT),
    //         password: process.env.REDIS_PASSWORD,
    //     },
    // },
}