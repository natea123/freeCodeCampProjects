const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser");
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}));



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

let users = [];

app.post('/api/users', (req, res) => {
  
  var id = RandomHexString(8);
  users.push({
    _id: id,
    username: req.body.username,
    log: [],
    count: 0,
  })
  res.json({ username : req.body.username, _id: id })

});

app.get('/api/users', (req, res) => {
  var result = users.filter( user => user.username && user._id)
  res.json(result)
});

app.post('/api/users/:id/exercises', (req, res) => {

  var input_date = req.body.date;

  //checks for empty date string and sets as today if empty
  if (input_date == '') {
    today = new Date();
    var input_date = today.toDateString();
  } else {
    var input_date = new Date(req.body.date);
    input_date = input_date.toDateString();
  }
  

  //finds object in users array corresponding to given _id 
  var input_user = users.find( ({ _id }) => _id === req.params.id );

  //push exercise log to master user profile
  input_user.log.push({
    date: input_date,
    duration: parseInt(req.body.duration),
    description: req.body.description,
  });

  input_user.count += 1;

  //created temp user object to respond back to user confirming exercise was logged
  var response_object = new Object();
  response_object._id = input_user._id;
  response_object.username = input_user.username;
  response_object.date = input_date;
  response_object.duration = parseInt(req.body.duration);
  response_object.description = req.body.description;


  return res.json(response_object);

});


app.get('/api/users/:id/logs', (req, res) => {
  var input_user = users.find( ({ _id }) => _id === req.params.id );
  res.json(input_user);
});



function RandomHexString(L) {
  var hexstring='';
  for(var i=0; i<L; i++) {
      hexstring+=(Math.floor(Math.random() * 16)).toString(16);
  }
  return(hexstring);
}

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
