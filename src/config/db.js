// Conectamos la base de datos.

const mysql = require('mysql2');

const config = {
    host: 'localhost',
    user: 'root',
    password: 'Mambo1993',
    port: 3306,
    database: 'eventos_deportivos'
}

const pool = mysql.createPool(config);

module.exports = pool.promise();