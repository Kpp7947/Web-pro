const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();
const cookieParser = require('cookie-parser');

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('customers.db', (err) => {    
  if (err) {
      return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

app.use(cookieParser());
// static resourse & templating engine
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    db.get('SELECT * FROM customers LIMIT 1', (err, rows) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.render('form', { data: rows });
    })
});

app.post('/save', (req, res) => {
    res.cookie('user', JSON.stringify(req.body), {maxAge: 86400000, httpOnly: true, secure: true})
    res.render('form', { data: {} });
});

app.get('/show', (req, res) => {
    res.render('form', {data: JSON.parse(req.cookies.user)});
})

app.get('/clear', (req, res) => {
    res.clearCookie('user');
    res.render('form', { data: {} });
})

app.listen(port, () => {
    console.log("Server started.");
  });