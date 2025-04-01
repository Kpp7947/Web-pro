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
    res.sendFile(path.join(__dirname, '/public/login.html'));
});


app.get('/process_login', function (req, res) {
    let formData = {
        loginChoice: req.query.loginChoice,
        username: req.query.username,
        email: req.query.email,
        password: req.query.password
    };
    console.log(formData);
    const sql = 'select * from users;';
    conn.query(sql, function (err, result) {
        if (err) {
            console.error('Database error:', err);
            res.status(500).send('Server error');
            return;
        }

        let userFound = false;
        let passwordFound = false;
        result.forEach(user => {
            if (formData.loginChoice === 'username' && formData.username === user.username) {
                userFound = true;
                if (formData.password === user.password) {
                    passwordFound = true;
                }
            }else if (formData.loginChoice === 'email' && formData.email === user.email) {
                userFound = true;
                if (formData.password === user.password) {
                    passwordFound = true;
                }
            }
        });

        if (!userFound) {
            res.send("No user found.");
        }else if (!passwordFound) {
            res.send("Password is not correct.");
        }else {
            res.send('Login check complete, user found.');
        }
    })
});


app.listen(port, () => {
    console.log(`listening to port ${port}`);
}); 