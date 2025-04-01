const express = require('express');
const path = require('path');
const app = express();
const port = 5500;

// เพิ่มใช้งานไฟล์
const conn = require('./dbconn.js');

// static resourse & template engine
app.use(express.static('public'));
app.set('view engine', 'ejs');

// routing 
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/form.html'));
});

app.get('/process_signup', function (req, res) {
    let formdata = {
        username: req.query.username,
        password: req.query.password,
        email: req.query.email,
        firstname: req.query.firstname,
        lastname: req.query.lastname,
        age: req.query.age,
        address: req.query.address,
        phone: req.query.phone
    };
    // console.log(formdata);

    let sql = `INSERT INTO users (username, password, email, firstname, lastname, age, address, phone)
                VALUES ('${formdata.username}', '${formdata.password}', '${formdata.email}', '${formdata.firstname}', '${formdata.lastname}', 
                '${formdata.age}', '${formdata.address}', '${formdata.phone}');`;
    // console.log(sql);
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("a record inserted");
    });
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
}); 