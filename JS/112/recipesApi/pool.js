const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    //user: process.env.mysqlPassword,
    user:'root',
    database: 'recipes'
});

module.exports = pool;