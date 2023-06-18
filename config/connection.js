const { Sequelize } = require("sequelize");
require('dotenv').config();


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, 
    {
    host: 'localhost',
    dialect: 'mysql'
})

async function connect(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established.');
    } catch (error) {
        console.error('Unable to connect to the database: ', error);
    }
}

connect()

module.exports = sequelize