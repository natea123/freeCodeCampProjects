var express = require('express');
var app = express();
var bodyParser = require('body-parser');




absolutePath = __dirname + "/views/index.html"
cssPath = __dirname + "/public"

app.use("/public", express.static(__dirname + "/public"));

/*
app.use(function middleware(req, res, next) {
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string)
  next();
});

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();  // Hypothetical synchronous operation
  next();
}, function(req, res) {
  res.json({"time": req.time});
});

app.get("/", 
  function(req, res) {
    res.sendFile(absolutePath)
  }
  )

// working with env variables
app.get("/json",
  function(req, res) {

    if(process.env.MESSAGE_STYLE == "uppercase") {

      res.json({"message": "HELLO JSON"})

    } else {

      res.json({"message": "Hello json"})
      
    }
    
  }
)

*/

app.post("/name", function(req, res) {
  // Handle the data in the request
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/:word/echo",
    function(req, res) {
        res.json({"echo": req.params.word})
    })


app.get("/name",
    function(req, res) {
        res.json({"name": `${req.query.first}  ${req.query.last}`})
    })


































 module.exports = app;
