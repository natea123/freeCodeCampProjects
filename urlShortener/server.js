require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const dns = require('dns');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

//create dictionary to store urls and their shortened version
var urls = {};

app.use(cors());


app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl', function(req, res) {

  dns.lookup(req.body.url, function onLookup(err, address, family) {

      console.log(typeof req.body.url)
  
      if (err || !(urlValidator(req.body.url))) {
        return res.json({ error: 'invalid url' });
      }
       //Check if url is already in shortened "database" and serves it back
       if (req.body.url in urls) {
         res.json({ original_url : req.body.url, short_url : urls[req.body.url] })
       } else {
         urls[req.body.url] = Math.floor(Math.random() * 10000);
         res.json({ original_url : req.body.url, short_url : urls[req.body.url] });
       }
  });

});

app.get('/api/shorturl/:short', function(req, res) {
  for (const [key, value] of Object.entries(urls)) {
    if (req.params.short == value) {
      console.log(key)
      res.redirect(key)
    }
  }
});

function urlValidator(str) {
     
  var pattern = new RegExp("(http|ftp|https)://[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?");
  return pattern.test(str);
}
    


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});