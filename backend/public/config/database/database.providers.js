"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_entity_1 = require("../../models/users/entities/user.entity");
const constants_1 = require("../constants");
const env_1 = require("../env");
const database_config_1 = require("./database.config");
const consola = require('consola');
exports.databaseProviders = [
    {
        provide: constants_1.SEQUELIZE,
        useFactory: async () => {
            let config;
            switch (process.env.NODE_ENV) {
                case constants_1.DEVELOPMENT:
                    config = database_config_1.databaseConfig.dev;
                    break;
                case constants_1.TEST:
                    config = database_config_1.databaseConfig.test;
                    break;
                case constants_1.PRODUCTION:
                    config = database_config_1.databaseConfig.prod;
                    break;
                default:
                    config = database_config_1.databaseConfig.dev;
            }
            const sequelize = new sequelize_typescript_1.Sequelize(config);
            await sequelize
                .authenticate()
                .then(() => {
                if (env_1.default.NODE_ENV === 'prod') {
                    consola.success({
                        message: `Database connected successfully to ${env_1.default.DATABASE_URL}`,
                        badge: true,
                    });
                }
                else if (env_1.default.NODE_ENV === 'dev') {
                    consola.success({
                        message: `Database connected successfully to ${env_1.default.DB_NAME} database`,
                        badge: true,
                    });
                }
            })
                .catch((error) => console.error(`Unable to connect to ${env_1.default.DB_NAME} database:`, error));
            sequelize.addModels([user_entity_1.User]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
//# sourceMappingURL=database.providers.js.map