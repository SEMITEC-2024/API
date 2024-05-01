const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password',
    database: 'semitec_db'
})

connection.connect( error => {
    if (error) throw error;
    console.log("exitoso")
})

module.exports = connection;