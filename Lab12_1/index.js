const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();
const session = require("express-session");
// const cookieParser = require("cookie-parser");
// const http = require('http');

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('customers.db', (err) => {    
  if (err) {
      return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: false,
    })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// static resourse & templating engine
// app.use(express.static('public'));
// app.use(cookieParser());
// Set EJS as templating engine
app.set('view engine', 'ejs');

// routing path
app.get('/', (req, res) => {
    let sql = `SELECT * FROM customers LIMIT 1`;
    db.get(sql, function(err, rows) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.render('form', { data: rows });
    })
    
});

app.post('/save', (req, res) => {
    req.session.saveData = req.body;
    res.render('form', {data: {} });
})

app.get('/show', (req, res) => {
    res.render('form', {data: req.session.saveData});
})

app.get('/clear', (req, res) => {
    req.session.destroy(() => {
        res.render('form', {data: {} });
    })
});
// Starting the server
app.listen(port, () => {
   console.log("Server started.");
 });