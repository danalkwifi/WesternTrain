var express = require('express');
var router = express.Router();
let ejs = require('ejs');

// route to display user's query results

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
    console.log('Connected - view-trains.js');
});

// ensure db can be used globally
global.db = db;

router.get('/view-trains', (req, res) => {
    // create variable to store the station number that the user input
    let stationNo = req.query.stationNo;
    let content = '';
    // connect to the database and execute the fourth query to display the address corresponding to the user's specified station number
    db.query(`
    SELECT trainNo
    FROM Train t
    WHERE EXISTS (SELECT *
                  FROM Stop s
                  WHERE t.lineColor= s.lineCol AND s.StationNo = ${stationNo});`
        , (err, rows, fields) => {
            if (err)
                res.send(`<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                <style>
                .jumbotron{padding-top:50px;background-color:#e4dcd2;text-align:center;padding:30px}
                </style>
                <div class="container"><br><br><br><br><div class="jumbotron"><h1> station number must be an integer value!<br> please try again.<br> <br></h1><a href = "/find-trains.html"><button>search for another station on a line</button></a>
               <a href = "/"><button class='rtn-btn'>return to menu</button></a>`)
            else {
                if (rows[0] != null ) {
                    content += ` <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                    <style>
                    .jumbotron{padding-top:50px;background-color:#e4dcd2;padding:30px}
                    </style>   
                    <div class="container"><br><br><br><br><div class="jumbotron"> `;
                    content += '<h1>showing all trains stopping at: station ' + req.query.stationNo + '<br><br></h1>';
                    for (r of rows) {
                        content += '<h5>train number: ' +r.trainNo + '<br><br></h5>';
                    }
                    content += `<br><br>        
                                            <a href = "/find-trains">
                                                <button>enter another station</button><br><br>
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
                        <div class="container"><br><br><br><br><div class="jumbotron"><h1>the station you entered does not exist!<br> please try again.<br><br> </h1>
                                    <a href = "/find-trains"><button>search for another station</button></a>
                                    <a href = "/"><button class='rtn-btn'>return to menu</button></a>`);
                }
            }
        });
})




module.exports = router;













// QUERY FOUR: Users can view the location of the specified station based on users input.
// db.query(`SELECT streetNo, streetName
//             FROM Station 
//             WHERE stationName = ${stationNo}`
//     , (err, rows, fields) => {
//         if (err)
//             console.log(err);
//         else
//             console.log('printing rows');
//         for (r of rows)
//             console.log(r)});