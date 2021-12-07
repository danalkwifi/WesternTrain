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
    else {
        console.log('Connected - show-recs.js');}
        
});

// ensure db can be used globally
global.db = db;


router.get('/show-recs', function(req,res){
    
    let content =`<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"> 
   <style> 
   .jumbotron{padding-top:50px;background-color:#e4dcd2;padding:30px}} 
   </style>
    <div class="container"><br><div class="jumbotron"><h1>Here's a list of our most to least popular trains.</h1><br><br><text>`;
    db.query( `SELECT t.*, COUNT(*) AS noOfTrips
                    FROM Train t, Trip tr
                    WHERE  t.trainNo = tr.trainNo AND (isPetFriendly = 'yes' OR isAccessible = 'yes')
                    GROUP BY trainNo 
                    ORDER BY noOfTrips DESC`
        , (err, rows, fields) => {
            if (err){
                console.log(err);
                res.send(`<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"> 
                <div class="container"><br><div class="jumbotron"><h1>Oh No! There's been an error :-(</h1> <a href = "/"><button class='rtn-btn'>return to menu</button></a>`);
            }
            else {
                content += `<style type="text/css">
                .rtn-btn{background:#8E5572; color:#fff}
                .table{margin-left:175px;}
                .tg  {border-collapse:collapse;border-color:#ccc;border-spacing:0;}
                .tg td{background-color:#fff;border-color:#ccc;border-style:solid;border-width:1px;color:#333;
                  font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;}
                .tg th{background-color:#f0f0f0;border-color:#ccc;border-style:solid;border-width:1px;color:#333;
                  font-family:Arial, sans-serif;font-size:20px;font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
                .tg .tg-6096{background-color:#ffffff;border-color:#1b4686;text-align:center;vertical-align:top}
                .tg .tg-0lax{text-align:left;text-align:center;vertical-align:top}
                </style>
                <div class="table">
                <table class="tg" style="undefined;table-layout: fixed; width: 286px">
                <colgroup>
                <col style="width: 147px">
                <col style="width: 181px">
                <col style="width: 181px">
                <col style="width: 181px">
                </colgroup>
                <thead>
                  <tr>
                    <th class="tg-6096">Train No.</th>
                    <th class="tg-6096">No. of Trips Taken</th>
                    <th class="tg-6096">Accessible</th>
                    <th class="tg-6096">Pet Friendly</th>
                  </tr>
                </thead>`;
                for (r of rows){
                    content += `
                    <tbody>
                      <tr>
                        <td class="tg-0lax"> `+ r.trainNo +`</td>
                        <td class="tg-0lax">`+ r.noOfTrips +`</td>
                        <td class="tg-0lax">`+ r.isPetFriendly +`</td>
                        <td class="tg-0lax">`+ r.isAccessible +`</td>
                      `;
                    console.log(rows);
                }
            content+=`</tr>
            </tbody>
            </table></div><a href = "/"><button class='rtn-btn' >return to menu</button></a>`;
            res.send(content);
            }
        })
});



module.exports = router;
