var express = require('express');
var router = express.Router();
let ejs = require('ejs');
const path = require('path');
//router.use(express.static(path.join(__dirname, 'htmlviews')));

// Homepage route
router.get('/', function (req, res) {
    res.send(`  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <style>
    .jumbotron{margin-top:30px;background-color:#e4dcd2;text-align:center;padding:30px}
    
    h1{font-size:50px; text-align:center;}
    h5{text-align:center;}
    button {
        border-radius: 5;
        border-radius: 5px;
        color: #ffffff;
        font-size: 19px;
        background: Transparent;
        padding: 30px 30px 30px 30px;
        text-decoration: none;
        margin-top:5px;
        border: none;
      }
      
      button:hover {
        background: #8f8861;
        text-decoration: none;
      }
      .grid-container {
        display: grid;
        grid-template-columns: auto auto auto;
        background-color: #C2B97F;
     
      }
      
      .grid-item {
        background-color: #C2B97F;
        border: 7px solid #e4dcd2;
        padding: 20px;
        font-size: 30px;
        text-align: center;
      }

      .grid-item:hover{
            background: #8f8861;
            text-decoration: none;

      }
      .exit-btn{background: #8E5572;padding: 10px 20px 10px 20px;}
      .exit-btn-div{text-align:right;}
    </style> 
    <div class="container"><br><div class="jumbotron"><h1>Welcome to the Western Metro System.</h1><br>
    <h5>What would you like to today?</h5><br>
    <h3>---------- TRAINS ------------------ STATIONS -------------------- TICKETS ----------<h3>
            <div class="grid-container">
                <div class="grid-item"><text><a href="find-trains">
                <button>Find Trains at a Station</button>
            </a></div>
                <div class="grid-item"><a href="find-stations">
                <button>Find Stations in a Line</button>
            </a></div>
            <div class="grid-item"><a href="new-ticket">
                <button>Add New Ticket</button>
            </a></div>
            <div class="grid-item"><a href="show-recs">
                <button>List Recommended Trains</button><br>
            </a></div> 
            <div class="grid-item"><a href="find-address.html">
            <button>Find Address of a Station</button>
            </a></div>
                <div class="grid-item"><a href="mod-exp-date">
                <button>Modify Ticket Expiry Date</button>
            </a></div>   
             </div><h3>---------------------------------------------------------------------------------------------</h3>
             <div class='exit-btn-div'>
             <a href="quit-db"><button class='exit-btn' type="button">Quit</button></a></div></div></div>`);

})

module.exports = router;
