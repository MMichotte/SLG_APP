"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const env_1 = require("../env");
exports.databaseConfig = {
    dev: {
        username: env_1.default.DB_USER,
        password: env_1.default.DB_PASSWORD,
        database: env_1.default.DB_NAME,
        host: env_1.default.DB_HOST,
        port: env_1.default.DB_PORT,
        dialect: env_1.default.DB_DIALECT,
    },
    test: {
        username: 'postgres',
        password: 'postgres',
        database: 'slg_db_test',
        host: 'localhost',
        port: env_1.default.DB_PORT,
        dialect: env_1.default.DB_DIALECT,
    },
    prod: {
        urlDatabase: env_1.default.DATABASE_URL,
    },
};
//# sourceMappingURL=database.config.js.map