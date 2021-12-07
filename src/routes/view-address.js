var express = require('express');
var router = express.Router();
const path = require('path');
//app.set('views', path.join(__dirname, '/htmlviews'));

// use mySQL
const mysql = require('mysql');
const e = require('express');


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
    console.log('Connected - view-address.js');
});

// ensure db can be used globally
global.db = db;


// view address route
router.get('/view-address', (req, res) => {
    // create variable to store the station number that the user input
    let sNo = req.query.stationNo;
    // if it's not an integer value


    // connect to the database and execute the fourth query to display the address corresponding to the user's specified station number
    
    let content = '';
    db.query(`SELECT streetNum, streetName
            FROM Station 
            WHERE stationNo = ${sNo}`
    , (err, rows, fields) => {
        if (err)
            res.send(`<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            <style> 
            .jumbotron{padding-top:50px;background-color:#e4dcd2;padding:30px}} 
            </style>
            <div class="container"><br><br><br><br><div class="jumbotron"><h1>station numbers must be integer values!<br> please try again.<br> <br></h1><a href = "/find-address.html"><button>search for another station</button></a>
                <a href = "/"><button class='rtn-btn'>return to menu</button></a>` )
        else {
            if (rows[0] && rows[0]){
                
                content += ` <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                <style>
                    .jumbotron{padding-top:50px;background-color:#e4dcd2;padding:30px}
                    </style>
                <div class="container"><br><br><br><br><div class="jumbotron"> `;
                content += '<h2> The address for Station '+ req.query.stationNo +' is:<br><br>';
                content += rows[0].streetNum + '  '+rows[0].streetName;
                content += `</h2><br><br>        
                            <a href = "/find-address">
                                <button>search for another station</button><br><br>
                            </a>
                            <a href = "/">
                            <button class='rtn-btn'>return to menu</button>
                            </a>`;
                res.send(content);
            } else {
                res.send(`<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                <style>
                    .jumbotron{padding-top:50px;background-color:#e4dcd2;padding:30px}
                    </style>
                <div class="container"><br><br><br><br><div class="jumbotron"><h1>the station number you entered does not exist!<br> please try again.<br><br> </h1>
                            <a href = "/find-address.html"><button>search for another station</button></a>
                            <a href = "/"><button class='rtn-btn'>return to menu</button></a>`);
            }
        }  
    });
    

} )


module.exports = router;
