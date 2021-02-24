import env from './src/config/env';
import { ConnectionOptions, createConnection } from 'typeorm';

const getMigrationDirectory = () => {
  const dir = env.MIGRATION_ENV === 'migration' ? '.' : `${__dirname}`;
  return `${dir}/database/migrations/**/*{.ts,.js}`;
};

let dbConnectionOptions: ConnectionOptions;

if (env.NODE_ENV === 'dev') {
  dbConnectionOptions = {
    type: 'postgres',
    host: env.DB_HOST,
    port: +env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    logging: false
  };
}
else if (env.NODE_ENV === 'test') {
  dbConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: +env.DB_PORT,
    username: 'postgres',
    password: 'postgres',
    database: 'slg_db_test'
  };
}
else if (env.NODE_ENV === 'prod') {
  dbConnectionOptions = {
    type: 'postgres',
    url: env.DATABASE_URL,
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  };
}

const dbCommonOptions: any = {
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: [getMigrationDirectory()],
  cli: {
    migrationsDir: 'database/migrations'
  }
};

dbConnectionOptions = {...dbConnectionOptions, ...dbCommonOptions};

export default dbConnectionOptions;