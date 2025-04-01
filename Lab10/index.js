const express = require("express");
const path = require("path");
const port = 5500;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('employees.db', (err) => {
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
app.get('/show', function (req, res) {
    const query = 'SELECT * FROM employees; ';
    db.all(query, (err, rows) => { // ใข้ all เพราะต้องการ response
        if (err) {
            console.log(err.message);
        }
        // console.log(rows);
        res.render('showData', { data: rows });
    });
});

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/delete', function (req, res) {
    let sql = `DELETE FROM employees WHERE EmployeeId=${req.query.id}`;
    // delete a row based on id
    // console.log(sql);
    db.run(sql, function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`a row deleted.`);
    });
    res.redirect("/");
});

app.get('/form', function (req, res) {
    res.render('form');
});

app.get('/formget', function (req, res) {
    let formdata = {
        id: req.query.id,
        fname: req.query.fname,
        lname: req.query.lname,
        title: req.query.title,
        phone: req.query.phone,
        email: req.query.email
    };
    // console.log(formdata);  
    //
    let sql = `INSERT INTO employees (EmployeeId, LastName, FirstName, Title, Phone, Email) 
                VALUES (${formdata.id}, '${formdata.fname}', '${formdata.lname}', 
                '${formdata.title}', '${formdata.phone}', '${formdata.email}');`;
    console.log(sql);
    db.run(sql, (err) => {
        if (err) {
            return console.error('Error inserting data:', err.message);
        }
        console.log('Data inserted successful');        
    });
    res.redirect("/show");
})

// Starting the server
app.listen(port, () => {
    console.log("Server started.");
});