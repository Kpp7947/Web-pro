// index.js

const express = require('express');
const path = require('path');
const app = express();
const port = 5500;

// เพิ่มใช้งานไฟล์
const conn = require('./dbconn.js');

// static resourse & template engine

// static resourse
app.use(express.static('public')); //folder name
// Set EJS as templating engine
app.set('view engine', 'ejs');


// routing 
app.get('/create', function (req, res) {
    // create table 
    let sql = `INSERT INTO instructor1 (ID, name, dept_name, salary) VALUES
        ('10101', 'Srinivasan', 'Comp. Sci.', 65000),
        ('12121', 'Wu', 'Finance', 90000),
        ('15151', 'Mozart', 'Music', 40000),
        ('22222', 'Einstein', 'Physics', 95000),
        ('32343', 'El Said', 'History', 60000),
        ('33456', 'Gold', 'Physics', 87000),
        ('45565', 'Katz', 'Comp. Sci.', 75000),
        ('58583', 'Califieri', 'History', 62000),
        ('76543', 'Singh', 'Finance', 80000),
        ('76766', 'Crick', 'Biology', 72000),
        ('83821', 'Brandt', 'Comp. Sci.', 92000),
        ('98345', 'Kim', 'Elec. Eng.', 80000);`;

    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Created successfully.");
    });
    // insert data into table 
    // ...       
})

app.get('/show', function (req, res) {
    // ให้แสดงข้อมูล จาก table instructor และ teaches
    // ดังนี้ ID name dept_name course_id semester year
    const sql = 'select * from instructor1; ';
    conn.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render('show', { data: result }) //นำ result ที่ได้จากการ query มาใส่ไว้ใน data (สร้าง obj), show คือ html file name
        res.end()
    })
});

app.get('/form', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/form.html"));
});

app.get('/process_get', function (req, res) {
    let formdata = {
        id: req.query.id,
        name: req.query.name,
        deptname: req.query.deptname,
        salary: req.query.salary
    };
    console.log(formdata);  

    let sql = `INSERT INTO instructor1 (ID, name, dept_name, salary) 
        VALUES ('${formdata.id}', '${formdata.name}', '${formdata.deptname}', '${formdata.salary}') `;
    console.log(sql);
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("a record inserted");
    });
})

app.listen(port, () => {
    console.log(`listening to port ${port}`);
}); 