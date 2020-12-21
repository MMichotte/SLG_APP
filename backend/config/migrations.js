const env = Object.freeze({ ...process.env })

module.exports = {
    dev: {
        dialect: env.DB_DIALECT,
        username: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
        host: env.DB_HOST,
        port: env.DB_PORT,
        dialectOptions: {
            bigNumberStrings: true
        }
    },
    test: {
        username: 'postgres',
        password: 'postgres',
        database: 'slg_db_test',
        host: 'localhost',
        port: '5432',
        dialect: 'postgres'
    },
    prod: {
        dialect: env.DB_DIALECT,
        url: env.DATABASE_URL,
        ssl: true,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
}
