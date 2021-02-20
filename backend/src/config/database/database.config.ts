import env from '../env'
import { IDatabaseConfig } from './interfaces/dbConfig.interface';


export const databaseConfig: IDatabaseConfig = {
    dev: {
        username: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
        host: env.DB_HOST,
        port: env.DB_PORT,
        dialect: env.DB_DIALECT,
    },
    test: {
        username: 'postgres',
        password: 'postgres',
        database: 'slg_db_test',
        host: 'localhost',
        port: env.DB_PORT,
        dialect: env.DB_DIALECT,
    },
    prod: {
        urlDatabase: env.DATABASE_URL,
    },
};