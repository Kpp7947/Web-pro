const express = require("express");
const path = require("path");
const port = 5500;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('todo.db', (err) => {    
  if (err) {
      return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});


// static resourse & templating engine
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  const endpoint = 'http://localhost:5500/show';
  fetch(endpoint)
  .then(response => response.json())
  .then(results => {
    res.render('showList', { data: results })
  })
});

app.get("/show", (req, res) => {
  let sql = 'SELECT * FROM todos';
  db.all(sql, function (err, results) {
    if (err) {
      return console.log(err.message);
    }
    res.send(JSON.stringify(results));
  })
  
});

app.post('/addTodo', (req, res) => {
  const { title, description, deadline } = req.body;
  let data = [title, description, deadline, "incompleted"];
  let sql = 'INSERT INTO todos (title, description, deadline, status) VALUES (?, ?, ?, ?)'

  db.run(sql, data, function(err) {
    if (err) {
      return console.log(err.message);
    }
    res.redirect('/');
  })
});

app.get("/create", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/create.html"));
});


app.listen(port, () => {
  console.log(`Starting node.js at port ${port}`);
});