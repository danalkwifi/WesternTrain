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
    console.log('Connected - chg-exp-date.js');
});

// ensure db can be used globally
global.db = db;


router.get('/chg-exp-date', function(req,res) {
    let date = req.query.date;
    let passID = req.query.passID;
    let content ='';
    console.log(req.query.date + req.query.passID);
    db.query(`UPDATE Ticket
	    SET expiryDate = DATE('${date}')
	    WHERE purchasedBy = ${passID}`
        , (err, rows, fields) => {
            if (err){
                console.log(err);
                res.send(`<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                <style>
                    .jumbotron{padding-top:50px;background-color:#e4dcd2;padding:30px}
                    </style>
                <div class="container"><br><br><br><br><div class="jumbotron"><h1>error: incompatible input types!<br> please try again. <br></h1> 
                <text><br>you may have formatted the date wrong, or entered a passenger ID that doesn't exist in the system.<br><br></text>
                <a href = "/mod-exp-date.html"><button>retry modifying ticket</button></a>
                <a href = "/"><button class='rtn-btn'>return to menu</button></a>` );
            }
            else {
                    content += ` <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                    <style>
                    .jumbotron{padding-top:50px;background-color:#e4dcd2;text-align:center;padding:30px}
                    </style>
                    <div class="container"><br><br><br><br><div class="jumbotron"> `;
                    content += '<h1>success! the following information has been updated. <br><br> </h1>';
                    content += `<text>passenger ID: ${req.query.passID}<br> new expiry date: ${req.query.date}<br><br><br> </text>
                                    <a href = "/mod-exp-date.html"><button>modify another ticket</button></a>
                                    <a href = "/"><button  class='rtn-btn'>return to menu</button></a>`;
                    res.send(content);
                
        }  
    });
    

} )

module.exports = router;
