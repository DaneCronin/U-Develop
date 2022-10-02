const mysql = require('mysql2');

//Connect to SQL database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //MySQL Username,
        user: 'root',
        //SQL Password
        password: 'pedro3890',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

module.exports = db;