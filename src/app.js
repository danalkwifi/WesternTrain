// set up project to use all required modules
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// set up the port to run the app on
const port = 3309;

// configure the middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', path.join(__dirname, '/htmlviews'));
//app.set('views', __dirname + '/views'); // set express to look in this folder to render our views
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(express.static(path.join(__dirname, 'htmlviews')));
app.use(fileUpload()); // configure file upload

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
    console.log('Connected to database - app.js');
    });

// ensure db can be used globally
global.db = db;

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

// declare consts for homepage and the pages which display query results
const getHomePage = require('./routes/index'); // home page
app.get('/', getHomePage); 
const viewTrains = require('./routes/view-trains'); // first query
app.get('/view-trains', viewTrains); 
const viewStations = require('./routes/view-stations'); // second query
app.get('/view-stations', viewStations); 
const showRecs = require('./routes/show-recs'); // third query
app.get('/show-recs', showRecs); 
const viewAddress = require('./routes/view-address'); // fourth query
app.get('/view-address', viewAddress); 
const chgExpDate = require('./routes/chg-exp-date'); // fifth query
app.get('/chg-exp-date', chgExpDate); 
const addTicket = require('./routes/add-ticket'); // sixth query
app.get('/add-ticket', addTicket); 

// link pages with path to get user input
app.get('/find-trains', function(req,res){res.sendFile(path.join(__dirname,'./htmlviews/find-trains.html'));}); // first query
app.get('/find-stations', function(req,res){res.sendFile(path.join(__dirname,'./htmlviews/find-stations.html'));}); // second query
app.get('/find-address', function(req,res){res.sendFile(path.join(__dirname,'./htmlviews/find-address.html'));}); // fourth query
app.get('/mod-exp-date', function(req,res){res.sendFile(path.join(__dirname,'./htmlviews/mod-exp-date.html'));}); // fifth query
app.get('/new-ticket', function(req,res){res.sendFile(path.join(__dirname,'./htmlviews/new-ticket.html'));}); // fifth query


// handles disconnecting from the database when the user clicks the quit button and then shows them acknowledgement
app.get('/quit-db', function(req,res){
    db.end(); 
    res.send(`<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <style>
    .jumbotron{padding-top:50px;background-color:#e4dcd2;text-align:center;padding:30px}
    </style>
    <div class="container"><br><br><br><br><div class="jumbotron"><h1>thank you for using the Western Metro System Database!<br><br>you have now been disconnected.<br><br></h1> <a href="/"><button class='rtn-btn'>reconnect to database</button></a>`);
    app.close();

}); 

