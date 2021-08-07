// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date",
    function(req, res) {


      //Check if input is a number - if it is treat it like a unix timestamp
      if (!isNaN(req.params.date)) {
        var inputDate = new Date(parseInt(req.params.date));
        if (inputDate == "Invalid Date") {
          res.json({"error": "Invalid Date"});
        } else {
          res.json({"unix": inputDate.getTime(), "utc": inputDate.toUTCString()});
        }

      } else {

        //By here we can determine the user is tying to input a string date
        var inputDate = new Date(req.params.date);
        if (inputDate.toString() == "Invalid Date") {
          res.json({"error": "Invalid Date"});
        } else {
          res.json({"unix": inputDate.getTime(), "utc": inputDate.toUTCString()});
        }

      }

    });

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
