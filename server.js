const express = require('express');
const mysql = require('mysql2');

//Adding PORT designation and app expression
const PORT = process.env.PORT || 3001;
const app = express();

//Add Express.js middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Connect to SQL database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //MySQL Username,
        user: 'root',
        //SQL Password
        password: '',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

//GET a single candidate query
// db.query(`SELECT * FROM candidates WHERE id= 1`, (err, row) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(row);
// });


//query database to test connection
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
// });

//DELETE a candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log(result);
// });

//Create a Candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
// VALUES (?, ?, ?, ?)`;
// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//     if(err){
//         console.log(err);
//     }
//     console.log(result);
// });

//Route to handle user requests that are unsupported - Default response for any other request
app.use((req, res) => {
    res.status(404).end();
});


//Add function to start express.js server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});