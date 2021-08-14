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
    "username": req.body.username,
    "_id": id,
    "exercise_log": {},
  })
  res.json({ username : req.body.username, _id: id })

});

app.get('/api/users', (req, res) => {
  var result = users.filter( user => user.username && user._id)
  res.json(result)
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
