const express = require('express');
const path = require('path');
const app = express();
const port = 5500;

// เพิ่มใช้งานไฟล์
const conn = require('./dbconn.js');

// static resourse & template engine
app.use(express.static('public'));
app.set('view engine', 'ejs');

//routing
app.get('/', function (req, res) {
    const sql = `select s.song_name, a.artist_name, s.song_release_date, s.song_type
                from songs s
                join artists a
                on s.artist = a.artist_id;` ;
    // console.log(sql);
    conn.query(sql, function(err, result, fields) {
        if (err) throw err;
        res.render('show', { data: result });
        res.end();
    })
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
}); 