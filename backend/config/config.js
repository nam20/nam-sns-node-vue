require('dotenv').config();


module.exports = {
    development: {
        username: "root",
        password: process.env.SEQUELIZE_PASSWORD,
        database: "nodejs",
        host: "127.0.0.1",
        dialect: "mysql",
        operatorsAliases: false,
        timezone: "+09:00"
      },
    production: {
        username: "root",
        password: process.env.SEQUELIZE_PASSWORD,
        database: "nodejs",
        host: "127.0.0.1",
        dialect: "mysql",
        operatorsAliases: false,
        timezone: "+09:00"
    }
}