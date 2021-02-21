import { Sequelize } from 'sequelize-typescript';
import { User } from '../../models/users/entities/user.entity';
import env from '../env';
const consola = require('consola');

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      let sequelize :any;

      switch (env.NODE_ENV) {

      case 'dev':
        sequelize = new Sequelize(
          env.DB_NAME,
          env.DB_USER,
          env.DB_PASSWORD,
          {
            host: env.DB_HOST,
            dialect: 'postgres',
            logging: false,
          });
        break;

      case 'test':
        new Sequelize(
          'slg_db_test',
          'postgres',
          'postgres',
          {
            host: 'localhost',
            dialect: 'postgres',
            logging: false,
          }
        );
        break;

      case 'prod':
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
        break;

      default:
        sequelize = new Sequelize(
          env.DB_NAME,
          env.DB_USER,
          env.DB_PASSWORD,
          {
            host: env.DB_HOST,
            dialect: 'postgres',
            logging: false,
          }
        );
      }
      
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
