require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
})

if(process.env.DATABASE_URL) {
    module.exports = {
        url: process.env.DATABASE_URL,
        define: {
            timestamps: true
        },
        dialect: process.env.DB_DIALECT || 'postgres',
        dialectOptions: process.env.PRODUCTION_HEROKU ? {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        } : {}
    }
} else {
    module.exports = {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        dialect: process.env.DB_DIALECT || 'postgres',
        port: process.env.DB_PORT,
        define: {
            timestamps: true
        },
    }
}
