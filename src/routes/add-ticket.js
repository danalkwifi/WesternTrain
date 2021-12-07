var express = require('express');
var router = express.Router();
const path = require('path');

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
    console.log('Connected - add-ticket.js');
});

// ensure db can be used globally
global.db = db;


router.get('/add-ticket', function (req, res) {
    let passID = req.query.passengerID;
    let intervalNum = req.query.intervalNum
    let content = '';
    //create a random id
    function makeid(length) {
        var result = "";
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    let randomID = makeid(9)

    //checking to see if passenger id exist
    db.query(`SELECT * FROM Passenger WHERE passengerID = ${passID}`, (err, rows, fields) => {
        if (err) {
            console.log(err);
        }
        else {
            if (rows[0] == null) {
                res.send(`<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                <style>
                .jumbotron{padding-top:50px;background-color:#e4dcd2;text-align:center;padding:30px}
                </style>
                <div class="container"><br><br><br><br><div class="jumbotron"><h1>Sorry! Ticket can only be added for registered passengers :(<br> please try again.<br><br> </h1>
                                <a href = "/new-ticket"><button>add ticket</button></a>
                                <a href = "/"><button class='rtn-btn'>return to menu</button></a>`);
            }
            else {
                db.query(`INSERT INTO Ticket VALUES ('${randomID}', CURRENT_DATE(), CURRENT_DATE() + INTERVAL ${intervalNum} month, ${passID}) `
                    , (err, rows, fields) => {
                        if (err) {
                            res.send(`<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                            <style>
                        .jumbotron{padding-top:50px;background-color:#e4dcd2;text-align:center;padding:30px}
                         </style>
                            <div class="container"><br><br><br><br><div class="jumbotron"><h1>passenger id or months needs to be an interger value!<br> please try again.<br> <br></h1><a href = "/new-ticket.html"><button>add another ticket</button></a>
                            <a href = "/"><button class='rtn-btn'>return to menu</button></a>` )
                            console.log(err)
                        }
                        else {
                            content += ` <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                            <style>
                        .jumbotron{padding-top:50px;background-color:#e4dcd2;text-align:center;padding:30px}
                        </style>
                            <div class="container"><br><br><br><br><div class="jumbotron"> `;
                            content += '<h2> Ticket has been purchashed for Passenger ID ' + passID + '<br><br>';
                            content += 'Your ticket will expire in ' + intervalNum + '  months';
                            content += `</h2><br><br>        
                            <a href = "/new-ticket">
                                <button>add another ticket</button><br><br>
                            </a>
                            <a href = "/">
                            <button class='rtn-btn'>return to menu</button>
                            </a>`;
                            res.send(content);
                            console.log('row inserted');
                            console.log(rows);
                        }
                    }
                );
            }
        }
    });
});




module.exports = router;
