const express = require("express");
const path = require("path");
const port = 5500;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('userdata.db', (err) => {    
  if (err) {
      return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});


// static resourse & templating engine
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');


// routing path
app.get('/', function (req, res) {
    const sql = `SELECT * FROM users;`;
    db.all(sql, (err, rows) => {
        if (err) {
          console.log(err.message);
        }
        // console.log(rows);
        res.render('showData', { data : rows });
    });
});

app.get('/detail', function (req, res) {
    let sql = `SELECT * FROM users WHERE id=${req.query.id}`;
    db.all(sql, (err, rows) => {
        if(err) {
            console.log(err.message);
        }
        res.render('detail', { data : rows });
    });
    
});



// Starting the server
app.listen(port, () => {
   console.log("Server started.");
 });