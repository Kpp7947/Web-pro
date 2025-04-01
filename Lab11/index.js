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

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("Hello! REST API");
});

app.get('/employees', (req, res) => {
    const query = 'SELECT * FROM employees; ';
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        console.log(rows);
        res.send(JSON.stringify(rows));
    });
});

app.get('/employees/:id', (req, res) => { //'/employees/:id/:name'
    // req.params.id
    // console.log(req.params.id);
    const query = `SELECT * FROM employees WHERE EmployeeID=${req.params.id}; `;
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        console.log(rows);
        res.send(JSON.stringify(rows));       
    });
});

// app.post('/employees/:id', (req, res) => {
//     const query = `SELECT * FROM employees WHERE EmployeeID=${req.params.id}; `;
//     db.all(query, (err, rows) => {
//         if (err) {
//             console.log(err.message);
//         }
//         console.log(rows);
//         res.send(JSON.stringify(rows));       
//     });
// });

// app.put('/employees/:id', (req, res) => {
//     res.send(`PUT Method ${req.params.id}`);
// });

app.get("/show", (req, res) => { //flow  1 => 3 => 2 => 3 => 1
    const endpoint = 'http://localhost:5500/employees'; //url ของ web service
    fetch(endpoint)
        .then(response => response.json())
        .then(empl => {
            console.log(empl);
            res.render('show', { data: empl });            
        })
        .catch(error => {
            console.log(error);
        });
});

app.get("/aqi", (req, res) => {
    // city=ชื่อเมือง(bangkok) country=ตัวย่อประเทศ(th)
    const endpoint = 'http://10.0.15.21:8000/weather/bangkok/th';  
    fetch(endpoint)
        .then(response => response.json())
        .then(airq => {
            console.log("airq: ", airq);
            console.log("airq: ", airq.city_name);
            res.render('showaqi', { data: airq });
                        
        })
        .catch(error => {
            console.log(error);
        });
});

// app.get("/aqi", async (req, res) => {
//     const endpoint = 'http://10.0.15.21:8000/weather/bangkok/th';  
//     try {
//         const response = await fetch(endpoint);
//         const airq = await response.json();
//         console.log(airq);

//         // ถ้าค่าที่ได้เป็นออบเจ็กต์เดียว ต้องส่งให้ EJS เป็นอาร์เรย์
//         res.render('showaqi', { data: [airq] });  
//     } catch (error) {
//         console.error("Error fetching AQI:", error);
//         res.status(500).send("Error fetching AQI data.");
//     }
// });


app.listen(port, () => {
    console.log(`Starting node.js at port ${port}`);
});