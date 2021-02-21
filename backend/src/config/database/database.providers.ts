import { Sequelize } from 'sequelize-typescript';
import { User } from '../../models/users/entities/user.entity';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import env from '../env';
import { databaseConfig } from './database.config';
const consola = require('consola');

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
      case DEVELOPMENT:
        config = databaseConfig.dev;
        break;
      case TEST:
        config = databaseConfig.test;
        break;
      case PRODUCTION:
        config = databaseConfig.prod;
        break;
      default:
        config = databaseConfig.dev;
      }
      const sequelize = new Sequelize(config);
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
      sequelize.addModels([User]); //! TODO
      await sequelize.sync();
      return sequelize;
    },
  },
];
