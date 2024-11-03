const Pool = require('pg').Pool
const mysql = require('mysql2')

// uses the pg environment variables to connect to the database
const pool = new Pool() 


const connection = () => {

}

module.exports = { connection, pool };