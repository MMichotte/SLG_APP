import { Sequelize } from 'sequelize-typescript';

import { User } from '../../models/users/entities/user.entity';
import env from '../env';
const consola = require('consola');

const dbConnectionTest = async (sequelize: Sequelize) => {
  await sequelize
    .authenticate()
    .then(() => {
      if (env.NODE_ENV === 'prod') {
        consola.success({
          message: `Database connected successfully to ${env.DATABASE_URL}`,
          badge: true,
        });
      } else if (env.NODE_ENV === 'dev') {
        consola.success({
          message: `Database connected successfully to ${env.DB_NAME} database`,
          badge: true,
        });
      }
    })
    .catch((error) =>
      console.error(`Unable to connect to ${env.DB_NAME} database:`, error),
    );
};


export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      let sequelize: any;

      const runningEnv: string = env.NODE_ENV;

      if (runningEnv === 'dev') {
        sequelize = new Sequelize(
          env.DB_NAME,
          env.DB_USER,
          env.DB_PASSWORD,
          {
            host: env.DB_HOST,
            dialect: 'postgres',
            logging: false,
          });
      }
      else if (runningEnv === 'test') {
        sequelize = new Sequelize(
          'slg_db_test',
          'postgres',
          'postgres',
          {
            host: 'localhost',
            dialect: 'postgres',
            logging: false,
          }
        );
      }
      else if (runningEnv === 'prod') {
        sequelize = new Sequelize(
          env.DATABASE_URL,
          {
            ssl: true,
            dialectOptions: {
              ssl: {
                require: true,
                rejectUnauthorized: false
              }
            }
          });
      }
      
      dbConnectionTest(sequelize);

      sequelize.addModels([User]); //! TODO
      await sequelize.sync();

      return sequelize;
    },
  },
];
