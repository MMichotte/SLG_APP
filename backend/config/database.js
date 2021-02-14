import Sequelize from 'sequelize';
import env from './env';

let dbConnection = '';

if (env.NODE_ENV === 'dev') {
  dbConnection = new Sequelize(
    env.DB_NAME,
    env.DB_USER,
    env.DB_PASSWORD,
    {
      host: env.DB_HOST,
      dialect: env.DB_DIALECT,
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      define: {
        freezeTableName: true
      }
    }
  );
} else if (env.NODE_ENV === 'test') {
  dbConnection = new Sequelize(
    'slg_db_test',
    'postgres',
    'postgres',
    {
      host: 'localhost',
      dialect: 'postgres',
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      define: {
        freezeTableName: true
      }
    }
  );
} else if (env.NODE_ENV === 'prod') {
  dbConnection = new Sequelize(
    env.DATABASE_URL,
    {
      ssl: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      define: {
        freezeTableName: true
      }
    });
}

Object.freeze(dbConnection);

export default dbConnection;
