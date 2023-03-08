const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'localhost',
  user: process.env.mysqlUser,
  password: process.env.mysqlPassword,
  database: 'nodecontacts'
});

pool.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});

pool.on('connection', function (connection) {
  console.log('Connection %d connected', connection.threadId);
});

pool.on('enqueue', function (connection) {
  console.log('Connection %d enqueue', connection.threadId);
});

pool.on('release', function (connection) {
  console.log('Connection %d release', connection.threadId);
});

module.exports = pool;