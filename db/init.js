const mysql = require('mysql2/promise');

module.exports = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
}