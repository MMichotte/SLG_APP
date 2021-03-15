import env from './src/config/env';
import { ConnectionOptions } from 'typeorm';

let dbConnectionOptions: ConnectionOptions;

if (env.NODE_ENV === 'prod') {
  dbConnectionOptions = {
    type: 'postgres',
    url: env.DATABASE_URL,
    ssl: false
  };
}

const dbCommonOptions: any = {
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrationsTableName: 'migrations'
};

dbConnectionOptions = {...dbConnectionOptions, ...dbCommonOptions};

export default dbConnectionOptions;