var express = require('express');
var router = express.Router();
const path = require('path');
//app.set('views', path.join(__dirname, '/htmlviews'));

// use mySQL
const mysql = require('mysql');

// create the connection
const db = mysql.createConnection({
    host: 'db4free.net',
    user: 'womeninstem',
    password: 'rootpass2021',
    database: 'ertwdatabase'
});
// connect to the database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected - view-stations.js');
});

// ensure db can be used globally
global.db = db;


// view address route
router.get('/view-stations', (req, res) => {
    // create variable to store the line colour the user inputs
    let lineCol = req.query.lineColor;
    let content = '';

    db.query(`
            SELECT DISTINCT st.stationNo, st.stationName,  s.lineCol
            FROM Stop s, Station st 
            WHERE lineCol = '${lineCol}'
            AND s.stationNo = st.stationNo
    `
        , (err, rows, fields) => {
            if (err) {
                res.send(`<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                         <div class="container"><br><br><br><br><div class="jumbotron"><h1>line colour must be must be a string value!<br> please try again.<br> <br></h1><a href = "/find-station.html"><button>search for another station on a line</button></a>
                        <a href = "/"><button class='rtn-btn'>return to menu</button></a>`)
            }
            else {
                if (rows[0] != null) {
                    content += ` <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                    <style>
                    .jumbotron{padding-top:50px;background-color:#e4dcd2;padding:30px}
                    </style> 
                    <div class="container"><br><br><br><br><div class="jumbotron"> `;
                    content += '<h2> showing all the stations in: line ' + req.query.lineColor + '<br><br></h2>';
                    for (r of rows) {
                        content += '<h5>station number: '+r.stationNo + ' </text> <text>station name:  ' + r.stationName + '<br><br></h5>';
                    }
                    content += `<a href = "/find-stations">
                                            <button>search for another station</button><br><br>
                                        </a>
                                        <a href = "/">
                                        <button class='rtn-btn'>return to menu</button>
                                        </a>`;
                    res.send(content);
                   
                } else {
                    res.send(`<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                    <style>
                    .jumbotron{padding-top:50px;background-color:#e4dcd2;text-align:center;padding:30px}
                    </style>
                    <div class="container"><br><br><br><br><div class="jumbotron"><h1>the line colour you entered does not exist!<br> please try again.<br><br> </h1>
                                <a href = "/find-stations"><button>search for another line</button></a>
                                <a href = "/"><button class='rtn-btn'>return to menu</button></a>`);
                }
            }
        });
})


module.exports = router;
