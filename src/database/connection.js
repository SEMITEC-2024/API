const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: process.env.DATA_BASE_HOST,
    user: process.env.DATA_BASE_USER,
    password: process.env.DATA_BASE_PASSWORD,
    database: process.env.DATA_BASE_NAME
})

connection.connect( error => {
    if (error) throw error;
    console.log("exitoso")
})

module.exports = connection;