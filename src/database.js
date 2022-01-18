const mysql = require('promise-mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'adminasir2',
  database: 'sociosDB'
});

function getConnection() {
  return connection;
}

module.exports = { getConnection };